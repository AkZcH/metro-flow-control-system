const express = require('express');
const router = express.Router();
const {
    createLine,
    getAllLines,
    getLineById,
    updateLine,
    deleteLine,
    getLineStations,
    addStationToLine,
    removeStationFromLine
} = require('../controllers/line.controller');
const { authUser } = require('../middlewares/auth.middleware');
const { validate, lineValidationRules } = require('../middlewares/line.validator');

// Apply authentication middleware to all routes
router.use(authUser);

// Create a new metro line
router.post('/createLine',
    lineValidationRules.createLine,
    validate,
    createLine
);

// Get all metro lines
router.get('/getAllLines', getAllLines);

// Get a single metro line by ID
router.get('/getLine/:id',
    lineValidationRules.getLineById,
    validate,
    getLineById
);

// Update a metro line
router.put('/updateLine/:id',
    lineValidationRules.updateLine,
    validate,
    updateLine
);

// Delete a metro line
router.delete('/deleteLine/:id',
    lineValidationRules.deleteLine,
    validate,
    deleteLine
);

// Get all stations for a specific line
router.get('/getStations/:id',
    lineValidationRules.getLineStations,
    validate,
    getLineStations
);

// Add a station to a line
router.post('/addStation/:id',
    lineValidationRules.addStationToLine,
    validate,
    addStationToLine
);

// Remove a station from a line
router.delete('/removeStation/:id/:stationId',
    lineValidationRules.removeStationFromLine,
    validate,
    removeStationFromLine
);

module.exports = router; 