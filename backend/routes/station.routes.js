const express = require('express');
const router = express.Router();
const {
    createStation,
    getAllStations,
    getStationById,
    updateStation,
    deleteStation,
    addStationToLine,
    removeStationFromLine,
    updateStationOrder,
    findStationsByLine
} = require('../controllers/station.controller');
const { authUser } = require('../middlewares/auth.middleware');
const { validate, stationValidationRules } = require('../middlewares/station.validator');

// Apply authentication middleware to all routes
router.use(authUser);

// Create a new station
router.post('/createStation', 
    stationValidationRules.createStation,
    validate,
    createStation
);

// Get all stations
router.get('/getAllStations', getAllStations);

// Get a single station by ID
router.get('/getStation/:id',
    stationValidationRules.getStationById,
    validate,
    getStationById
);

// Update a station
router.put('/updateStation/:id',
    stationValidationRules.updateStation,
    validate,
    updateStation
);

// Delete a station
router.delete('/deleteStation/:id',
    stationValidationRules.getStationById,
    validate,
    deleteStation
);

// Add a station to a line
router.post('/addToLine/:id',
    stationValidationRules.addStationToLine,
    validate,
    addStationToLine
);

// Remove a station from a line
router.delete('/removeFromLine/:id/:lineId',
    stationValidationRules.removeStationFromLine,
    validate,
    removeStationFromLine
);

// Update station's order in a line
router.put('/updateOrder/:id',
    stationValidationRules.updateStationOrder,
    validate,
    updateStationOrder
);

// Find stations by line
router.get('/getStationsByLine/:lineId',
    stationValidationRules.findStationsByLine,
    validate,
    findStationsByLine
);

module.exports = router; 