const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // don't return password in queries
  },
  phoneNumber: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['passenger', 'staff', 'admin'],
    default: 'passenger'
  },
  metroCardNumber: {
    type: String,
    unique: true
  },
  balance: {
    type: Number,
    default: 0
  },
  activeTickets: [{
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    },
    validFrom: Date,
    validUntil: Date,
    status: {
      type: String,
      enum: ['active', 'used', 'expired'],
      default: 'active'
    }
  }],
  travelHistory: [{
    entryStation: String,
    exitStation: String,
    entryTime: Date,
    exitTime: Date,
    fare: Number
  }]
}, { timestamps: true });
