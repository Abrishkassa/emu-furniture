'use client';

import { useState, useEffect } from 'react';

import { Filter, Search, Grid, List, Star, Package, Clock, Loader2 } from 'lucide-react';
import FilterSidebar from '@/components/shop/FilterSidebar';
import ProductCard from '@/components/shop/ProductCard';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';

<><ThemeToggle /><LanguageToggle /></>
// Categories for filtering - we'll get these from API or keep static
const categories = [
  { id: 'all', name_en: 'All Products', name_am: 'ሁሉም ምርቶች' },
  { id: 'living-room', name_en: 'Living Room', name_am: 'የመቀመጫ ቤት' },
  { id: 'bedroom', name_en: 'Bedroom', name_am: 'የመኝታ ቤት' },
  { id: 'dining-room', name_en: 'Dining Room', name_am: 'ምግብ ቤት' },
  { id: 'office', name_en: 'Office', name_am: 'ቢሮ' },
  { id: 'outdoor', name_en: 'Outdoor', name_am: 'የቤት ውጫዊ' },
  { id: 'custom', name_en: 'Custom Orders', name_am: 'ብጁ ትዕዛዞች' }
];

// Materials for filtering - we'll get these from products or keep static
const materials = [
  'Solid Wood', 'Fabric', 'Leather', 'Metal', 'Glass', 'Rattan', 'Mahogany', 'Teak', 'Pine'
];

// Delivery zones - keep static for now
const deliveryZones = [
  'Hawassa', 'Atote', 'Piassa', 'Mobil', 'Menaharya', 'Adis Ketema', 'Hayik dar', 'All Areas'
];

