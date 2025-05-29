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
const stationValidationRules = {
    createStation: [
        body('name')
            .trim()
            .notEmpty().withMessage('Station name is required')
            .isLength({ min: 2 }).withMessage('Station name must be at least 2 characters long')
    ],

    updateStation: [
        param('id').isMongoId().withMessage('Invalid station ID'),
        body('name')
            .optional()
            .trim()
            .isLength({ min: 2 }).withMessage('Station name must be at least 2 characters long')
    ],

    addStationToLine: [
        param('id').isMongoId().withMessage('Invalid station ID'),
        body('lineId')
            .isMongoId().withMessage('Invalid line ID'),
        body('lineOrder')
            .isInt({ min: 0 }).withMessage('Line order must be a non-negative integer'),
        body('arrival')
            .matches(timeRegex).withMessage('Arrival time must be in HH:MM format (e.g., 09:30)'),
        body('departure')
            .matches(timeRegex).withMessage('Departure time must be in HH:MM format (e.g., 09:35)')
            .custom((departure, { req }) => {
                if (departure <= req.body.arrival) {
                    throw new Error('Departure time must be after arrival time');
                }
                return true;
            })
    ],

    updateStationOrder: [
        param('id').isMongoId().withMessage('Invalid station ID'),
        body('lineId')
            .isMongoId().withMessage('Invalid line ID'),
        body('newOrder')
            .isInt({ min: 0 }).withMessage('New order must be a non-negative integer')
    ],

    removeStationFromLine: [
        param('id').isMongoId().withMessage('Invalid station ID'),
        param('lineId').isMongoId().withMessage('Invalid line ID')
    ],

    getStationById: [
        param('id').isMongoId().withMessage('Invalid station ID')
    ],

    findStationsByLine: [
        param('lineId').isMongoId().withMessage('Invalid line ID')
    ]
};

module.exports = {
    validate,
    stationValidationRules
}; 