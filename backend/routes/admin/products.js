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
    console.log('Received product data:', req.body);
    
    const {
      nameEn,
      nameAm,
      descriptionEn,
      descriptionAm,
      price,
      currency = 'ETB',
      categoryEn,
      categoryAm,
      material,
      color,
      dimensions,
      inStock = true,
      stockQuantity = 0,
      isPopular = false,
      isFeatured = false,
      estimatedDelivery = '1-2 weeks',
      tags = [],
      images = []
    } = req.body;
    
    // Debug logging
    console.log('Parsed data:', {
      nameEn,
      price,
      categoryEn,
      material,
      color,
      dimensions,
      stockQuantity,
      tags,
      images
    });
    
    // Validation
    if (!nameEn || !nameEn.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Product name (English) is required'
      });
    }
    
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid price is required'
      });
    }
    
    if (!categoryEn || !categoryEn.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Category is required'
      });
    }
    
    // Create product
    const product = await prisma.product.create({
      data: {
        // Required fields
        nameEn: nameEn.trim(),
        price: parseFloat(price),
        currency: currency || 'ETB',
        categoryEn: categoryEn.trim(),
        categoryAm: (categoryAm || categoryEn || '').trim(),
        
        // Optional fields with defaults
        nameAm: (nameAm || nameEn || '').trim(),
        descriptionEn: (descriptionEn || '').trim(),
        descriptionAm: (descriptionAm || '').trim(),
        material: (material || '').trim(),
        color: (color || '').trim(),
        dimensions: (dimensions || '').trim(),
        inStock: Boolean(inStock),
        stockQuantity: parseInt(stockQuantity) || 0,
        isPopular: Boolean(isPopular),
        isFeatured: Boolean(isFeatured),
        estimatedDelivery: (estimatedDelivery || '1-2 weeks').trim(),
        
        // Arrays
        tags: Array.isArray(tags) ? tags : 
              (typeof tags === 'string' && tags.trim() ? [tags.trim()] : []),
        images: Array.isArray(images) ? images.filter(img => img && img.trim()) : 
                (typeof images === 'string' && images.trim() ? [images.trim()] : [])
      }
    });
    
    console.log('Product created successfully:', product.id);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
    
  } catch (error) {
    console.error('Create product error:', error);
    console.error('Error stack:', error.stack);
    
    // Handle Prisma unique constraint errors
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A product with similar details already exists'
      });
    }
    
    // Handle Prisma validation errors
    if (error.code === 'P2025') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data provided'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create product: ' + error.message
    });
  }
});

// PUT /api/admin/products/:id - Update product
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating product:', req.params.id, req.body);
    
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        // Update only provided fields
        ...(req.body.nameEn !== undefined && { nameEn: req.body.nameEn.trim() }),
        ...(req.body.nameAm !== undefined && { nameAm: req.body.nameAm.trim() }),
        ...(req.body.descriptionEn !== undefined && { descriptionEn: req.body.descriptionEn.trim() }),
        ...(req.body.descriptionAm !== undefined && { descriptionAm: req.body.descriptionAm.trim() }),
        ...(req.body.price !== undefined && { price: parseFloat(req.body.price) }),
        ...(req.body.currency !== undefined && { currency: req.body.currency }),
        ...(req.body.categoryEn !== undefined && { categoryEn: req.body.categoryEn.trim() }),
        ...(req.body.categoryAm !== undefined && { categoryAm: req.body.categoryAm.trim() }),
        ...(req.body.material !== undefined && { material: req.body.material.trim() }),
        ...(req.body.color !== undefined && { color: req.body.color.trim() }),
        ...(req.body.dimensions !== undefined && { dimensions: req.body.dimensions.trim() }),
        ...(req.body.inStock !== undefined && { inStock: Boolean(req.body.inStock) }),
        ...(req.body.stockQuantity !== undefined && { stockQuantity: parseInt(req.body.stockQuantity) || 0 }),
        ...(req.body.isPopular !== undefined && { isPopular: Boolean(req.body.isPopular) }),
        ...(req.body.isFeatured !== undefined && { isFeatured: Boolean(req.body.isFeatured) }),
        ...(req.body.estimatedDelivery !== undefined && { estimatedDelivery: req.body.estimatedDelivery.trim() }),
        ...(req.body.tags !== undefined && { 
          tags: Array.isArray(req.body.tags) ? req.body.tags : 
                (typeof req.body.tags === 'string' && req.body.tags.trim() ? [req.body.tags.trim()] : [])
        }),
        ...(req.body.images !== undefined && { 
          images: Array.isArray(req.body.images) ? req.body.images.filter(img => img && img.trim()) : 
                  (typeof req.body.images === 'string' && req.body.images.trim() ? [req.body.images.trim()] : [])
        })
      }
    });
    
    console.log('Product updated successfully:', product.id);
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
    
  } catch (error) {
    console.error('Update product error:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/admin/products/:id - Delete product
router.delete('/:id', async (req, res) => {
  try {
    console.log('Deleting product:', req.params.id);
    
    await prisma.product.delete({
      where: { id: req.params.id }
    });
    
    console.log('Product deleted successfully:', req.params.id);
    
    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete product error:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
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
    
    console.log('Bulk delete requested for IDs:', ids);
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No product IDs provided'
      });
    }
    
    const result = await prisma.product.deleteMany({
      where: { id: { in: ids } }
    });
    
    console.log('Bulk delete successful, deleted count:', result.count);
    
    res.json({
      success: true,
      message: `${result.count} products deleted successfully`
    });
    
  } catch (error) {
    console.error('Bulk delete error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/admin/products/stats - Get product statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const [
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      popularProducts,
      featuredProducts
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { inStock: true } }),
      prisma.product.count({ where: { inStock: false } }),
      prisma.product.count({ where: { isPopular: true } }),
      prisma.product.count({ where: { isFeatured: true } })
    ]);
    
    const priceStats = await prisma.product.aggregate({
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
      _sum: { price: true }
    });
    
    const categories = await prisma.product.groupBy({
      by: ['categoryEn'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } }
    });
    
    res.json({
      success: true,
      data: {
        counts: {
          total: totalProducts,
          inStock: inStockProducts,
          outOfStock: outOfStockProducts,
          popular: popularProducts,
          featured: featuredProducts
        },
        prices: {
          average: priceStats._avg.price || 0,
          min: priceStats._min.price || 0,
          max: priceStats._max.price || 0,
          totalValue: priceStats._sum.price || 0
        },
        categories
      }
    });
    
  } catch (error) {
    console.error('Get product stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product statistics'
    });
  }
});

module.exports = router;