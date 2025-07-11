const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect("mongodb+srv://dpsayush2004:QO4xoFm1ma1uB6uR@autoxperiocluster.4prqzeq.mongodb.net/autoxperio?retryWrites=true&w=majority")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// User data (emails instead of username)
const users = [
  { email: "arsh@example.com", password: "arsh123", role: "customer" },
  { email: "priyank@example.com", password: "priyank123", role: "customer" },
  { email: "ayush@example.com", password: "ayush123", role: "customer" },
  { email: "shubham@example.com", password: "shubham123", role: "customer" },
  { email: "neel@example.com", password: "neel123", role: "customer" },
  { email: "abhishek@example.com", password: "abhishek123", role: "customer" },
  { email: "utkarsh@example.com", password: "utkarsh123", role: "customer" }
];

// Insert users
async function insertUsers() {
  for (const user of users) {
    const existing = await User.findOne({ email: user.email });
    if (existing) {
      console.log(`ℹ️ User ${user.email} already exists.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User({
      email: user.email,
      password: hashedPassword,
      role: user.role
    });

    await newUser.save();
    console.log(`✅ Inserted: ${user.email}`);
  }

  mongoose.disconnect();
}

insertUsers();
