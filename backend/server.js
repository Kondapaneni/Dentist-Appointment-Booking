const express = require("express");
const path = require("path");
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

// Serve frontend build in production
const frontendPath = path.join(__dirname, "..", "dist");
app.use(express.static(frontendPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Something went wrong!", message: err.message });
});

// Auto-seed dentists if the table is empty
async function autoSeed() {
  const count = await Dentist.count();
  if (count === 0) {
    const sampleDentists = require("./seedData");
    await Dentist.bulkCreate(sampleDentists);
    console.log("✅ Auto-seeded dentist data");
  }
}

// Sync database and start server
sequelize
  .sync()
  .then(async () => {
    console.log("✅ SQLite database synced");
    await autoSeed();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database sync error:", err);
  });

module.exports = app;
