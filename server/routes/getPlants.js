const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path to your User model

// Route to get all plants for a particular user
router.get('/plants/:userId', async (req, res) => {
  const { userId } = req.params; // Get userId from request params

  try {
    // Find the user by ID and populate the plants array
    const user = await User.findById(userId).populate('plants');
    
    // If user not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the populated plants array
    res.status(200).json(user.plants);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
