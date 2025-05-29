const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  toStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  bookingTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked",
  }
});

module.exports = mongoose.model("Ticket", ticketSchema);
