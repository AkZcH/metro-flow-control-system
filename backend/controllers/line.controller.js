const Line = require('../models/line.model');
const Station = require('../models/station.model');

// Create a new metro line
const createLine = async (req, res) => {
    try {
        const { lineName, stations, frequencyMinutes } = req.body;

        // Validate required fields
        if (!lineName || !stations || !frequencyMinutes) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: lineName, stations, and frequencyMinutes'
            });
        }

        // Check if line already exists
        const existingLine = await Line.findOne({ lineName });
        if (existingLine) {
            return res.status(400).json({
                success: false,
                message: 'A line with this name already exists'
            });
        }

        // Validate stations
        for (const station of stations) {
            if (!station.name || !station.arrival || !station.departure) {
                return res.status(400).json({
                    success: false,
                    message: 'Each station must have name, arrival, and departure times'
                });
            }

            // Validate time format (HH:MM)
            const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(station.arrival) || !timeRegex.test(station.departure)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid time format. Use HH:MM format with leading zeros (e.g., 03:05)'
                });
            }
        }

        // Create new line
        const newLine = new Line({
            lineName,
            stations,
            frequencyMinutes
        });

        await newLine.save();

        res.status(201).json({
            success: true,
            message: 'Metro line created successfully',
            data: newLine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating metro line',
            error: error.message
        });
    }
};

// Get all metro lines
const getAllLines = async (req, res) => {
    try {
        const lines = await Line.find();
        res.status(200).json({
            success: true,
            count: lines.length,
            data: lines
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching metro lines',
            error: error.message
        });
    }
};

// Get a single metro line by ID
const getLineById = async (req, res) => {
    try {
        const line = await Line.findById(req.params.id);
        
        if (!line) {
            return res.status(404).json({
                success: false,
                message: 'Metro line not found'
            });
        }

        res.status(200).json({
            success: true,
            data: line
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching metro line',
            error: error.message
        });
    }
};

// Update a metro line
const updateLine = async (req, res) => {
    try {
        const { lineName, stations, frequencyMinutes } = req.body;
        const lineId = req.params.id;

        // Check if line exists
        const line = await Line.findById(lineId);
        if (!line) {
            return res.status(404).json({
                success: false,
                message: 'Metro line not found'
            });
        }

        // If lineName is being updated, check for duplicates
        if (lineName && lineName !== line.lineName) {
            const existingLine = await Line.findOne({ lineName });
            if (existingLine) {
                return res.status(400).json({
                    success: false,
                    message: 'A line with this name already exists'
                });
            }
        }

        // Validate stations if provided
        if (stations) {
            for (const station of stations) {
                if (!station.name || !station.arrival || !station.departure) {
                    return res.status(400).json({
                        success: false,
                        message: 'Each station must have name, arrival, and departure times'
                    });
                }

                const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
                if (!timeRegex.test(station.arrival) || !timeRegex.test(station.departure)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid time format. Use HH:MM format with leading zeros (e.g., 03:05)'
                    });
                }
            }
        }

        // Update line
        const updatedLine = await Line.findByIdAndUpdate(
            lineId,
            { 
                ...(lineName && { lineName }),
                ...(stations && { stations }),
                ...(frequencyMinutes && { frequencyMinutes })
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Metro line updated successfully',
            data: updatedLine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating metro line',
            error: error.message
        });
    }
};

// Delete a metro line
const deleteLine = async (req, res) => {
    try {
        const line = await Line.findByIdAndDelete(req.params.id);
        
        if (!line) {
            return res.status(404).json({
                success: false,
                message: 'Metro line not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Metro line deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting metro line',
            error: error.message
        });
    }
};

// Get stations for a specific line
const getLineStations = async (req, res) => {
    try {
        const line = await Line.findById(req.params.id);
        
        if (!line) {
            return res.status(404).json({
                success: false,
                message: 'Metro line not found'
            });
        }

        res.status(200).json({
            success: true,
            data: line.stations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching line stations',
            error: error.message
        });
    }
};

// Add a station to a line
const addStationToLine = async (req, res) => {
    try {
        const { name, arrival, departure } = req.body;
        const lineId = req.params.id;

        // Validate required fields
        if (!name || !arrival || !departure) {
            return res.status(400).json({
                success: false,
                message: 'Please provide station name, arrival, and departure times'
            });
        }

        // Validate time format
        const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(arrival) || !timeRegex.test(departure)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid time format. Use HH:MM format with leading zeros (e.g., 03:05)'
            });
        }

        const line = await Line.findById(lineId);
        if (!line) {
            return res.status(404).json({
                success: false,
                message: 'Metro line not found'
            });
        }

        // Check if station already exists in the line
        const stationExists = line.stations.some(station => station.name === name);
        if (stationExists) {
            return res.status(400).json({
                success: false,
                message: 'Station already exists in this line'
            });
        }

        // Add new station
        line.stations.push({ name, arrival, departure });
        await line.save();

        res.status(200).json({
            success: true,
            message: 'Station added successfully',
            data: line
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding station to line',
            error: error.message
        });
    }
};

// Remove a station from a line
const removeStationFromLine = async (req, res) => {
    try {
        const { stationName } = req.params;
        const lineId = req.params.id;

        const line = await Line.findById(lineId);
        if (!line) {
            return res.status(404).json({
                success: false,
                message: 'Metro line not found'
            });
        }

        // Remove station
        line.stations = line.stations.filter(station => station.name !== stationName);
        await line.save();

        res.status(200).json({
            success: true,
            message: 'Station removed successfully',
            data: line
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error removing station from line',
            error: error.message
        });
    }
};

module.exports = {
    createLine,
    getAllLines,
    getLineById,
    updateLine,
    deleteLine,
    getLineStations,
    addStationToLine,
    removeStationFromLine
};
