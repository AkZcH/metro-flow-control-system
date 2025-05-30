const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
    lineName: {
        type: String,
        required: [true, 'Line name is required'],
        unique: true,
        trim: true
    },
    stations: [{
        station: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Station',
            required: true
        },
        arrival: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
                },
                message: props => `${props.value} is not a valid time format! Use HH:MM format with leading zeros (e.g., 03:05)`
            }
        },
        departure: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(v);
                },
                message: props => `${props.value} is not a valid time format! Use HH:MM format with leading zeros (e.g., 03:05)`
            }
        }
    }],
    frequencyMinutes: {
        type: Number,
        required: [true, 'Frequency in minutes is required'],
        min: [1, 'Frequency must be at least 1 minute']
    }
}, {
    timestamps: true
});

// Index for faster queries
lineSchema.index({ 'stations.station': 1 });

const Line = mongoose.model('Line', lineSchema);

module.exports = Line;
