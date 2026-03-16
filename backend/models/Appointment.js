const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dentist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Dentists",
        key: "id",
      },
    },
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 120,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["Male", "Female", "Other"]],
      },
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Confirmed",
      validate: {
        isIn: [["Pending", "Confirmed", "Completed", "Cancelled"]],
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Appointment;
