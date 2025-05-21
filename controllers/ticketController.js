const Ticket = require('../models/ticket');

exports.bookTicket = async (req, res) => {
  const { source, destination } = req.body;
  try {
    const ticket = new Ticket({ source, destination, user: req.user._id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Error booking ticket" });
  }
}; 