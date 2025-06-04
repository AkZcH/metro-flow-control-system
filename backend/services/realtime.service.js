const socketIO = require('socket.io');

class RealtimeService {
    constructor() {
        this.io = null;
        this.connectedUsers = new Map(); // Store connected users
    }

    // Initialize Socket.IO with the HTTP server
    initialize(server) {
        this.io = socketIO(server, {
            cors: {
                origin: process.env.FRONTEND_URL || "http://localhost:3000",
                methods: ["GET", "POST"]
            }
        });

        this.setupSocketHandlers();
    }

    // Setup Socket.IO event handlers
    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            // Handle user authentication
            socket.on('authenticate', (userId) => {
                this.connectedUsers.set(socket.id, userId);
                socket.join(`user_${userId}`);
            });

            // Handle booking notifications subscription
            socket.on('subscribeToBookings', (userId) => {
                socket.join(`bookings_${userId}`);
            });

            // Handle disconnection
            socket.on('disconnect', () => {
                const userId = this.connectedUsers.get(socket.id);
                if (userId) {
                    this.connectedUsers.delete(socket.id);
                }
                console.log('Client disconnected:', socket.id);
            });
        });
    }

    // Notify users about booking status
    notifyBookingStatus(userId, bookingId, status, details) {
        this.io.to(`bookings_${userId}`).emit('bookingUpdate', {
            bookingId,
            status,
            details,
            timestamp: new Date()
        });
    }

    // Broadcast capacity update for a specific train
    broadcastCapacityUpdate(lineId, departureTime, capacity) {
        this.io.to(`train_${lineId}`).emit('capacityUpdate', {
            lineId,
            departureTime,
            availableSeats: capacity.availableSeats,
            totalSeats: capacity.totalSeats,
            lastUpdated: new Date()
        });
    }

    // Get number of connected users
    getConnectedUsersCount() {
        return this.connectedUsers.size;
    }
}

// Export singleton instance
module.exports = new RealtimeService(); 