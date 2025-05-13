const bufferSchema = new mongoose.Schema({
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' },
    status: { type: String, enum: ['queued', 'validated'], default: 'queued' },
    enteredAt: Date
  });
  
  export default mongoose.model("BufferQueue", bufferSchema);
  