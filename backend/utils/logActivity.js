const ActivityLog = require("../models/ActivityLog");

async function logActivity(message) {
  try {
    await ActivityLog.create({ message });
  } catch (err) {
    console.error("❌ Failed to log activity:", err.message);
  }
}

module.exports = logActivity;
