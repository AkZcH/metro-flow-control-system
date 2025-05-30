const Ticket = require('../models/ticket.model');
const Line = require('../models/line.model');
const Station = require('../models/station.model');

// Helper function to find interchange stations between lines
const findInterchangeStations = async (line1Id, line2Id) => {
    const [line1, line2] = await Promise.all([
        Line.findById(line1Id).populate('stations.station'),
        Line.findById(line2Id).populate('stations.station')
    ]);

    if (!line1 || !line2) {
        throw new Error('One or both lines not found');
    }

    const interchangeStations = [];
    const line1Stations = new Set(line1.stations.map(s => s.station._id.toString()));
    
    line2.stations.forEach(station => {
        if (line1Stations.has(station.station._id.toString())) {
            interchangeStations.push({
                stationId: station.station._id,
                stationName: station.station.name,
                line1Arrival: line1.stations.find(s => s.station._id.toString() === station.station._id.toString())?.arrival,
                line1Departure: line1.stations.find(s => s.station._id.toString() === station.station._id.toString())?.departure,
                line2Arrival: station.arrival,
                line2Departure: station.departure
            });
        }
    });

    return interchangeStations;
};

// Helper function to find optimal route across lines
const findOptimalRoute = async (fromStationId, toStationId) => {
    // Get all lines
    const lines = await Line.find().populate('stations.station');
    
    // Find which lines contain the source and destination stations
    const sourceLine = lines.find(line => 
        line.stations.some(s => s.station._id.toString() === fromStationId.toString())
    );
    const destLine = lines.find(line => 
        line.stations.some(s => s.station._id.toString() === toStationId.toString())
    );

    if (!sourceLine || !destLine) {
        throw new Error('Source or destination station not found in any line');
    }

    // If both stations are on the same line
    if (sourceLine._id.toString() === destLine._id.toString()) {
        return {
            route: [{
                line: sourceLine._id,
                stations: [fromStationId, toStationId],
                isDirect: true
            }],
            interchangeStations: []
        };
    }

    // Find interchange stations between the lines
    const interchangeStations = await findInterchangeStations(sourceLine._id, destLine._id);
    
    if (interchangeStations.length === 0) {
        throw new Error('No direct interchange found between the lines');
    }

    // Find the optimal interchange station (closest to both source and destination)
    let optimalInterchange = null;
    let minTotalStations = Infinity;

    for (const interchange of interchangeStations) {
        const sourceToInterchange = sourceLine.stations.findIndex(
            s => s.station._id.toString() === fromStationId.toString()
        );
        const interchangeToDest = destLine.stations.findIndex(
            s => s.station._id.toString() === toStationId.toString()
        );
        
        const totalStations = Math.abs(sourceToInterchange) + Math.abs(interchangeToDest);
        
        if (totalStations < minTotalStations) {
            minTotalStations = totalStations;
            optimalInterchange = interchange;
        }
    }

    return {
        route: [
            {
                line: sourceLine._id,
                stations: [fromStationId, optimalInterchange.stationId],
                isDirect: false
            },
            {
                line: destLine._id,
                stations: [optimalInterchange.stationId, toStationId],
                isDirect: false
            }
        ],
        interchangeStations: [optimalInterchange]
    };
};

// Helper function to calculate fare based on route
const calculateFare = async (fromStationId, toStationId) => {
    try {
        // Find optimal route
        const { route, interchangeStations } = await findOptimalRoute(fromStationId, toStationId);
        
        // Base fare calculation
        const baseFare = 20; // Minimum fare
        const perStationFare = 5; // Fare per station
        const maxFare = 100; // Maximum fare cap
        const interchangeFee = 10; // Additional fee for line interchange

        // Calculate total stations across all segments
        let totalStations = 0;
        route.forEach(segment => {
            const line = segment.line;
            const fromIndex = line.stations.findIndex(s => 
                s.station._id.toString() === segment.stations[0].toString()
            );
            const toIndex = line.stations.findIndex(s => 
                s.station._id.toString() === segment.stations[1].toString()
            );
            totalStations += Math.abs(toIndex - fromIndex);
        });

        // Calculate base fare
        let fare = baseFare + (totalStations * perStationFare);
        
        // Add interchange fee if journey involves multiple lines
        if (!route[0].isDirect) {
            fare += interchangeFee;
        }
        
        // Apply fare cap
        fare = Math.min(fare, maxFare);

        // Check if it's peak hours (8-10 AM or 5-7 PM)
        const now = new Date();
        const hour = now.getHours();
        const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19);
        
        // Apply peak hour multiplier
        if (isPeakHour) {
            fare = Math.round(fare * 1.5);
        }

        return {
            fare,
            route,
            interchangeStations,
            totalStations,
            isInterchange: !route[0].isDirect
        };
    } catch (error) {
        throw new Error(`Error calculating fare: ${error.message}`);
    }
};

