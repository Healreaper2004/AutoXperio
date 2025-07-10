const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  preferredDate: { type: Date, required: true },   // ✅ change this to Date
  preferredTime: { type: String, required: true },
  issueDescription: { type: String },
  status: { type: String, default: 'Scheduled' },
  bookingId: { type: String }
});


module.exports = mongoose.model('Booking', bookingSchema);
