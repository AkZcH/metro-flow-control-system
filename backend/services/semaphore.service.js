const mongoose = require('mongoose');
const Train = require('../models/train.model'); // We'll use a dedicated Train model for capacity

class SemaphoreService {
    constructor() {
        this.locks = new Map(); // Store locks for different resources
        this.trainCapacity = new Map(); // Store train capacity information
    }

    // Book tickets for a train journey (atomic operation)
    async bookTickets(lineId, departureTime, passengerCount = 1) {
        try {
            // Use findOneAndUpdate with atomic operators to prevent overbooking
            const train = await Train.findOneAndUpdate(
                {
                    line: lineId,
                    departureTime: departureTime,
                    availableCapacity: { $gte: passengerCount } // Only update if enough capacity
                },
                {
                    $inc: { 
                        availableCapacity: -passengerCount,
                        bookedTickets: passengerCount
                    },
                    $set: { lastUpdated: new Date() }
                },
                {
                    new: true, // Return updated document
                    runValidators: true
                }
            );

            if (!train) {
                throw new Error('Not enough capacity available');
            }

            return train;
        } catch (error) {
            throw new Error(`Failed to book tickets: ${error.message}`);
        }
    }

    // Get current train capacity
    async getTrainCapacity(lineId, departureTime) {
        try {
            const train = await Train.findOne({
                line: lineId,
                departureTime: departureTime
            }).select('availableCapacity totalCapacity bookedTickets lastUpdated');

            return train || null;
        } catch (error) {
            throw new Error(`Failed to get train capacity: ${error.message}`);
        }
    }

    // Initialize train capacity (called when creating a new train schedule)
    async initializeTrainCapacity(lineId, departureTime, totalCapacity = 1200) {
        try {
            const train = await Train.findOneAndUpdate(
                {
                    line: lineId,
                    departureTime: departureTime
                },
                {
                    $setOnInsert: {
                        availableCapacity: totalCapacity,
                        totalCapacity: totalCapacity,
                        bookedTickets: 0,
                        lastUpdated: new Date()
                    }
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true
                }
            );

            return train;
        } catch (error) {
            throw new Error(`Failed to initialize train capacity: ${error.message}`);
        }
    }

    // Cancel tickets and release capacity
    async cancelTickets(lineId, departureTime, passengerCount) {
        try {
            const train = await Train.findOneAndUpdate(
                {
                    line: lineId,
                    departureTime: departureTime
                },
                {
                    $inc: { 
                        availableCapacity: passengerCount,
                        bookedTickets: -passengerCount
                    },
                    $set: { lastUpdated: new Date() }
                },
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!train) {
                throw new Error('Train not found');
            }

            return train;
        } catch (error) {
            throw new Error(`Failed to cancel tickets: ${error.message}`);
        }
    }

    // Acquire lock for a resource (train, seat, etc.)
    async acquireLock(resourceId, timeout = 5000) {
        if (this.locks.has(resourceId)) {
            const lock = this.locks.get(resourceId);
            if (Date.now() - lock.timestamp < timeout) {
                return false; // Lock is still valid
            }
        }

        this.locks.set(resourceId, {
            timestamp: Date.now(),
            resourceId
        });
        return true;
    }

    // Release lock for a resource
    releaseLock(resourceId) {
        this.locks.delete(resourceId);
    }

    // Reserve seats atomically using MongoDB's findOneAndUpdate
    async reserveSeats(lineId, departureTime, seatCount = 1) {
        try {
            // Use findOneAndUpdate with atomic operators
            const result = await Ticket.findOneAndUpdate(
                {
                    line: lineId,
                    departureTime: departureTime,
                    availableSeats: { $gte: seatCount } // Only update if enough seats
                },
                {
                    $inc: { availableSeats: -seatCount },
                    $set: { lastUpdated: new Date() }
                },
                {
                    new: true, // Return updated document
                    runValidators: true
                }
            );

            if (!result) {
                throw new Error('Not enough seats available');
            }

            return result;
        } catch (error) {
            throw new Error(`Failed to reserve seats: ${error.message}`);
        }
    }

    // Get current seat availability
    async getSeatAvailability(lineId, departureTime) {
        try {
            const train = await Ticket.findOne({
                line: lineId,
                departureTime: departureTime
            }).select('availableSeats totalSeats lastUpdated');

            return train || null;
        } catch (error) {
            throw new Error(`Failed to get seat availability: ${error.message}`);
        }
    }

    // Clean up expired locks
    cleanupLocks() {
        const now = Date.now();
        for (const [resourceId, lock] of this.locks.entries()) {
            if (now - lock.timestamp > 5000) { // 5 seconds timeout
                this.locks.delete(resourceId);
            }
        }
    }

    // Start periodic cleanup
    startCleanupInterval() {
        setInterval(() => this.cleanupLocks(), 1000); // Clean up every second
    }
}

// Export singleton instance
module.exports = new SemaphoreService(); 