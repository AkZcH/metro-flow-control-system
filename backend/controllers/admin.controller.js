const User = require('../models/user.model');
const Ticket = require('../models/ticket.model');

exports.getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeTickets = await Ticket.countDocuments({
      status: { $in: ['booked', 'active', 'pending'] }, // Adjust statuses based on your ticket model
    });
    // Placeholder for revenue - replace with actual calculation if you have a transactions model
    const totalRevenue = 100000; // Example static value

    res.status(200).json({
      totalUsers,
      activeTickets,
      totalRevenue,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({ message: 'Server error fetching dashboard statistics.' });
  }
}; 