const express = require("express");
const Booking = require("../models/Booking");
const InventoryItem = require("../models/InventoryItem");
const Invoice = require("../models/Bill");
const ActivityLog = require("../models/ActivityLog"); // Optional, create this model
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 📊 GET /api/dashboard/stats
router.get("/stats", verifyToken, async (req, res) => {
  try {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const todayStr = now.toISOString().split("T")[0];

    const totalServices = await Booking.countDocuments({ preferredDate: { $gte: firstDay } });

    const revenueAgg = await Invoice.aggregate([
      { $match: { date: { $gte: firstDay } } },
      { $group: { _id: null, total: { $sum: "$total" } } } // Fixed from "$totalAmount"
    ]);
    const revenue = revenueAgg[0]?.total || 0;

    const inventoryAgg = await InventoryItem.aggregate([
      { $group: { _id: null, totalQty: { $sum: "$quantity" } } }
    ]);
    const inventoryCount = inventoryAgg[0]?.totalQty || 0;

    const upcoming = await Booking.countDocuments({ preferredDate: { $gte: new Date() } });

    const todayAppointments = await Booking.countDocuments({
      preferredDate: { $eq: todayStr }
    });

    res.json({
      services: totalServices,
      revenue,
      inventory: inventoryCount,
      bookings: upcoming,
      todayAppointments
    });
  } catch (err) {
    console.error("❌ Error in stats:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🕒 GET /api/dashboard/activity
router.get("/activity", verifyToken, async (req, res) => {
  try {
    const activities = await ActivityLog.find().sort({ createdAt: -1 }).limit(5);
    const formatted = activities.map(log => ({
      message: log.message,
      timeAgo: timeSince(log.createdAt)
    }));
    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching activity:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🥧 GET /api/dashboard/part-usage
router.get("/part-usage", verifyToken, async (req, res) => {
  try {
    const parts = await InventoryItem.find();
    const usage = parts.map(part => ({
      part: part.name,
      quantity: part.quantity
    }));
    res.json(usage);
  } catch (err) {
    console.error("❌ Error in part usage:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📈 GET /api/dashboard/service-frequency (Mock)
router.get("/service-frequency", verifyToken, async (req, res) => {
  try {
    const mock = [
      { day: "Mon", count: 22 },
      { day: "Tue", count: 18 },
      { day: "Wed", count: 25 },
      { day: "Thu", count: 19 },
      { day: "Fri", count: 21 },
      { day: "Sat", count: 30 },
      { day: "Sun", count: 12 }
    ];
    res.json(mock);
  } catch (err) {
    console.error("❌ Error in service frequency:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 🕓 Format time ago
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

module.exports = router;
