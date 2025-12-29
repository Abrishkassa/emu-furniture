// backend/routes/products.js - UPDATED VERSION
const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Update the GET /api/products route
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      featured, 
      popular, 
      inStock, 
      search,
      minPrice,
      maxPrice,
      limit, 
      skip 
    } = req.query;
    
    const where = {};
    
    // Search filter
    if (search) {
      where.OR = [
        { nameEn: { contains: search, mode: 'insensitive' } },
        { nameAm: { contains: search, mode: 'insensitive' } },
        { descriptionEn: { contains: search, mode: 'insensitive' } },
        { descriptionAm: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Category filter
    if (category && category !== 'all') {
      where.OR = [
        { categoryEn: { contains: category, mode: 'insensitive' } },
        { categoryAm: { contains: category, mode: 'insensitive' } }
      ];
    }
    
    // Featured filter
    if (featured === 'true') {
      where.isFeatured = true;
    }
    
    // Popular filter
    if (popular === 'true') {
      where.isPopular = true;
    }
    
    // In stock filter
    if (inStock === 'true') {
      where.inStock = true;
    }
    
    // Price range filter
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }
    
    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        nameEn: true,
        nameAm: true,
        descriptionEn: true,
        descriptionAm: true,
        price: true,
        currency: true,
        categoryEn: true,
        categoryAm: true,
        subCategory: true,
        images: true,
        length: true,
        width: true,
        height: true,
        unit: true,
        material: true,
        color: true,
        inStock: true,
        stockQuantity: true,
        isPopular: true,
        isFeatured: true,
        rating: true,
        numberOfReviews: true,
        estimatedDelivery: true,
        specifications: true,
        tags: true,
        createdAt: true,
        updatedAt: true
      },
      take: parseInt(limit) || 50,
      skip: parseInt(skip) || 0,
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`📦 Found ${products.length} products from database`);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Debug route
router.get('/debug', async (req, res) => {
  try {
    const count = await prisma.product.count();
    const allProducts = await prisma.product.findMany({
      select: {
        id: true,
        nameEn: true,
        nameAm: true,
        price: true,
        categoryEn: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      totalCount: count,
      productCount: allProducts.length,
      sampleProducts: allProducts.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Products API is working!',
    route: '/api/products',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;  // Make sure this is at the bottom