// backend/seedUsers.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/autoxperio")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// User data
const users = [
  { username: "Arsh Anand", password: "arsh123", role: "customer" },
  { username: "Priyank Agrawal", password: "priyank123", role: "customer" },
  { username: "Ayush Biswas", password: "ayush123", role: "customer" },
  { username: "Shubham Kumar", password: "shubham123", role: "customer" },
  { username: "Neel Patel", password: "neel123", role: "customer" },
  { username: "Abhishek Bapat", password: "abhishek123", role: "customer" },
  { username: "Utkarsh Mathur", password: "utkarsh123", role: "customer" }
];

// Insert users
async function insertUsers() {
  for (const user of users) {
    const existing = await User.findOne({ username: user.username });
    if (existing) {
      console.log(`User ${user.username} already exists.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      username: user.username,
      password: hashedPassword,
      role: user.role
    });

    await newUser.save();
    console.log(`Inserted: ${user.username}`);
  }

  mongoose.disconnect();
}

insertUsers();
