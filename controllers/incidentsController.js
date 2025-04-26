const Incident = require('../models/Incident');

// GET all incidents
exports.getAllIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find();
        res.status(200).json(incidents);
    } catch (err) {
        res.status(500).json({ message: err.message }); // Server error
    }
};

// POST a new incident
exports.createIncident = async (req, res) => {
    const incident = new Incident({
        title: req.body.title,
        description: req.body.description,
        severity: req.body.severity
    });

    try {
        const newIncident = await incident.save();
        res.status(201).json(newIncident); // 201 Created
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Mongoose validation error
            const errors = {};
            for (const field in err.errors) {
                errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ message: 'Validation error', errors });
        }
        res.status(400).json({ message: err.message }); // Bad request
    }
};

// GET a specific incident by ID
exports.getIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findById(req.params.id);
        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' }); // 404 Not Found
        }
        res.status(200).json(incident);
    } catch (err) {
        res.status(500).json({ message: err.message }); // Server error
    }
};

// DELETE an incident by ID
exports.deleteIncidentById = async (req, res) => {
    try {
        const incident = await Incident.findByIdAndDelete(req.params.id);
        if (!incident) {
            return res.status(404).json({ message: 'Incident not found' }); // 404 Not Found
        }
        res.status(204).send(); // 204 No Content (successful deletion)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Server error
    }
};