// Book a new ticket
const bookTicket = async (req, res) => {
    try {
        const { user, fromStation, toStation } = req.body;

        // Validate required fields
        if (!user || !fromStation || !toStation) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: user, fromStation, and toStation'
            });
        }

        // Validate stations exist
        const [sourceStation, destStation] = await Promise.all([
            Station.findById(fromStation),
            Station.findById(toStation)
        ]);

        if (!sourceStation || !destStation) {
            return res.status(400).json({
                success: false,
                message: 'One or both stations not found'
            });
        }

        // Calculate fare and get route information
        const fareDetails = await calculateFare(fromStation, toStation);

        // Create ticket with 2-hour validity
        const validUntil = new Date();
        validUntil.setHours(validUntil.getHours() + 2);

        const ticket = new Ticket({
            user,
            fromStation,
            toStation,
            line: fareDetails.route[0].line, // Store the first line
            fare: fareDetails.fare,
            status: 'booked',
            bookingTime: new Date(),
            route: fareDetails.route.map(segment => ({
                line: segment.line,
                stations: segment.stations,
                isDirect: segment.isDirect
            })),
            interchangeStations: fareDetails.interchangeStations
        });

        await ticket.save();

        // Populate station and line details for response
        await ticket.populate([
            { path: 'fromStation', select: 'name' },
            { path: 'toStation', select: 'name' },
            { path: 'line', select: 'lineName' }
        ]);

        res.status(201).json({
            success: true,
            message: 'Ticket booked successfully',
            data: {
                ticket,
                validUntil: validUntil.toISOString(),
                route: fareDetails.route,
                interchangeStations: fareDetails.interchangeStations,
                fareDetails: {
                    baseFare: 20,
                    perStationFare: 5,
                    interchangeFee: fareDetails.isInterchange ? 10 : 0,
                    totalStations: fareDetails.totalStations,
                    isPeakHour: (new Date().getHours() >= 8 && new Date().getHours() <= 10) || 
                              (new Date().getHours() >= 17 && new Date().getHours() <= 19)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error booking ticket',
            error: error.message
        });
    }
};

// Get all tickets for a user
const getUserTickets = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        const tickets = await Ticket.find({ user: userId })
            .populate('fromStation', 'name')
            .populate('toStation', 'name')
            .populate('line', 'lineName')
            .sort({ bookingTime: -1 });

        res.status(200).json({
            success: true,
            count: tickets.length,
            data: tickets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user tickets',
            error: error.message
        });
    }
};

// Get ticket by ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id)
            .populate('fromStation', 'name')
            .populate('toStation', 'name')
            .populate('line', 'lineName');

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        res.status(200).json({
            success: true,
            data: ticket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching ticket',
            error: error.message
        });
    }
};

// Cancel ticket
const cancelTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found'
            });
        }

        // Check if ticket is already cancelled
        if (ticket.status === 'cancelled') {
            return res.status(400).json({
                success: false,
                message: 'Ticket is already cancelled'
            });
        }

        // Check if ticket is within cancellation window (2 hours before journey)
        const bookingTime = new Date(ticket.bookingTime);
        const now = new Date();
        const hoursSinceBooking = (now - bookingTime) / (1000 * 60 * 60);

        if (hoursSinceBooking > 2) {
            return res.status(400).json({
                success: false,
                message: 'Ticket cannot be cancelled after 2 hours of booking'
            });
        }

        ticket.status = 'cancelled';
        await ticket.save();

        res.status(200).json({
            success: true,
            message: 'Ticket cancelled successfully',
            data: ticket
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error cancelling ticket',
            error: error.message
        });
    }
};

// Get fare estimate
const getFareEstimate = async (req, res) => {
    try {
        const { fromStation, toStation } = req.query;

        if (!fromStation || !toStation) {
            return res.status(400).json({
                success: false,
                message: 'Please provide fromStation and toStation'
            });
        }

        const fareDetails = await calculateFare(fromStation, toStation);

        res.status(200).json({
            success: true,
            data: {
                fare: fareDetails.fare,
                route: fareDetails.route,
                interchangeStations: fareDetails.interchangeStations,
                fareDetails: {
                    baseFare: 20,
                    perStationFare: 5,
                    interchangeFee: fareDetails.isInterchange ? 10 : 0,
                    totalStations: fareDetails.totalStations,
                    isPeakHour: (new Date().getHours() >= 8 && new Date().getHours() <= 10) || 
                              (new Date().getHours() >= 17 && new Date().getHours() <= 19)
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error calculating fare estimate',
            error: error.message
        });
    }
};

module.exports = {
    bookTicket,
    getUserTickets,
    getTicketById,
    cancelTicket,
    getFareEstimate
}; 