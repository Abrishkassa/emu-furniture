const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

router.use(requireAuth);

// GET /api/admin/dashboard/stats - Dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const [
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      totalUsers,
      totalAdmins,
      totalStaff,
      popularProducts,
      featuredProducts
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { inStock: true } }),
      prisma.product.count({ where: { inStock: false } }),
      prisma.user.count(),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.user.count({ where: { role: 'STAFF' } }),
      prisma.product.count({ where: { isPopular: true } }),
      prisma.product.count({ where: { isFeatured: true } })
    ]);
    
    const priceStats = await prisma.product.aggregate({
      _avg: { price: true },
      _min: { price: true },
      _max: { price: true },
      _sum: { price: true }
    });
    
    const recentProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        nameEn: true,
        price: true,
        categoryEn: true,
        inStock: true,
        createdAt: true
      }
    });
    
    const categories = await prisma.product.groupBy({
      by: ['categoryEn'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } }
    });
    
    const recentUsers = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });
    
    res.json({
      success: true,
      data: {
        counts: {
          products: {
            total: totalProducts,
            inStock: inStockProducts,
            outOfStock: outOfStockProducts,
            popular: popularProducts,
            featured: featuredProducts
          },
          users: {
            total: totalUsers,
            admins: totalAdmins,
            staff: totalStaff,
            customers: totalUsers - totalAdmins - totalStaff
          }
        },
        prices: {
          average: priceStats._avg.price || 0,
          min: priceStats._min.price || 0,
          max: priceStats._max.price || 0,
          totalValue: priceStats._sum.price || 0
        },
        recent: {
          products: recentProducts,
          users: recentUsers
        },
        categories
      }
    });
    
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
});

module.exports = router;