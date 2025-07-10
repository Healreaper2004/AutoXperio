const mongoose = require('mongoose');
const InventoryItem = require('./models/InventoryItem');

mongoose.connect('mongodb://127.0.0.1:27017/autoxperio').then(async () => {
    console.log("Connected to DB. Seeding inventory...");

    await InventoryItem.deleteMany();

    await InventoryItem.insertMany([
        { name: 'Brake Pads', category: 'Brake System', quantity: 30, unitPrice: 45 },
        { name: 'Oil Filter', category: 'Engine Parts', quantity: 15, unitPrice: 12.5 },
        { name: 'Air Filter', category: 'Engine Parts', quantity: 20, unitPrice: 18 },
        { name: 'Battery', category: 'Electrical', quantity: 8, unitPrice: 90 }
    ]);

    console.log("Inventory seeded.");
    process.exit();
});
