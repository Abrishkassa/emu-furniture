'use client';

import { useState, useEffect } from 'react';
import { Filter, Search, Grid, List, Star, Package, Clock } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import FilterSidebar from '@/components/shop/FilterSidebar';

// Sample product data - In reality, this will come from your backend
const initialProducts = [
  {
    id: 1,
    name_en: "Traditional Ethiopian Coffee Table",
    name_am: "ባህላዊ የወይን ዛፍ ማንጠልጠያ",
    description: "Handcrafted from solid wood with traditional Ethiopian carvings. Perfect for living rooms.",
    price: 8500,
    currency: "ETB",
    category: "Living Room",
    material: "Solid Wood",
    dimensions: "120cm x 60cm x 45cm",
    inStock: true,
    isPopular: true,
    isCustom: false,
    deliveryZones: ["Addis Ababa", "Bole", "Megenagna", "CMC"],
    images: ["/products/coffee-table.jpg"],
    estimatedWeeks: null
  },
  {
    id: 2,
    name_en: "Modern Sofa Set",
    name_am: "ዘመናዊ ሶፋ ስብስብ",
    description: "3-seater sofa with matching armchairs. Imported fabric with local craftsmanship.",
    price: 45000,
    currency: "ETB",
    category: "Living Room",
    material: "Fabric & Wood",
    dimensions: "220cm x 95cm x 85cm",
    inStock: false,
    isPopular: true,
    isCustom: true,
    deliveryZones: ["Addis Ababa Only"],
    images: ["/products/sofa-set.jpg"],
    estimatedWeeks: 6
  },
  {
    id: 3,
    name_en: "Wooden Dining Table Set",
    name_am: "የእንጨት የሳምንት ጠረጴዛ ስብስብ",
    description: "6-seater dining table with matching chairs. Made from local Ethiopian wood.",
    price: 32000,
    currency: "ETB",
    category: "Dining Room",
    material: "Mahogany",
    dimensions: "180cm x 90cm x 75cm",
    inStock: true,
    isPopular: false,
    isCustom: false,
    deliveryZones: ["Addis Ababa", "Bole", "CMC", "Megenagna", "Piassa"],
    images: ["/products/dining-set.jpg"],
    estimatedWeeks: null
  },
  {
    id: 4,
    name_en: "Executive Office Desk",
    name_am: "የአስፈፃሚ ቢሮ ጠረጴዛ",
    description: "Large executive desk with built-in storage. Perfect for home offices.",
    price: 18500,
    currency: "ETB",
    category: "Office",
    material: "Pine Wood & Metal",
    dimensions: "160cm x 80cm x 75cm",
    inStock: true,
    isPopular: true,
    isCustom: true,
    deliveryZones: ["Addis Ababa", "Bole"],
    images: ["/products/office-desk.jpg"],
    estimatedWeeks: 4
  },
  {
    id: 5,
    name_en: "King Size Bed Frame",
    name_am: "ንጉስ መጠን የአልጋ ፍሬም",
    description: "Solid wood bed frame with headboard. Available in different finishes.",
    price: 27500,
    currency: "ETB",
    category: "Bedroom",
    material: "Solid Wood",
    dimensions: "200cm x 180cm x 100cm",
    inStock: true,
    isPopular: false,
    isCustom: false,
    deliveryZones: ["Addis Ababa", "Bole", "Megenagna"],
    images: ["/products/bed-frame.jpg"],
    estimatedWeeks: null
  },
  {
    id: 6,
    name_en: "Outdoor Garden Bench",
    name_am: "የአትክልት አትክልት ባንች",
    description: "Weather-resistant bench for gardens and outdoor spaces.",
    price: 12500,
    currency: "ETB",
    category: "Outdoor",
    material: "Teak Wood",
    dimensions: "150cm x 60cm x 45cm",
    inStock: false,
    isPopular: true,
    isCustom: true,
    deliveryZones: ["Addis Ababa"],
    images: ["/products/garden-bench.jpg"],
    estimatedWeeks: 5
  },
  {
    id: 7,
    name_en: "Bookshelf with Display",
    name_am: "ከማሳያ ጋር የመጽሐፍት ሬክ",
    description: "Multi-purpose bookshelf with glass display cabinet.",
    price: 16500,
    currency: "ETB",
    category: "Living Room",
    material: "Plywood & Glass",
    dimensions: "180cm x 40cm x 200cm",
    inStock: true,
    isPopular: false,
    isCustom: false,
    deliveryZones: ["Addis Ababa", "CMC"],
    images: ["/products/bookshelf.jpg"],
    estimatedWeeks: null
  },
  {
    id: 8,
    name_en: "Traditional Ethiopian Stool",
    name_am: "ባህላዊ የኢትዮጵያ መቀመጫ",
    description: "Hand-carved traditional stool, perfect for coffee ceremonies.",
    price: 3500,
    currency: "ETB",
    category: "Living Room",
    material: "Wood & Leather",
    dimensions: "30cm x 30cm x 45cm",
    inStock: true,
    isPopular: true,
    isCustom: false,
    deliveryZones: ["All Addis Ababa"],
    images: ["/products/stool.jpg"],
    estimatedWeeks: null
  }
];

