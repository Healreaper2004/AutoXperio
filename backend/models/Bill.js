const mongoose = require('mongoose');
const billSchema = new mongoose.Schema({
  invoiceNumber: String,
  customerName: String,
  phone: String,
  email: String,
  serviceDate: String,
  vehicleNumber: String,
  serviceType: String,
  items: [
    {
      name: String,
      quantity: String,
      unitPrice: Number,
      total: Number
    }
  ],
  remarks: String,
  subtotal: Number,
  tax: Number,
  total: Number
});

module.exports = mongoose.model('Bill', billSchema);
