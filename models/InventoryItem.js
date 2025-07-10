const mongoose = require('mongoose');

const inventoryItemSchema = new mongoose.Schema({
  name: String,
  code: String,
  category: String,
  quantity: Number,
  unitPrice: Number,
  lastRestocked: Date
});

module.exports = mongoose.model('InventoryItem', inventoryItemSchema);
