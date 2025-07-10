const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { vehicleNumber, serviceType, preferredDate, preferredTime, issueDescription } = req.body;

    if (!vehicleNumber || !serviceType || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const date = new Date(preferredDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    const monthStart = new Date(year, date.getMonth(), 1);
    const monthEnd = new Date(year, date.getMonth() + 1, 1);

    const count = await Booking.countDocuments({
      preferredDate: { $gte: monthStart, $lt: monthEnd }
    });

    const serial = String(count + 1).padStart(4, '0');
    const bookingId = `${year}-${month}-${serial}`;

    const booking = new Booking({
      bookingId,
      vehicleNumber,
      serviceType,
      preferredDate: new Date(preferredDate),
      preferredTime,
      issueDescription,
      status: 'Scheduled'
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });

  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/bookings/stats
router.get('/stats', async (req, res) => {
  try {
    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();
    const yearEnd = new Date(new Date().getFullYear() + 1, 0, 1).toISOString();

    const bookingsThisYear = await Booking.find({
      preferredDate: { $gte: yearStart, $lt: yearEnd }
    });

    const totalBookings = bookingsThisYear.length;
    const pendingBookings = bookingsThisYear.filter(b => b.status.toLowerCase() === 'scheduled').length;
    const completedBookings = bookingsThisYear.filter(b => b.status.toLowerCase() === 'completed').length;

    res.json({
      totalBookings,
      pendingBookings,
      completedBookings
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// GET /api/bookings (include _id for frontend editing)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ preferredDate: -1 });

    // Convert documents to plain objects to include _id
    const enrichedBookings = bookings.map(b => ({
      ...b.toObject(),
      _id: b._id.toString() // ensure ID is available for frontend
    }));

    res.json(enrichedBookings);
  } catch (error) {
    console.error("Booking fetch error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/bookings/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = req.body.status;
    await booking.save();

    res.json({ message: 'Status updated successfully', booking });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
