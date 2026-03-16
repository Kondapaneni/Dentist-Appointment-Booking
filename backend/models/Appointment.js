const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    dentist_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dentist",
      required: true,
    },
    patient_name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    appointment_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  },
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
