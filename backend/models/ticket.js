const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  train: { type: mongoose.Schema.Types.ObjectId, ref: 'Train' },
  from: String,
  to: String,
  seatNumber: Number,
  fare: Number,
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' },
  bookedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ticket", ticketSchema);
