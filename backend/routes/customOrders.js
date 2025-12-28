const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Submit custom order inquiry
router.post('/inquiry', async (req, res) => {
  try {
    const order = await prisma.customOrder.create({
      data: req.body
    });
    
    res.status(201).json({ 
      message: 'Custom order inquiry submitted successfully',
      order 
    });
  } catch (error) {
    console.error('Error submitting custom order:', error);
    res.status(400).json({ message: error.message });
  }
});

// Get all custom orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await prisma.customOrder.findMany({
      include: {
        communicationHistory: {
          orderBy: { date: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(orders);
  } catch (error) {
    console.error('Error fetching custom orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await prisma.customOrder.findUnique({
      where: { id: req.params.id },
      include: {
        communicationHistory: {
          orderBy: { date: 'desc' }
        }
      }
    });
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching custom order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const { status, assignedTo, quoteAmount, notes } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    if (quoteAmount) updateData.quoteAmount = quoteAmount;
    if (notes) updateData.notes = notes;
    
    if (notes) {
      updateData.communicationHistory = {
        create: {
          date: new Date(),
          type: 'INTERNAL',
          summary: 'Status updated',
          details: notes
        }
      };
    }
    
    const order = await prisma.customOrder.update({
      where: { id: req.params.id },
      data: updateData
    });
    
    res.json(order);
  } catch (error) {
    console.error('Error updating custom order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add communication to order
router.post('/:id/communication', async (req, res) => {
  try {
    const { type, summary, details } = req.body;
    
    const communication = await prisma.communicationHistory.create({
      data: {
        customOrderId: req.params.id,
        date: new Date(),
        type,
        summary,
        details
      }
    });
    
    res.json(communication);
  } catch (error) {
    console.error('Error adding communication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;