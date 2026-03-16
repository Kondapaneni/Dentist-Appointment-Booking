const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./database");
const Dentist = require("./models/Dentist");
const Appointment = require("./models/Appointment");

// Set up associations
Dentist.hasMany(Appointment, { foreignKey: "dentist_id" });
Appointment.belongsTo(Dentist, { foreignKey: "dentist_id" });

const dentistRoutes = require("./routes/dentistRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/dentists", dentistRoutes);
app.use("/api/appointments", appointmentRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    database: "SQLite Connected",
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong!", message: err.message });
});

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("✅ SQLite database synced");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database sync error:", err);
  });

module.exports = app;
