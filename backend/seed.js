const mongoose = require("mongoose");
const Dentist = require("./models/Dentist");
require("dotenv").config();

const sampleDentists = [
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@dental.com",
    specialty: "General Dentistry",
    qualification: "DDS, Harvard School of Dental Medicine",
    experience: "15 years",
    clinic_name: "Bright Smiles Dental Clinic",
    address: "123 Main Street, Suite 100",
    location: "New York, NY",
    photo_url: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Dr. Michael Chen",
    email: "michael.chen@dental.com",
    specialty: "Orthodontics",
    qualification: "DMD, Columbia University",
    experience: "12 years",
    clinic_name: "Perfect Align Orthodontics",
    address: "456 Park Avenue, Floor 3",
    location: "New York, NY",
    photo_url: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@dental.com",
    specialty: "Pediatric Dentistry",
    qualification: "DDS, University of California San Francisco",
    experience: "10 years",
    clinic_name: "Kids First Dental Care",
    address: "789 Children's Way",
    location: "San Francisco, CA",
    photo_url: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Dr. James Wilson",
    email: "james.wilson@dental.com",
    specialty: "Cosmetic Dentistry",
    qualification: "DMD, University of Pennsylvania",
    experience: "18 years",
    clinic_name: "Hollywood Smile Studio",
    address: "321 Sunset Boulevard",
    location: "Los Angeles, CA",
    photo_url: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Dr. Lisa Park",
    email: "lisa.park@dental.com",
    specialty: "Periodontics",
    qualification: "DDS, Boston University",
    experience: "14 years",
    clinic_name: "Healthy Gums Clinic",
    address: "555 Wellness Drive",
    location: "Boston, MA",
    photo_url: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Dr. Robert Martinez",
    email: "robert.martinez@dental.com",
    specialty: "Endodontics",
    qualification: "DMD, University of Michigan",
    experience: "16 years",
    clinic_name: "Root Canal Specialists",
    address: "888 Treatment Lane",
    location: "Chicago, IL",
    photo_url: "https://randomuser.me/api/portraits/men/6.jpg",
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const MONGODB_URI =
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/dentistAppointments";
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Clear existing dentists
    await Dentist.deleteMany({});
    console.log("🗑️  Cleared existing dentists");

    // Insert sample dentists
    const insertedDentists = await Dentist.insertMany(sampleDentists);
    console.log(`✅ Inserted ${insertedDentists.length} sample dentists`);

    console.log("\n📋 Sample Dentists:");
    insertedDentists.forEach((dentist, index) => {
      console.log(
        `${index + 1}. ${dentist.name} - ${dentist.specialty} (${dentist.clinic_name})`,
      );
    });

    console.log("\n✨ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("\n👋 Connection closed");
  }
}

// Run the seed function
seedDatabase();
