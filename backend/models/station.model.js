const mongoose = require('mongoose');

const stationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Station name is required'],
        unique: true
    },
    // lines will store an array of objects containing line reference and order
    lines: [{
        line: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Line',
            required: true
        },
        lineOrder: {
            type: Number,
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
    }]
}, {
    timestamps: true
});

// Index for faster queries
stationSchema.index({ 'lines.line': 1 });
 
const Station = mongoose.model('Station', stationSchema);

module.exports = Station;

