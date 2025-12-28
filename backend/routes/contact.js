const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        ...req.body,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });
    
    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmailNotification(submission);
    }
    
    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      submission 
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update submission status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, notes, assignedTo } = req.body;
    
    const submission = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: {
        status,
        notes,
        assignedTo
      }
    });
    
    res.json(submission);
  } catch (error) {
    console.error('Error updating contact submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Email notification function
async function sendEmailNotification(submission) {
  // Email sending logic remains the same
}

module.exports = router;