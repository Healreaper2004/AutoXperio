const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");
const { verifyToken } = require("../middleware/authMiddleware");
const logActivity = require("../utils/logActivity");

// Middleware to allow only 'owner'
const ownerOnly = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: "Access denied. Owner only." });
  }
  next();
};

// 📦 GET all inventory items (Owner only)
router.get("/", verifyToken, ownerOnly, async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch inventory." });
  }
});

// ➕ POST new inventory item (Owner only)
router.post("/", verifyToken, ownerOnly, async (req, res) => {
  try {
    const newItem = new InventoryItem(req.body);
    await newItem.save();
    await logActivity(`New part added: ${newItem.name}`);
    res.json({ message: "Item added successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to add item." });
  }
});

// ✏️ PUT update inventory item (Owner only)
router.put("/:id", verifyToken, ownerOnly, async (req, res) => {
  try {
    await InventoryItem.findByIdAndUpdate(req.params.id, req.body);
    await logActivity(`Inventory updated: ${req.body.name}`);
    res.json({ message: "Item updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update item." });
  }
});

// ❌ DELETE inventory item (Owner only)
router.delete("/:id", verifyToken, ownerOnly, async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });

    await InventoryItem.findByIdAndDelete(req.params.id);
    await logActivity(`Part deleted: ${item.name}`);
    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete item." });
  }
});

module.exports = router;
