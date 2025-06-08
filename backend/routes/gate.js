const express = require('express');
const { bookTicket, getMyTickets } = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/book', authMiddleware, bookTicket);
router.get('/my-tickets', authMiddleware, getMyTickets);

module.exports = router;
