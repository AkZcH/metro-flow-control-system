const express = require('express');
const router = express.Router();
const {
    bookTicket,
    getUserTickets,
    getTicketById,
    cancelTicket,
    getFareEstimate
} = require('../controllers/ticket.controller');
const { authUser } = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authUser);

// Book a new ticket
router.post('/book', bookTicket);

// Get fare estimate
router.get('/fare-estimate', getFareEstimate);

// Get all tickets for a user
router.get('/user/:userId', getUserTickets);

// Get ticket by ID
router.get('/:id', getTicketById);

// Cancel ticket
router.patch('/:id/cancel', cancelTicket);

module.exports = router; 