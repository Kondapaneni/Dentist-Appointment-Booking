const mongoose = require("mongoose");

const dentistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    clinic_name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    photo_url: {
      type: String,
      default: "https://via.placeholder.com/300",
    },
  },
  {
    timestamps: true,
  },
);

const Dentist = mongoose.model("Dentist", dentistSchema);

module.exports = Dentist;
