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
  line: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Line",
    required: true,
  },
  fare: {
    type: Number,
    required: true,
    min: 0,
  },
  bookingTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["booked", "cancelled"],
    default: "booked",
  },
  route: [{
    line: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Line",
      required: true,
    },
    stations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
    }],
    isDirect: {
      type: Boolean,
      default: true,
    },
  }],
  interchangeStations: [{
    stationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Station",
    },
    stationName: String,
    line1Arrival: String,
    line1Departure: String,
    line2Arrival: String,
    line2Departure: String,
  }],
}, {
  timestamps: true,
});

// Index for efficient querying
ticketSchema.index({ user: 1, bookingTime: -1 });
ticketSchema.index({ fromStation: 1, toStation: 1 });
ticketSchema.index({ status: 1, bookingTime: 1 });

module.exports = mongoose.model("Ticket", ticketSchema);
