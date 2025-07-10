const cron = require('node-cron');
const InventoryItem = require('../models/InventoryItem');

function scheduleMonthlyRestock() {
  // At 00:00 on day-of-month 1
  cron.schedule('0 0 1 * *', async () => {
    const items = await InventoryItem.find({});
    for (let item of items) {
      item.quantity += 100;
      item.lastRestocked = new Date();
      await item.save();
    }
    console.log("✅ Monthly restock completed.");
  });
}

module.exports = scheduleMonthlyRestock;
