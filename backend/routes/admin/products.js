const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// GET /api/admin/products - Get all products
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', category = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    
    if (search) {
      where.OR = [
        { nameEn: { contains: search, mode: 'insensitive' } },
        { nameAm: { contains: search, mode: 'insensitive' } },
        { descriptionEn: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    if (category && category !== 'all') {
      where.categoryEn = category;
    }
    
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: parseInt(limit),
        skip,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.product.count({ where })
    ]);
    
    res.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(total / parseInt(limit))
        }
      }
    });
    
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});

// GET /api/admin/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      data: product
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/admin/products - Create new product
router.post('/', async (req, res) => {
  try {
    const {
      nameEn,
      nameAm,
      descriptionEn,
      descriptionAm,
      price,
      categoryEn,
      categoryAm,
      material,
      color,
      inStock = true,
      stockQuantity = 0,
      isPopular = false,
      isFeatured = false,
      estimatedDelivery = '1-2 weeks',
      tags = [],
      images = []
    } = req.body;
    
    if (!nameEn || !price || !categoryEn) {
      return res.status(400).json({
        success: false,
        error: 'Name, price, and category are required'
      });
    }
    
    const product = await prisma.product.create({
      data: {
        nameEn,
        nameAm: nameAm || nameEn,
        descriptionEn: descriptionEn || '',
        descriptionAm: descriptionAm || '',
        price: parseFloat(price),
        currency: 'ETB',
        categoryEn,
        categoryAm: categoryAm || categoryEn,
        material: material || '',
        color: color || '',
        inStock: Boolean(inStock),
        stockQuantity: parseInt(stockQuantity) || 0,
        isPopular: Boolean(isPopular),
        isFeatured: Boolean(isFeatured),
        estimatedDelivery,
        tags: Array.isArray(tags) ? tags : [],
        images: Array.isArray(images) ? images : []
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
    
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create product'
    });
  }
});

// PUT /api/admin/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body
    });
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/admin/products/bulk/delete - Bulk delete
router.post('/bulk/delete', async (req, res) => {
  try {
    const { ids } = req.body;
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No product IDs provided'
      });
    }
    
    await prisma.product.deleteMany({
      where: { id: { in: ids } }
    });
    
    res.json({
      success: true,
      message: `${ids.length} products deleted successfully`
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;