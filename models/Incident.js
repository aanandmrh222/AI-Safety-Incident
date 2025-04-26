const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        required: true,
        enum: ['Low', 'Medium', 'High'] // Valid severity values
    },
    reported_at: {
        type: Date,
        default: Date.now // Automatically set to the current timestamp
    }
});

module.exports = mongoose.model('Incident', incidentSchema);