// Mock products data (10 products covering all categories and materials)
const MOCK_PRODUCTS: ApiProduct[] = [
  {
    id: 'mock-1',
    nameEn: 'Traditional Ethiopian Sofa',
    nameAm: 'የኢትዮጵያ ባህላዊ ሶፋ',
    descriptionEn: 'Handcrafted traditional Ethiopian sofa with intricate wood carvings and comfortable cushions. Made from solid mahogany wood.',
    descriptionAm: 'በእጅ የተሰራ የኢትዮጵያ ባህላዊ ሶፋ ከወፍራም የእንጨት ቅርጸት እና አመቺ አልጋዎች ጋር። ከጠንካራ የማሆጋኒ እንጨት የተሰራ።',
    price: 24500,
    currency: 'ETB',
    categoryEn: 'Living Room',
    categoryAm: 'የመቀመጫ ቤት',
    images: ['/uploads/products/sofa-1.jpg', '/uploads/products/sofa-2.jpg'],
    length: 220,
    width: 90,
    height: 85,
    unit: 'cm',
    material: 'Mahogany Wood',
    color: 'Brown',
    inStock: true,
    stockQuantity: 5,
    isPopular: true,
    isFeatured: true,
    rating: 4.8,
    numberOfReviews: 42,
    estimatedDelivery: '3-4 weeks',
    tags: ['traditional', 'handcrafted', 'living-room', 'addis-ababa'],
    createdAt: '2024-01-15',
    updatedAt: '2024-02-20'
  },
  {
    id: 'mock-2',
    nameEn: 'Modern Office Desk',
    nameAm: 'ዘመናዊ የቢሮ ጠረጴዛ',
    descriptionEn: 'Minimalist office desk with metal legs and solid wood top. Perfect for home office setup.',
    descriptionAm: 'ሚኒማሊስት የቢሮ ጠረጴዛ ከብረት እግሮች እና ጠንካራ የእንጨት አናት ጋር። ለቤት ቢሮ ማዋቀር ፍጹም።',
    price: 12500,
    currency: 'ETB',
    categoryEn: 'Office',
    categoryAm: 'ቢሮ',
    images: ['/uploads/products/desk-1.jpg'],
    length: 160,
    width: 80,
    height: 75,
    unit: 'cm',
    material: 'Metal and Pine Wood',
    color: 'Black',
    inStock: true,
    stockQuantity: 8,
    isPopular: true,
    isFeatured: false,
    rating: 4.5,
    numberOfReviews: 28,
    estimatedDelivery: '2 weeks',
    tags: ['modern', 'office', 'desk', 'addis-ababa'],
    createdAt: '2024-02-10',
    updatedAt: '2024-03-01'
  },
  {
    id: 'mock-3',
    nameEn: 'King Size Bed Frame',
    nameAm: 'ንጉስ መጠን ያለው የአልጋ ሣጥን',
    descriptionEn: 'Solid teak wood bed frame with headboard storage. Ethiopian craftsmanship at its finest.',
    descriptionAm: 'ከማዕከለኛ መያዣ ጋር ጠንካራ የቲክ እንጨት የአልጋ ሣጥን። የኢትዮጵያ ብልጽግና በጣም ጥሩው ደረጃ።',
    price: 38500,
    currency: 'ETB',
    categoryEn: 'Bedroom',
    categoryAm: 'የመኝታ ቤት',
    images: ['/uploads/products/bed-1.jpg', '/uploads/products/bed-2.jpg'],
    length: 210,
    width: 180,
    height: 110,
    unit: 'cm',
    material: 'Teak Wood',
    color: 'Natural',
    inStock: false,
    stockQuantity: 0,
    isPopular: false,
    isFeatured: true,
    rating: 4.9,
    numberOfReviews: 35,
    estimatedDelivery: '5-6 weeks',
    tags: ['bedroom', 'teak', 'custom'],
    createdAt: '2024-01-20',
    updatedAt: '2024-03-05'
  },
  {
    id: 'mock-4',
    nameEn: 'Dining Table Set',
    nameAm: 'የምግብ ቤት ጠረጴዛ ስብስብ',
    descriptionEn: '6-seater dining table with matching chairs. Made from sustainable pine wood.',
    descriptionAm: '6 ሰው የሚገኝበት የምግብ ቤት ጠረጴዛ ከሚመሳሰሉ ወንበሮች ጋር። ከቀጣይነት ያለው ፓይን እንጨት የተሰራ።',
    price: 32000,
    currency: 'ETB',
    categoryEn: 'Dining Room',
    categoryAm: 'ምግብ ቤት',
    images: ['/uploads/products/dining-1.jpg'],
    length: 180,
    width: 100,
    height: 75,
    unit: 'cm',
    material: 'Pine Wood',
    color: 'Walnut',
    inStock: true,
    stockQuantity: 3,
    isPopular: true,
    isFeatured: true,
    rating: 4.7,
    numberOfReviews: 51,
    estimatedDelivery: '4 weeks',
    tags: ['dining', 'sustainable', 'addis-ababa'],
    createdAt: '2024-02-05',
    updatedAt: '2024-02-25'
  },
  {
    id: 'mock-5',
    nameEn: 'Outdoor Garden Chair',
    nameAm: 'የበግ ቆፍ የአትክልት ወንበር',
    descriptionEn: 'Weather-resistant rattan garden chair. Perfect for patio or balcony.',
    descriptionAm: 'በአየር ሁኔታ የማይጎዳ የራታን የአትክልት ወንበር። ለፓቲዮ ወይም ለባልኮኒ ፍጹም።',
    price: 6500,
    currency: 'ETB',
    categoryEn: 'Outdoor',
    categoryAm: 'የቤት ውጫዊ',
    images: ['/uploads/products/outdoor-1.jpg'],
    length: 70,
    width: 70,
    height: 85,
    unit: 'cm',
    material: 'Rattan',
    color: 'Beige',
    inStock: true,
    stockQuantity: 12,
    isPopular: false,
    isFeatured: false,
    rating: 4.3,
    numberOfReviews: 19,
    estimatedDelivery: '1 week',
    tags: ['outdoor', 'garden', 'rattan'],
    createdAt: '2024-03-01',
    updatedAt: '2024-03-10'
  },
  {
    id: 'mock-6',
    nameEn: 'Leather Recliner Chair',
    nameAm: 'ቆዳ ሪክላይነር ወንበር',
    descriptionEn: 'Premium leather recliner chair with massage function. Ultimate comfort experience.',
    descriptionAm: 'ፕሪሚየም ቆዳ ሪክላይነር ወንበር ከማሰስ ተግባር ጋር። የመጨረሻ አመቺነት ተሞክሮ።',
    price: 28500,
    currency: 'ETB',
    categoryEn: 'Living Room',
    categoryAm: 'የመቀመጫ ቤት',
    images: ['/uploads/products/recliner-1.jpg'],
    length: 95,
    width: 95,
    height: 105,
    unit: 'cm',
    material: 'Leather',
    color: 'Black',
    inStock: true,
    stockQuantity: 4,
    isPopular: true,
    isFeatured: true,
    rating: 4.9,
    numberOfReviews: 63,
    estimatedDelivery: '3 weeks',
    tags: ['leather', 'recliner', 'luxury', 'addis-ababa'],
    createdAt: '2024-01-25',
    updatedAt: '2024-02-28'
  },
  {
    id: 'mock-7',
    nameEn: 'Glass Coffee Table',
    nameAm: 'መስታወት የቡና ጠረጴዛ',
    descriptionEn: 'Modern glass coffee table with metal frame. Elegant and durable design.',
    descriptionAm: 'ዘመናዊ መስታወት የቡና ጠረጴዛ ከብረት ፍሬም ጋር። የተራቀቀ እና ዘላቂ ዲዛይን።',
    price: 8500,
    currency: 'ETB',
    categoryEn: 'Living Room',
    categoryAm: 'የመቀመጫ ቤት',
    images: ['/uploads/products/coffee-table-1.jpg'],
    length: 120,
    width: 60,
    height: 45,
    unit: 'cm',
    material: 'Glass and Metal',
    color: 'Silver',
    inStock: true,
    stockQuantity: 7,
    isPopular: false,
    isFeatured: false,
    rating: 4.2,
    numberOfReviews: 24,
    estimatedDelivery: '2 weeks',
    tags: ['glass', 'modern', 'living-room'],
    createdAt: '2024-02-15',
    updatedAt: '2024-03-05'
  },
  {
    id: 'mock-8',
    nameEn: 'Custom Wardrobe',
    nameAm: 'ብጁ የልብስ መደርደሪያ',
    descriptionEn: 'Custom-built wardrobe with built-in lighting and mirror. Made to your exact specifications.',
    descriptionAm: 'ብጁ የሚሰራ የልብስ መደርደሪያ ከበተሰራ መብራት እና መስታወት ጋር። በትክክለኛዎ ልኬቶች የተሰራ።',
    price: 55000,
    currency: 'ETB',
    categoryEn: 'Custom Orders',
    categoryAm: 'ብጁ ትዕዛዞች',
    images: ['/uploads/products/wardrobe-1.jpg'],
    length: 240,
    width: 60,
    height: 220,
    unit: 'cm',
    material: 'Solid Wood and Glass',
    color: 'White',
    inStock: true,
    stockQuantity: 1,
    isPopular: false,
    isFeatured: true,
    rating: 5.0,
    numberOfReviews: 8,
    estimatedDelivery: '6-8 weeks',
    tags: ['custom', 'wardrobe', 'built-in', 'made-to-order'],
    createdAt: '2024-02-28',
    updatedAt: '2024-03-12'
  },
  {
    id: 'mock-9',
    nameEn: 'Fabric Sectional Sofa',
    nameAm: 'ጨርቅ ሴክሽናል ሶፋ',
    descriptionEn: 'L-shaped sectional sofa with removable fabric covers. Spacious and comfortable.',
    descriptionAm: 'ኤል-ቅርጽ ያለው ሴክሽናል ሶፋ ከሚወገዱ የጨርቅ ኮቦርቶች ጋር። ሰፊ እና አመቺ።',
    price: 42500,
    currency: 'ETB',
    categoryEn: 'Living Room',
    categoryAm: 'የመቀመጫ ቤት',
    images: ['/uploads/products/sectional-1.jpg'],
    length: 280,
    width: 180,
    height: 85,
    unit: 'cm',
    material: 'Fabric',
    color: 'Grey',
    inStock: true,
    stockQuantity: 2,
    isPopular: true,
    isFeatured: true,
    rating: 4.6,
    numberOfReviews: 37,
    estimatedDelivery: '4 weeks',
    tags: ['fabric', 'sectional', 'living-room', 'addis-ababa'],
    createdAt: '2024-01-30',
    updatedAt: '2024-02-25'
  },
  {
    id: 'mock-10',
    nameEn: 'Bookshelf with Drawers',
    nameAm: 'ከመያዣዎች ጋር የመጻሕፍት መደርደሪያ',
    descriptionEn: 'Multi-purpose bookshelf with built-in drawers. Perfect for office or living room.',
    descriptionAm: 'ከበተሰሩ መያዣዎች ጋር ብዙ ዓላማ ያለው የመጻሕፍት መደርደሪያ። ለቢሮ ወይም ለመቀመጫ ቤት ፍጹም።',
    price: 14500,
    currency: 'ETB',
    categoryEn: 'Office',
    categoryAm: 'ቢሮ',
    images: ['/uploads/products/bookshelf-1.jpg'],
    length: 120,
    width: 40,
    height: 180,
    unit: 'cm',
    material: 'Solid Wood',
    color: 'Oak',
    inStock: true,
    stockQuantity: 6,
    isPopular: false,
    isFeatured: false,
    rating: 4.4,
    numberOfReviews: 21,
    estimatedDelivery: '3 weeks',
    tags: ['office', 'storage', 'wood', 'addis-ababa'],
    createdAt: '2024-02-20',
    updatedAt: '2024-03-08'
  }
];

