const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  message: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ActivityLog", activitySchema);
