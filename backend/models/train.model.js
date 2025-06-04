const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    line: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Line',
        required: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    totalCapacity: {
        type: Number,
        required: true,
        default: 1200 // Typical metro train capacity
    },
    availableCapacity: {
        type: Number,
        required: true
    },
    bookedTickets: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['SCHEDULED', 'DELAYED', 'CANCELLED', 'COMPLETED'],
        default: 'SCHEDULED'
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
trainSchema.index({ line: 1, departureTime: 1 }, { unique: true });

// Validate available capacity
trainSchema.pre('save', function(next) {
    if (this.availableCapacity < 0) {
        next(new Error('Available capacity cannot be negative'));
    }
    if (this.availableCapacity > this.totalCapacity) {
        next(new Error('Available capacity cannot exceed total capacity'));
    }
    if (this.bookedTickets < 0) {
        next(new Error('Booked tickets cannot be negative'));
    }
    if (this.bookedTickets + this.availableCapacity !== this.totalCapacity) {
        next(new Error('Booked tickets + available capacity must equal total capacity'));
    }
    next();
});

// Virtual for occupancy percentage
trainSchema.virtual('occupancyPercentage').get(function() {
    return ((this.totalCapacity - this.availableCapacity) / this.totalCapacity) * 100;
});

// Method to check if train is full
trainSchema.methods.isFull = function() {
    return this.availableCapacity === 0;
};

// Method to check if train has enough capacity
trainSchema.methods.hasEnoughCapacity = function(passengerCount) {
    return this.availableCapacity >= passengerCount;
};

const Train = mongoose.model('Train', trainSchema);

module.exports = Train; 