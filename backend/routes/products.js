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
      take: parseInt(limit) || 50, // Increased limit for better UX
      skip: parseInt(skip) || 0,
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});