const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
// const userRoutes = require('./routes/user.routes');
// const captainRoutes = require('./routes/captain.routes');
// const mapsRoutes = require('./routes/maps.routes');
// const rideRoutes = require('./routes/ride.routes');
const userRoutes = require('./routes/user.routes');
const lineRoutes = require('./routes/line.routes');
const stationRoutes = require('./routes/station.routes');
const ticketRoutes = require('./routes/ticket.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Metro');
});

app.use('/users', userRoutes);
app.use('/lines', lineRoutes);
app.use('/stations', stationRoutes);
app.use('/tickets', ticketRoutes);
// app.use('/captains', captainRoutes);
// app.use('/maps', mapsRoutes);
// app.use('/rides', rideRoutes);

module.exports = app;
