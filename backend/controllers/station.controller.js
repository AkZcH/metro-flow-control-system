const Station = require('../models/station.model');
const Line = require('../models/line.model');

// Create a new station
const createStation = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if station already exists
        const existingStation = await Station.findOne({ name });
        if (existingStation) {
            return res.status(400).json({
                success: false,
                message: 'Station with this name already exists'
            });
        }

        const station = new Station({ name });
        await station.save();

        res.status(201).json({
            success: true,
            message: 'Station created successfully',
            data: station
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating station',
            error: error.message
        });
    }
};

// Get all stations
const getAllStations = async (req, res) => {
    try {
        const stations = await Station.find().populate('lines.line', 'lineName');
        res.status(200).json({
            success: true,
            count: stations.length,
            data: stations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching stations',
            error: error.message
        });
    }
};

// Get station by ID
const getStationById = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id).populate('lines.line', 'lineName');
        
        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Station not found'
            });
        }

        res.status(200).json({
            success: true,
            data: station
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching station',
            error: error.message
        });
    }
};

// Update station
const updateStation = async (req, res) => {
    try {
        const { name } = req.body;
        const stationId = req.params.id;

        // Check if station exists
        const station = await Station.findById(stationId);
        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Station not found'
            });
        }

        // If name is being updated, check for duplicates
        if (name && name !== station.name) {
            const existingStation = await Station.findOne({ name });
            if (existingStation) {
                return res.status(400).json({
                    success: false,
                    message: 'A station with this name already exists'
                });
            }
        }

        const updatedStation = await Station.findByIdAndUpdate(
            stationId,
            { name },
            { new: true, runValidators: true }
        ).populate('lines.line', 'lineName');

        res.status(200).json({
            success: true,
            message: 'Station updated successfully',
            data: updatedStation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating station',
            error: error.message
        });
    }
};

// Delete station
const deleteStation = async (req, res) => {
    try {
        const station = await Station.findById(req.params.id);
        
        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Station not found'
            });
        }

        // Check if station is part of any lines
        if (station.lines.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete station that is part of one or more lines. Remove station from all lines first.'
            });
        }

        await station.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Station deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting station',
            error: error.message
        });
    }
};

// Add station to a line
const addStationToLine = async (req, res) => {
    const session = await Station.startSession();
    session.startTransaction();

    try {
        const { lineId, lineOrder, arrival, departure } = req.body;
        const stationId = req.params.id;

        // Check if line exists
        const line = await Line.findById(lineId).session(session);
        if (!line) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Line not found'
            });
        }

        // Check if station exists
        const station = await Station.findById(stationId).session(session);
        if (!station) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Station not found'
            });
        }

        // Check if station is already in this line
        const existingLineEntry = station.lines.find(line => line.line.toString() === lineId.toString());
        if (existingLineEntry) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Station is already part of this line'
            });
        }

        // Check if lineOrder is already taken
        const existingOrder = await Station.findOne({
            'lines.line': lineId,
            'lines.lineOrder': lineOrder
        }).session(session);

        if (existingOrder) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Another station already has this line order'
            });
        }

        // Add station to line
        station.lines.push({
            line: lineId,
            lineOrder,
            arrival,
            departure
        });
        await station.save({ session });

        // Update the line's stations array
        line.stations.push({
            station: stationId,
            arrival,
            departure
        });
        await line.save({ session });

        await session.commitTransaction();

        const updatedStation = await Station.findById(stationId).populate('lines.line', 'lineName');

        res.status(200).json({
            success: true,
            message: 'Station added to line successfully',
            data: updatedStation
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            success: false,
            message: 'Error adding station to line',
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

// Remove station from a line
const removeStationFromLine = async (req, res) => {
    const session = await Station.startSession();
    session.startTransaction();

    try {
        const { lineId } = req.params;
        const stationId = req.params.id;

        // Check if station exists
        const station = await Station.findById(stationId).session(session);
        if (!station) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Station not found'
            });
        }

        // Check if station is part of the line
        const lineEntry = station.lines.find(line => line.line.toString() === lineId.toString());
        if (!lineEntry) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Station is not part of this line'
            });
        }

        // Remove station from line
        station.lines = station.lines.filter(line => line.line.toString() !== lineId.toString());
        await station.save({ session });

        // Update the line's stations array
        const line = await Line.findById(lineId).session(session);
        if (line) {
            line.stations = line.stations.filter(s => s.station.toString() !== stationId.toString());
            await line.save({ session });
        }

        await session.commitTransaction();

        const updatedStation = await Station.findById(stationId).populate('lines.line', 'lineName');

        res.status(200).json({
            success: true,
            message: 'Station removed from line successfully',
            data: updatedStation
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            success: false,
            message: 'Error removing station from line',
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

// Update station's order in a line
const updateStationOrder = async (req, res) => {
    const session = await Station.startSession();
    session.startTransaction();

    try {
        const { lineId, newOrder } = req.body;
        const stationId = req.params.id;

        const station = await Station.findById(stationId).session(session);
        if (!station) {
            await session.abortTransaction();
            return res.status(404).json({
                success: false,
                message: 'Station not found'
            });
        }

        // Check if station is part of the line
        const lineEntry = station.lines.find(line => line.line.toString() === lineId.toString());
        if (!lineEntry) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Station is not part of this line'
            });
        }

        // Check if new order is already taken
        const existingOrder = await Station.findOne({
            'lines.line': lineId,
            'lines.lineOrder': newOrder,
            _id: { $ne: stationId }
        }).session(session);

        if (existingOrder) {
            await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: 'Another station already has this order'
            });
        }

        // Update the order
        lineEntry.lineOrder = newOrder;
        await station.save({ session });

        await session.commitTransaction();

        const updatedStation = await Station.findById(stationId).populate('lines.line', 'lineName');

        res.status(200).json({
            success: true,
            message: 'Station order updated successfully',
            data: updatedStation
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({
            success: false,
            message: 'Error updating station order',
            error: error.message
        });
    } finally {
        session.endSession();
    }
};

// Find stations by line
const findStationsByLine = async (req, res) => {
    try {
        const { lineId } = req.params;
        const stations = await Station.find({ 'lines.line': lineId })
            .sort({ 'lines.lineOrder': 1 })
            .populate('lines.line', 'lineName');

        res.status(200).json({
            success: true,
            count: stations.length,
            data: stations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching stations for line',
            error: error.message
        });
    }
};

module.exports = {
    createStation,
    getAllStations,
    getStationById,
    updateStation,
    deleteStation,
    addStationToLine,
    removeStationFromLine,
    updateStationOrder,
    findStationsByLine
}; 