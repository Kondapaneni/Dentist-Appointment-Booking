const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("dentist_id", "name email specialty clinic_name")
      .sort({ appointment_date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "dentist_id",
      "name email specialty clinic_name",
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// GET appointments by dentist ID
router.get("/dentist/:dentistId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      dentist_id: req.params.dentistId,
    }).sort({ appointment_date: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    const populatedAppointment = await Appointment.findById(
      appointment._id,
    ).populate("dentist_id", "name email specialty clinic_name");
    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST check availability
router.post("/check-availability", async (req, res) => {
  try {
    const { dentistId, appointmentDate } = req.body;
    const existingAppointment = await Appointment.findOne({
      dentist_id: dentistId,
      appointment_date: appointmentDate,
      status: { $in: ["Confirmed", "Pending"] },
    });
    res.json({ available: !existingAppointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update appointment
router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    ).populate("dentist_id", "name email specialty clinic_name");
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
