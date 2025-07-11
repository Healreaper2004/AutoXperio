// seedUsers.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const users = [
  { username: "Arsh Anand", password: "arsh123", role: "customer" },
  { username: "Priyank Agrawal", password: "priyank123", role: "customer" },
  { username: "Ayush Biswas", password: "ayush123", role: "customer" },
  { username: "Shubham Kumar", password: "shubham123", role: "customer" },
  { username: "Neel Patel", password: "neel123", role: "customer" },
  { username: "Abhishek Bapat", password: "abhishek123", role: "customer" },
  { username: "Utkarsh Mathur", password: "utkarsh123", role: "customer" },
  { username: "Healreaper", password: "ayush@2004", role: "owner" }, // 👈 Owner account
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany(); // Clear existing users

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        username: user.username,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
      }))
    );

    await User.insertMany(hashedUsers);
    console.log("🎉 Users seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
};

seedUsers();
