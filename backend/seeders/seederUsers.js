const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config({ path: "../.env" });

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const existing = await User.findOne({ email: "healreaper@example.com", role: "owner" });
  if (existing) {
    console.log("ℹ️ Test user already exists.");
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash("12345678", 10);

  await User.create({
    email: "healreaper@example.com",
    password: hashedPassword,
    role: "owner"
  });

  console.log("✅ Test user seeded");
  mongoose.disconnect();
}).catch(err => {
  console.error("❌ MongoDB error:", err.message);
});
