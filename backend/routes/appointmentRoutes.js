const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const Appointment = require("../models/Appointment");
const Dentist = require("../models/Dentist");

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: {
        model: Dentist,
        attributes: ["name", "email", "specialty", "clinic_name"],
      },
      order: [["appointment_date", "ASC"]],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET appointment by ID
router.get("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: {
        model: Dentist,
        attributes: ["name", "email", "specialty", "clinic_name"],
      },
    });
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
    const appointments = await Appointment.findAll({
      where: { dentist_id: req.params.dentistId },
      order: [["appointment_date", "ASC"]],
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new appointment
router.post("/", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    const populatedAppointment = await Appointment.findByPk(appointment.id, {
      include: {
        model: Dentist,
        attributes: ["name", "email", "specialty", "clinic_name"],
      },
    });
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
      where: {
        dentist_id: dentistId,
        appointment_date: appointmentDate,
        status: { [Op.in]: ["Confirmed", "Pending"] },
      },
    });
    res.json({ available: !existingAppointment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update appointment
router.put("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    await appointment.update(req.body);
    const updated = await Appointment.findByPk(req.params.id, {
      include: {
        model: Dentist,
        attributes: ["name", "email", "specialty", "clinic_name"],
      },
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE appointment
router.delete("/:id", async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    await appointment.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
