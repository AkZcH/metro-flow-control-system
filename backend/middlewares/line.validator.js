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
        body('stations.*.arrival').matches(timeRegex),
        body('stations.*.departure')
            .matches(timeRegex)
            .custom((departure, { req, path }) => {
                const stationIndex = path.split('.')[1];
                return departure > req.body.stations[stationIndex].arrival;
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