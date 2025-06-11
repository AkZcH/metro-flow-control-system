const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: false }, // Added name field
  password: { type: String, required: true }, // Hashed password
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema); 