// Type for API product
type ApiProduct = {
  id: string;
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
  price: number;
  currency: string;
  categoryEn: string;
  categoryAm: string;
  subCategory?: string;
  images: string[];
  length?: number;
  width?: number;
  height?: number;
  unit: string;
  material?: string;
  color?: string;
  inStock: boolean;
  stockQuantity: number;
  isPopular: boolean;
  isFeatured: boolean;
  rating: number;
  numberOfReviews: number;
  estimatedDelivery?: string;
  specifications?: any;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

// Type for transformed product (matching your frontend)
type TransformedProduct = {
  id: string;
  name_en: string;
  name_am: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  material: string;
  dimensions: string;
  inStock: boolean;
  isPopular: boolean;
  isCustom: boolean; // We'll determine this based on tags or other criteria
  deliveryZones: string[];
  images: string[];
  estimatedWeeks: number | null;
  imageUrls: string[]; // Add this field for proper image URLs
};

export default function ShopPage() {
  const [products, setProducts] = useState<TransformedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<TransformedProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [customOnly, setCustomOnly] = useState(false);

  // Safe includes helper function
  const safeIncludes = (str: string | undefined, searchString: string): boolean => {
    return str?.toLowerCase().includes(searchString.toLowerCase()) || false;
  };

  // Helper function to extract delivery zones - FIXED VERSION
  const getDeliveryZonesFromProduct = (product: ApiProduct): string[] => {
    // Check if product.tags exists and is an array before using includes
    const tags = Array.isArray(product.tags) ? product.tags : [];
    
    // If you have delivery zones in your product model, use that
    // For now, we'll use a default based on tags or other criteria
    if (tags.includes('addis-ababa')) {
      return ['Addis Ababa', 'Bole', 'Megenagna', 'CMC'];
    }
    return ['Addis Ababa']; // Default
  };

  // Helper function to extract estimated weeks
  const extractEstimatedWeeks = (estimatedDelivery?: string): number | null => {
    if (!estimatedDelivery) return null;
    
    // Try to extract weeks from string like "3-4 weeks" or "5 weeks"
    const weekMatch = estimatedDelivery.match(/(\d+)\s*(week|ሳምንት)/i);
    if (weekMatch) {
      return parseInt(weekMatch[1]);
    }
    
    return null;
  };

  // Helper function to construct proper image URLs
  const constructImageUrls = (imagePaths: string[]): string[] => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    return imagePaths.map(imagePath => {
      // If it's already a full URL (starts with http), return as is
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      
      // If it starts with /uploads, construct full URL
      if (imagePath.startsWith('/uploads/')) {
        return `${apiUrl}${imagePath}`;
      }
      
      // If it's just a filename, assume it's in the uploads/products folder
      if (!imagePath.startsWith('/') && !imagePath.includes('http')) {
        return `${apiUrl}/uploads/products/${imagePath}`;
      }
      
      // For any other case, try to construct the URL
      return `${apiUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
    });
  };

  // Transform API products to frontend format
  const transformProducts = (apiProducts: ApiProduct[], sourceLanguage: 'en' | 'am'): TransformedProduct[] => {
    return apiProducts.map(product => {
      // Safe defaults for all potentially undefined values
      const safeTags = Array.isArray(product.tags) ? product.tags : [];
      const safeImages = Array.isArray(product.images) ? product.images : [];
      const safeMaterial = product.material || 'Unknown';
      const safeUnit = product.unit || 'cm';
      
      // Construct proper image URLs
      const imageUrls = constructImageUrls(safeImages);
      
      // FIX: Use safeIncludes for custom check
      const isCustom = safeTags.includes('custom') || 
                       safeIncludes(product.categoryEn, 'custom') || 
                       safeIncludes(product.categoryAm, 'custom') ||
                       safeTags.some(tag => safeIncludes(tag, 'custom'));
      
      return {
        id: product.id || `unknown-${Math.random().toString(36).substr(2, 9)}`,
        name_en: product.nameEn || 'Unnamed Product',
        name_am: product.nameAm || 'ያልተሰየመ ምርት',
        description: sourceLanguage === 'en' ? product.descriptionEn || '' : product.descriptionAm || '',
        price: Number(product.price) || 0,
        currency: product.currency || 'ETB',
        category: sourceLanguage === 'en' ? product.categoryEn || 'Uncategorized' : product.categoryAm || 'ያልተደራጀ',
        material: safeMaterial,
        dimensions: product.length && product.width && product.height 
          ? `${product.length}${safeUnit} x ${product.width}${safeUnit} x ${product.height}${safeUnit}`
          : sourceLanguage === 'en' ? 'Dimensions not specified' : 'ልኬቶች አልተገለጹም',
        inStock: Boolean(product.inStock),
        isPopular: Boolean(product.isPopular),
        isCustom: Boolean(isCustom),
        deliveryZones: getDeliveryZonesFromProduct(product),
        images: imageUrls.length > 0 ? imageUrls : ['/products/default.jpg'],
        imageUrls: imageUrls, // Store both for backward compatibility
        estimatedWeeks: extractEstimatedWeeks(product.estimatedDelivery)
      };
    });
  };

  // Reset filters when products change
  useEffect(() => {
    if (products.length === 0 && !isLoading) {
      // Reset all filters when no products
      setSelectedCategory('all');
      setPriceRange([0, 100000]);
      setSelectedMaterials([]);
      setSelectedZones([]);
      setInStockOnly(false);
      setPopularOnly(false);
      setCustomOnly(false);
      setSearchQuery('');
    }
  }, [products, isLoading]);

  // Initialize with mock data immediately
  useEffect(() => {
    // Set mock products immediately
    const mockTransformedProducts = transformProducts(MOCK_PRODUCTS, language);
    setProducts(mockTransformedProducts);
    setFilteredProducts(mockTransformedProducts);
    setIsUsingMockData(true);
    
    // Update price range based on mock data
    if (mockTransformedProducts.length > 0) {
      const prices = mockTransformedProducts.map(p => p.price).filter(price => !isNaN(price));
      if (prices.length > 0) {
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        setPriceRange([minPrice, maxPrice]);
      }
    }
    
    // Then try to fetch from API
    fetchProducts();
  }, [language]);

  // Fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${apiUrl}/api/products`, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Validate that we received an array
      if (!Array.isArray(data)) {
        console.warn('Expected array from API but received:', typeof data);
        // Keep using mock data if API response is invalid
        setIsLoading(false);
        return;
      }
      
      const apiProducts: ApiProduct[] = data;
      
      console.log(`Fetched ${apiProducts.length} products from API`);
      
      // Transform API products
      const transformedProducts = transformProducts(apiProducts, language);
      
      // Replace mock data with real data
      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
      setIsUsingMockData(false);
      
      // Update price range based on real data
      if (transformedProducts.length > 0) {
        const prices = transformedProducts.map(p => p.price).filter(price => !isNaN(price));
        if (prices.length > 0) {
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          setPriceRange([minPrice, maxPrice]);
        }
      }
      
    } catch (error: any) {
      console.error('Error fetching products from API:', error);
      
      // If we're already using mock data, don't show error
      if (!isUsingMockData) {
        // More specific error messages
        if (error.name === 'AbortError') {
          setError('Request timeout. Server is taking too long to respond.');
        } else if (error.message.includes('Failed to fetch')) {
          setError('Cannot connect to server. Showing demo products instead.');
        } else if (error.message.includes('404')) {
          setError('Products API endpoint not found. Showing demo products.');
        } else if (error.message.includes('500')) {
          setError('Server error. Showing demo products.');
        } else {
          setError('Failed to load products from server. Showing demo products.');
        }
      }
      
      // Already have mock data loaded, so just continue with that
    } finally {
      setIsLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    if (isLoading || products.length === 0) return;
    
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product =>
        product.name_en.toLowerCase().includes(query) ||
        product.name_am.includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => {
        const categoryMatch = product.category.toLowerCase().replace(/\s+/g, '-');
        return categoryMatch === selectedCategory;
      });
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Material filter
    if (selectedMaterials.length > 0) {
      filtered = filtered.filter(product =>
        selectedMaterials.some(material =>
          product.material.toLowerCase().includes(material.toLowerCase())
        )
      );
    }

    // Delivery zone filter
    if (selectedZones.length > 0) {
      filtered = filtered.filter(product =>
        selectedZones.some(zone =>
          product.deliveryZones.some(deliveryZone =>
            deliveryZone.toLowerCase().includes(zone.toLowerCase())
          )
        )
      );
    }

    // In stock filter
    if (inStockOnly) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Popular filter
    if (popularOnly) {
      filtered = filtered.filter(product => product.isPopular);
    }

    // Custom filter
    if (customOnly) {
      filtered = filtered.filter(product => product.isCustom);
    }

    setFilteredProducts(filtered);
  }, [
    products,
    searchQuery,
    selectedCategory,
    priceRange,
    selectedMaterials,
    selectedZones,
    inStockOnly,
    popularOnly,
    customOnly,
    isLoading
  ]);

  // Calculate price stats
  const priceStats = {
    min: products.length > 0 ? Math.min(...products.map(p => p.price)) : 0,
    max: products.length > 0 ? Math.max(...products.map(p => p.price)) : 100000
  };

  // Handle retry
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Shop Header */}
      <div className="bg-amber-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {language === 'en' ? 'Our Furniture Collection' : 'የእኛ የቤት እቃ ስብስብ'}
              </h1>
              <p className="text-amber-200">
                {language === 'en' 
                  ? 'Handcrafted Ethiopian furniture for every room' 
                  : 'ለእያንዳንዱ ክፍል በኢትዮጵያ ብልጽግና የተሰሩ የቤት እቃዎች'}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => setLanguage(lang => lang === 'en' ? 'am' : 'en')}
                className="px-4 py-2 bg-white text-amber-900 rounded-lg font-medium hover:bg-amber-50 transition-colors"
              >
                {language === 'en' ? 'አማርኛ' : 'English'}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          {!isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-amber-800/50 p-4 rounded-lg">
                <p className="text-amber-200 text-sm">
                  {language === 'en' ? 'Products' : 'ምርቶች'}
                </p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <div className="bg-amber-800/50 p-4 rounded-lg">
                <p className="text-amber-200 text-sm">
                  {language === 'en' ? 'Categories' : 'ምድቦች'}
                </p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <div className="bg-amber-800/50 p-4 rounded-lg">
                <p className="text-amber-200 text-sm">
                  {language === 'en' ? 'In Stock' : 'በክምችት'}
                </p>
                <p className="text-2xl font-bold">
                  {products.filter(p => p.inStock).length}
                </p>
              </div>
              <div className="bg-amber-800/50 p-4 rounded-lg">
                <p className="text-amber-200 text-sm">
                  {language === 'en' ? 'Custom Orders' : 'ብጁ ትዕዛዞች'}
                </p>
                <p className="text-2xl font-bold">
                  {products.filter(p => p.isCustom).length}
                </p>
              </div>
              <div className="bg-amber-800/50 p-4 rounded-lg">
                <p className="text-amber-200 text-sm flex items-center">
                  {isUsingMockData ? (
                    <>
                      <span className="mr-2">📱</span>
                      {language === 'en' ? 'Demo Mode' : 'ደሞ ሞድ'}
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🟢</span>
                      {language === 'en' ? 'Live Data' : 'ቀጥታ ዳታ'}
                    </>
                  )}
                </p>
                <p className="text-lg">
                  {isUsingMockData 
                    ? (language === 'en' ? '10 Demo Products' : '10 ደሞ ምርቶች')
                    : (language === 'en' ? 'Live API' : 'ቀጥታ ኤፒአይ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600">
                {language === 'en' ? 'Loading products...' : 'ምርቶች በመጫን ላይ...'}
              </p>
              {isUsingMockData && (
                <p className="text-amber-600 text-sm mt-2">
                  {language === 'en' ? 'Showing demo products while loading...' : 'በመጫን ላይ ደሞ ምርቶችን እያሳየ ነው...'}
                </p>
              )}
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-xl shadow p-8 mb-6">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  {language === 'en' ? 'Using Demo Products' : 'ደሞ ምርቶችን እየተጠቀሙ ነው'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {error} {language === 'en' 
                    ? 'You can still browse and filter the demo furniture collection.' 
                    : 'አሁንም ደሞ የቤት እቃ ስብስብን መመልከት እና ማጣራት ይችላሉ።'}
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={handleRetry}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    {language === 'en' ? 'Retry Connection' : 'አገናኝ እንደገና ይሞክሩ'}
                  </button>
                  <button
                    onClick={() => setError(null)}
                    className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {language === 'en' ? 'Continue with Demo' : 'ከደሞ ጋር ቀጥል'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {(!isLoading || isUsingMockData) && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              categories={categories}
              materials={materials}
              deliveryZones={deliveryZones}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              priceStats={priceStats}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedMaterials={selectedMaterials}
              onMaterialChange={setSelectedMaterials}
              selectedZones={selectedZones}
              onZoneChange={setSelectedZones}
              inStockOnly={inStockOnly}
              onInStockChange={setInStockOnly}
              popularOnly={popularOnly}
              onPopularChange={setPopularOnly}
              customOnly={customOnly}
              onCustomChange={setCustomOnly}
              language={language}
            />

            {/* Products Section */}
            <div className="flex-1">
              {/* Search and Controls */}
              <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={language === 'en' ? 'Search furniture...' : 'የቤት እቃ ይፈልጉ...'}
                      className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                      <span className="text-gray-600">
                        {filteredProducts.length} {language === 'en' ? 'items' : 'ንጥሎች'}
                      </span>
                      <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                        >
                          <Grid size={20} />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                        >
                          <List size={20} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="md:hidden flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      <Filter size={20} />
                      <span>{language === 'en' ? 'Filters' : 'ማጣሪያዎች'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setPriceRange([priceStats.min, priceStats.max]);
                        setSelectedMaterials([]);
                        setSelectedZones([]);
                        setInStockOnly(false);
                        setPopularOnly(false);
                        setCustomOnly(false);
                        setSearchQuery('');
                      }}
                      className="text-amber-700 hover:text-amber-800 font-medium transition-colors"
                    >
                      {language === 'en' ? 'Clear all' : 'ሁሉንም አጽዳ'}
                    </button>
                  </div>
                </div>

                {/* Quick Filter Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <button
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      inStockOnly
                        ? 'bg-green-100 text-green-800 border border-green-300 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Package size={14} />
                    <span>{language === 'en' ? 'In Stock' : 'በክምችት'}</span>
                  </button>
                  <button
                    onClick={() => setPopularOnly(!popularOnly)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      popularOnly
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Star size={14} />
                    <span>{language === 'en' ? 'Popular' : 'ታዋቂ'}</span>
                  </button>
                  <button
                    onClick={() => setCustomOnly(!customOnly)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
                      customOnly
                        ? 'bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    <Clock size={14} />
                    <span>{language === 'en' ? 'Custom Orders' : 'ብጁ ትዕዛዞች'}</span>
                  </button>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length === 0 && products.length > 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {language === 'en' ? 'No products found' : 'ምንም ምርት አልተገኘም'}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {language === 'en'
                      ? 'Try adjusting your filters or search term'
                      : 'ማጣሪያዎችዎን ወይም የፍለጋ ቃልዎን ይለውጡ'}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange([priceStats.min, priceStats.max]);
                      setSelectedMaterials([]);
                      setSelectedZones([]);
                      setInStockOnly(false);
                      setPopularOnly(false);
                      setCustomOnly(false);
                      setSearchQuery('');
                    }}
                    className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    {language === 'en' ? 'Reset all filters' : 'ሁሉንም ማጣሪያዎች ዳግም ጀምር'}
                  </button>
                </div>
              ) : filteredProducts.length === 0 && products.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-12 text-center">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    {language === 'en' ? 'No products available' : 'ምንም ምርት አልተገኘም'}
                  </h3>
                  <p className="text-gray-500">
                    {language === 'en'
                      ? 'Check back later for new arrivals'
                      : 'ለአዳዲስ ምርቶች ቆይተው ይመልከቱ'}
                  </p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode="grid"
                      language={language}
                      isMock={isUsingMockData}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      viewMode="list"
                      language={language}
                      isMock={isUsingMockData}
                    />
                  ))}
                </div>
              )}

              {/* Demo Mode Indicator */}
              {isUsingMockData && filteredProducts.length > 0 && (
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <span className="text-blue-600">📱</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-800">
                        {language === 'en' ? 'Demo Mode Active' : 'ደሞ ሞድ አገልግሎት ላይ ነው'}
                      </h4>
                      <p className="text-blue-600 text-sm">
                        {language === 'en' 
                          ? 'You are viewing demo furniture products. Connect to a live server to see real products.' 
                          : 'ደሞ የቤት እቃ ምርቶችን እየመለከቱ ነው። እውነተኛ ምርቶችን ለማየት ቀጥታ ሰርቨር ይገናኙ።'}
                      </p>
                    </div>
                    <button
                      onClick={handleRetry}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      {language === 'en' ? 'Connect to Server' : 'ለሰርቨር ይገናኙ'}
                    </button>
                  </div>
                </div>
              )}

              {/* Pagination (for later) */}
              {filteredProducts.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      ← {language === 'en' ? 'Previous' : 'ቀዳሚ'}
                    </button>
                    <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">1</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">2</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">3</button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      {language === 'en' ? 'Next' : 'ቀጣይ'} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ethiopian Furniture Info */}
        {!isLoading && products.length > 0 && (
          <div className="bg-white border-t border-gray-200 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-center mb-8">
                {language === 'en' 
                  ? 'Why Choose Ethiopian Handcrafted Furniture?' 
                  : 'ለምን የኢትዮጵያ እጅ ሥራ የቤት እቃ መምረጥ ይገባል?'}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {language === 'en' ? 'Unique Craftsmanship' : 'ብቸኛ ብልጽግና'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'Each piece tells a story of Ethiopian heritage and skill'
                      : 'እያንዳንዱ ክፍል የኢትዮጵያ ቅርስ እና ክህሎት ታሪክ ይናገራል'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {language === 'en' ? 'Local Materials' : 'የአገር ውስጥ ዕቃዎች'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'Sustainably sourced Ethiopian wood and materials'
                      : 'በቀጣይነት ከሚገኙ የኢትዮጵያ እንጨት እና ዕቃዎች'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">
                    {language === 'en' ? 'Custom Designs' : 'ብጁ ዲዛይኖች'}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'en'
                      ? 'Tailored to your space, preferences, and budget'
                      : 'ለቦታዎ፣ ምርጫዎችዎ እና በጀትዎ የተስተካከሉ'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
    
  );
}