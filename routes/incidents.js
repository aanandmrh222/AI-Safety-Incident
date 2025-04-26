const express = require('express');
const router = express.Router();
const incidentsController = require('../controllers/incidentsController');
const validateIncident = require('../middleware/validateIncident'); // Import the middleware

// GET all incidents
router.get('/', incidentsController.getAllIncidents);

// POST a new incident (with validation middleware)
router.post('/', validateIncident, incidentsController.createIncident);

// GET a specific incident by ID
router.get('/:id', incidentsController.getIncidentById);

// DELETE an incident by ID
router.delete('/:id', incidentsController.deleteIncidentById);

module.exports = router;