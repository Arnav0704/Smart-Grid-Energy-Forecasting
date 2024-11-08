const express = require("express");
const Plant = require("../models/Plant");
const User = require("../models/User"); // Import User model
const authMiddleware = require("../middleware/AuthMidlleware");
const router = express.Router();

router.post("/add-plant", authMiddleware , async (req, res) => {
  const userId = req.userId; // Assuming `userId` is set by an authentication middleware
  try {
    // Create a new plant document
    const newPlant = new Plant({
      name: req.body.name,
      location: req.body.location,
      type: req.body.type,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      days: req.body.days,
      jsData: req.body.jsData,
      prediction: req.body.prediction
    });

    // Save the plant document to MongoDB
    const savedPlant = await newPlant.save();

    // Find the user and update the plants array
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.plants.push(savedPlant._id); // Add the plant ID to the user's plants array
    await user.save();

    res.status(201).json({ message: "Energy plant added successfully", plantId: savedPlant._id , prediction: req.body.prediction});
  } catch (error) {
    res.status(500).json({ message: "Error adding energy plant", error });
  }
});

module.exports = router;
