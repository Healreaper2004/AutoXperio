const mongoose = require('mongoose');
const dotenv = require('dotenv');
const InventoryItem = require('../models/InventoryItem');

dotenv.config();

const sampleItems = [
  { name: "Brake Pads - Front", code: "BP-001", category: "Brake System", quantity: 50, unitPrice: 45.00 },
  { name: "Brake Pads - Rear", code: "BP-002", category: "Brake System", quantity: 50, unitPrice: 42.00 },
  { name: "Oil Filter", code: "OF-001", category: "Engine Parts", quantity: 50, unitPrice: 12.50 },
  { name: "Air Filter", code: "AF-001", category: "Engine Parts", quantity: 50, unitPrice: 18.75 },
  { name: "Spark Plug", code: "SP-001", category: "Engine Parts", quantity: 50, unitPrice: 28.00 },
  { name: "Clutch Plate", code: "CP-001", category: "Transmission", quantity: 50, unitPrice: 95.00 },
  { name: "Headlight Bulb", code: "HB-001", category: "Electrical", quantity: 50, unitPrice: 8.25 },
  { name: "Battery", code: "BT-001", category: "Electrical", quantity: 50, unitPrice: 75.00 },
  { name: "Wiper Blade", code: "WB-001", category: "Accessories", quantity: 50, unitPrice: 15.00 },
  { name: "Coolant", code: "CL-001", category: "Fluids", quantity: 50, unitPrice: 10.00 },
  { name: "Castrol Engine Oil", code: "EO-001", category: "Fluids", quantity: 200, unitPrice: 25.00 }
];

async function seedInventory() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await InventoryItem.deleteMany(); // Clears previous data
    await InventoryItem.insertMany(sampleItems);

    console.log("✅ Inventory seeded successfully.");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding inventory:", err);
    process.exit(1);
  }
}

seedInventory();
