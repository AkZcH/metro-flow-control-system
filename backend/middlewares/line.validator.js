const { body, param, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Time format validation regex
const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

// Validation rules for different operations
const lineValidationRules = {
    createLine: [
        body('lineName').trim().notEmpty().isLength({ min: 2 }),
        body('frequencyMinutes').isInt({ min: 1 }),
        body('stations').isArray().notEmpty(),
        body('stations.*.station').isMongoId(),
        body('stations.*.arrival')
            .matches(timeRegex)
            .withMessage('Arrival time must be in HH:MM format (e.g., 06:00)'),
        body('stations.*.departure')
            .matches(timeRegex)
            .withMessage('Departure time must be in HH:MM format (e.g., 06:05)')
            .custom((departure, { req, path }) => {
                // Extract index from path (e.g., "stations[0].departure" -> 0)
                const indexMatch = path.match(/\[(\d+)\]/);
                if (!indexMatch) {
                    throw new Error('Invalid station index');
                }
                const stationIndex = parseInt(indexMatch[1]);
                
                // Check if stations array exists and has the required index
                if (!req.body.stations || !Array.isArray(req.body.stations) || !req.body.stations[stationIndex]) {
                    throw new Error('Invalid stations array');
                }
                
                const station = req.body.stations[stationIndex];
                if (!station.arrival) {
                    throw new Error('Arrival time is required for this station');
                }
                
                if (departure <= station.arrival) {
                    throw new Error('Departure time must be after arrival time');
                }
                
                return true;
            })
    ],

    updateLine: [
        param('id').isMongoId(),
        body('lineName').optional().trim().isLength({ min: 2 }),
        body('frequencyMinutes').optional().isInt({ min: 1 }),
        body('stations').optional().isArray().notEmpty(),
        body('stations.*.station').optional().isMongoId(),
        body('stations.*.arrival').optional().matches(timeRegex),
        body('stations.*.departure')
            .optional()
            .matches(timeRegex)
            .custom((departure, { req, path }) => {
                const stationIndex = path.split('.')[1];
                return departure > req.body.stations[stationIndex].arrival;
            })
    ],

    getLineById: [param('id').isMongoId()],
    deleteLine: [param('id').isMongoId()],
    getLineStations: [param('id').isMongoId()],

    addStationToLine: [
        param('id').isMongoId(),
        body('station').isMongoId(),
        body('arrival').matches(timeRegex),
        body('departure')
            .matches(timeRegex)
            .custom((departure, { req }) => departure > req.body.arrival)
    ],

    removeStationFromLine: [
        param('id').isMongoId(),
        param('stationId').isMongoId()
    ]
};

module.exports = {
    validate,
    lineValidationRules
}; 