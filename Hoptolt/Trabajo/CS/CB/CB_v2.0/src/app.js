const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cageRoutes = require('./routes/cageRoutes');
const raceRoutes = require('./routes/raceRoutes');
const rabbitRoutes = require('./routes/rabbitRoutes');
const assignRabbitRoutes = require('./routes/assignRabbitRoutes');
const matingRoutes = require('./routes/matingRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', cageRoutes);
app.use('/api', raceRoutes);
app.use('/api', rabbitRoutes);
app.use('/api', assignRabbitRoutes);
app.use('/api', matingRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});