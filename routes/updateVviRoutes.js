const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Route to update VVI (Important) status
router.post('/:id', async (req, res) => {
  try {
    console.log("POST /updateVVI called", req.params.id, req.body);
    const { important } = req.body; // Get the important status from the request body

    // Find the problem by ID and update the 'vvi' field
    const problem = await Problem.findByIdAndUpdate(req.params.id, { vvi: important }, { new: true });

    // Send a response with the updated problem data
    res.json({ message: 'VVI status updated successfully', problem });
  } catch (error) {
    res.status(500).json({ message: 'Error updating VVI status', error });
  }
});

module.exports = router;