// Categories for filtering
const categories = [
  { id: 'all', name_en: 'All Products', name_am: 'ሁሉም ምርቶች' },
  { id: 'living-room', name_en: 'Living Room', name_am: 'የመቀመጫ ቤት' },
  { id: 'bedroom', name_en: 'Bedroom', name_am: 'የመኝታ ቤት' },
  { id: 'dining-room', name_en: 'Dining Room', name_am: 'ምግብ ቤት' },
  { id: 'office', name_en: 'Office', name_am: 'ቢሮ' },
  { id: 'outdoor', name_en: 'Outdoor', name_am: 'የቤት ውጫዊ' },
  { id: 'custom', name_en: 'Custom Orders', name_am: 'ብጁ ትዕዛዞች' }
];

// Materials for filtering
const materials = [
  'Solid Wood', 'Fabric', 'Leather', 'Metal', 'Glass', 'Rattan', 'Mahogany', 'Teak', 'Pine'
];

// Delivery zones
const deliveryZones = [
  'Addis Ababa', 'Bole', 'Megenagna', 'CMC', 'Piassa', 'Bambis', 'Ayat', 'All Areas'
];

export default function ShopPage() {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [customOnly, setCustomOnly] = useState(false);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name_am.includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
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
    searchQuery,
    selectedCategory,
    priceRange,
    selectedMaterials,
    selectedZones,
    inStockOnly,
    popularOnly,
    customOnly
  ]);

  // Calculate price stats
  const priceStats = {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price))
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
                className="px-4 py-2 bg-white text-amber-900 rounded-lg font-medium"
              >
                {language === 'en' ? 'አማርኛ' : 'English'}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
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
                    className="w-full md:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                        className={`p-2 ${viewMode === 'grid' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600'}`}
                      >
                        <Grid size={20} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-600'}`}
                      >
                        <List size={20} />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(true)}
                    className="md:hidden flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-lg"
                  >
                    <Filter size={20} />
                    <span>{language === 'en' ? 'Filters' : 'ማጣሪያዎች'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setPriceRange([0, 100000]);
                      setSelectedMaterials([]);
                      setSelectedZones([]);
                      setInStockOnly(false);
                      setPopularOnly(false);
                      setCustomOnly(false);
                      setSearchQuery('');
                    }}
                    className="text-amber-700 hover:text-amber-800 font-medium"
                  >
                    {language === 'en' ? 'Clear all' : 'ሁሉንም አጽዳ'}
                  </button>
                </div>
              </div>

              {/* Quick Filter Chips */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                    inStockOnly
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Package size={14} />
                  <span>{language === 'en' ? 'In Stock' : 'በክምችት'}</span>
                </button>
                <button
                  onClick={() => setPopularOnly(!popularOnly)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                    popularOnly
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Star size={14} />
                  <span>{language === 'en' ? 'Popular' : 'ታዋቂ'}</span>
                </button>
                <button
                  onClick={() => setCustomOnly(!customOnly)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                    customOnly
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                  }`}
                >
                  <Clock size={14} />
                  <span>{language === 'en' ? 'Custom Orders' : 'ብጁ ትዕዛዞች'}</span>
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
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
                    setPriceRange([0, 100000]);
                    setSelectedMaterials([]);
                    setSelectedZones([]);
                    setInStockOnly(false);
                    setPopularOnly(false);
                    setCustomOnly(false);
                    setSearchQuery('');
                  }}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
                >
                  {language === 'en' ? 'Reset all filters' : 'ሁሉንም ማጣሪያዎች ዳግም ጀምር'}
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode="grid"
                    language={language}
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
                  />
                ))}
              </div>
            )}

            {/* Pagination (for later) */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                    ← {language === 'en' ? 'Previous' : 'ቀዳሚ'}
                  </button>
                  <button className="px-4 py-2 bg-amber-600 text-white rounded-lg">1</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">3</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50">
                    {language === 'en' ? 'Next' : 'ቀጣይ'} →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ethiopian Furniture Info */}
      <div className="bg-white border-t border-gray-200 py-12">
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
    </div>
  );
}