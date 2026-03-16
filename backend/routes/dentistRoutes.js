const express = require("express");
const router = express.Router();
const Dentist = require("../models/Dentist");

// GET all dentists
router.get("/", async (req, res) => {
  try {
    const dentists = await Dentist.find().sort({ name: 1 });
    res.json(dentists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET dentist by ID
router.get("/:id", async (req, res) => {
  try {
    const dentist = await Dentist.findById(req.params.id);
    if (!dentist) {
      return res.status(404).json({ error: "Dentist not found" });
    }
    res.json(dentist);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST create new dentist
router.post("/", async (req, res) => {
  try {
    const dentist = new Dentist(req.body);
    await dentist.save();
    res.status(201).json(dentist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update dentist
router.put("/:id", async (req, res) => {
  try {
    const dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dentist) {
      return res.status(404).json({ error: "Dentist not found" });
    }
    res.json(dentist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE dentist
router.delete("/:id", async (req, res) => {
  try {
    const dentist = await Dentist.findByIdAndDelete(req.params.id);
    if (!dentist) {
      return res.status(404).json({ error: "Dentist not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
