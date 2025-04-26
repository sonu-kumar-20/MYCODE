const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Route to update Solved status
router.post('/:id', async (req, res) => {
  try {
    const { solved } = req.body; // Get solved status from the request body

    // Find the problem by ID and update the 'solved' field
    const problem = await Problem.findByIdAndUpdate(req.params.id, { solved: solved }, { new: true });

    // Send a response with the updated problem data
    res.json({ message: 'Solved status updated successfully', problem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating solved status', error });
  }
});

module.exports = router;
