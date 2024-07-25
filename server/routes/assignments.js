// routes/assignments.js
const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Create an assignment
router.post('/', async (req, res) => {
    const { userId, assetId, assignmentDate } = req.body;
    try {
        const newAssignment = new Assignment({ userId, assetId, assignmentDate });
        await newAssignment.save();
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update an assignment
router.put('/:id', async (req, res) => {
    const { userId, assetId, assignmentDate, status } = req.body;
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        assignment.userId = userId || assignment.userId;
        assignment.assetId = assetId || assignment.assetId;
        assignment.assignmentDate = assignmentDate || assignment.assignmentDate;
        assignment.status = status || assignment.status;

        const updatedAssignment = await assignment.save();
        res.json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        await assignment.remove();
        res.json({ message: 'Assignment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
