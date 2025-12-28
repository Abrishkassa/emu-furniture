const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Book showroom visit
router.post('/book', async (req, res) => {
  try {
    const booking = await prisma.showroomBooking.create({
      data: {
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });
    
    // Check for conflicting bookings
    const conflictingBooking = await prisma.showroomBooking.findFirst({
      where: {
        bookingDate: new Date(req.body.bookingDate),
        bookingTime: req.body.bookingTime,
        status: { in: ['PENDING', 'CONFIRMED'] }
      }
    });
    
    res.status(201).json({ 
      message: 'Showroom booking submitted successfully',
      booking,
      hasConflict: !!conflictingBooking
    });
  } catch (error) {
    console.error('Error booking showroom:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all bookings (admin)
router.get('/', async (req, res) => {
  try {
    const { date, status } = req.query;
    
    const where = {};
    
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      where.bookingDate = {
        gte: startDate,
        lte: endDate
      };
    }
    
    if (status) {
      where.status = status;
    }
    
    const bookings = await prisma.showroomBooking.findMany({
      where,
      orderBy: [
        { bookingDate: 'asc' },
        { bookingTime: 'asc' }
      ]
    });
    
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching showroom bookings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Confirm booking
router.put('/:id/confirm', async (req, res) => {
  try {
    const booking = await prisma.showroomBooking.update({
      where: { id: req.params.id },
      data: {
        status: 'CONFIRMED',
        confirmedBy: req.body.confirmedBy || 'admin',
        confirmationDate: new Date()
      }
    });
    
    res.json(booking);
  } catch (error) {
    console.error('Error confirming booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', async (req, res) => {
  try {
    const booking = await prisma.showroomBooking.update({
      where: { id: req.params.id },
      data: {
        status: 'CANCELLED',
        notes: req.body.reason
      }
    });
    
    res.json(booking);
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get available time slots for a date
router.get('/availability/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    date.setHours(0, 0, 0, 0);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const bookings = await prisma.showroomBooking.findMany({
      where: {
        bookingDate: {
          gte: date,
          lt: nextDay
        },
        status: { in: ['PENDING', 'CONFIRMED'] }
      }
    });
    
    const bookedTimes = bookings.map(b => b.bookingTime);
    
    // Available time slots
    const allSlots = [
      '09:00 AM', '10:30 AM', '12:00 PM', 
      '02:00 PM', '03:30 PM', '05:00 PM'
    ];
    
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));
    
    res.json({
      date: req.params.date,
      bookedTimes,
      availableSlots,
      totalBookings: bookings.length
    });
  } catch (error) {
    console.error('Error checking availability:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;