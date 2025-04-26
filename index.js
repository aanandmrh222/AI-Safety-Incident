const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const incidentsRouter = require('./routes/incidents');
const morgan = require('morgan');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use the incidents router
app.use('/incidents', incidentsRouter);

app.get('/', (req, res) => {
    res.send('HumanChain AI Safety Incident Log API');
});

// Error-handling middleware (defined last)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).json({ message: 'Something went wrong!' }); // Send a generic error message
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});