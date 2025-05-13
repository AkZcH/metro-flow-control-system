import express from 'express';
import { bookTicket, getMyTickets } from '../controllers/ticketController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
router.post('/book', authMiddleware, bookTicket);
router.get('/my', authMiddleware, getMyTickets);

export default router;
