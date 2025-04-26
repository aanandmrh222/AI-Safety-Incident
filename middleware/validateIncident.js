const validateIncident = (req, res, next) => {
    const { title, description, severity } = req.body;

    if (!title || !description || !severity) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const allowedSeverities = ['Low', 'Medium', 'High'];
    if (!allowedSeverities.includes(severity)) {
        return res.status(400).json({ message: 'Invalid severity value' });
    }

    next(); // Call next() to pass control to the next middleware or route handler
};

module.exports = validateIncident;