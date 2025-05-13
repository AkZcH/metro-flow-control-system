import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  origin: String,
  destination: String,
  bookedAt: Date,
  validTill: Date,
  isUsed: { type: Boolean, default: false },
});

export default mongoose.model("Ticket", ticketSchema);
