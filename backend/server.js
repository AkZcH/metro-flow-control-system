// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';

// import authRoutes from './routes/auth.js';
// import ticketRoutes from './routes/tickets.js';
// import gateRoutes from './routes/gate.js';

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/gate', gateRoutes);

// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => app.listen(PORT, () => console.log(`Backend running on port ${PORT}`)))
//   .catch(err => console.error(err));


const http = require('http');
const app = require('./app');
// const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});