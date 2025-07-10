// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String, // customer or owner
});

module.exports = mongoose.model("User", userSchema);
