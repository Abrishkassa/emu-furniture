'use client';

import { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Clock, 
  MapPin,
  Check,
  ShoppingCart,
  Image as ImageIcon
} from 'lucide-react';

// Define types at the top
type ProductType = {
  id: string | number;
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
  isCustom: boolean;
  deliveryZones: string[];
  images: string[];
  estimatedWeeks: number | null;
  imageUrls?: string[]; // Added for backward compatibility
};

type ProductCardProps = {
  product: ProductType;
  viewMode: 'grid' | 'list';
  language: 'en' | 'am';
  isMock?: boolean;
};

export default function ProductCard({ product, viewMode, language }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: product.currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleReserve = () => {
    const whatsappNumber = '+251911234567';
    const message = encodeURIComponent(
      `Hello! I'm interested in reserving: ${product.name_en}\nPrice: ${formatPrice(product.price)}\n\nCan you help me with this?`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name_en,
          text: `Check out ${product.name_en} from Emu Furniture!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Get image URLs - use imageUrls if available, otherwise use images
  const getImageUrls = () => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls;
    }
    return product.images || [];
  };

  const imageUrls = getImageUrls();
  const currentImage = imageUrls[currentImageIndex] || '/placeholder-image.jpg';

  const nextImage = () => {
    if (imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
    }
  };

  const prevImage = () => {
    if (imageUrls.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
    }
  };

  // Grid View
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-64 bg-gradient-to-br from-amber-100 to-amber-50 overflow-hidden group">
          {/* Product Image */}
          <div 
            className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-300 group-hover:scale-105"
            style={{ 
              backgroundImage: `url('${currentImage}')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center'
            }}
          >
            {!currentImage && (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Image Navigation Arrows (if multiple images) */}
          {imageUrls.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                →
              </button>
              
              {/* Image Dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imageUrls.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition"
              aria-label="Add to favorites"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {product.isPopular && (
            <div className="absolute top-4 left-4">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {language === 'en' ? 'Popular' : 'ታዋቂ'}
              </span>
            </div>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            {product.inStock ? (
              <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'In Stock' : 'በክምችት'}
                </span>
              </div>
            ) : (
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {product.isCustom 
                    ? language === 'en' ? 'Custom Order' : 'ብጁ ትዕዛዝ'
                    : language === 'en' ? 'Made to Order' : 'በትዕዛዝ የሚሰራ'
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="p-6">
          <div className="mb-2">
            <span className="text-sm text-amber-600 font-medium">
              {product.category}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {language === 'en' ? product.name_en : product.name_am}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-amber-700">
                {formatPrice(product.price)}
              </p>
              {product.estimatedWeeks && (
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'en' 
                    ? `Ready in ${product.estimatedWeeks} weeks`
                    : `በ${product.estimatedWeeks} ሳምንታት ውስጥ ዝግጁ`
                  }
                </p>
              )}
            </div>
            
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {product.deliveryZones.length} {language === 'en' ? 'zones' : 'ዞኖች'}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleReserve}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition flex items-center justify-center"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {language === 'en' ? 'Reserve Now' : 'አሁን ያስቀምጡ'}
            </button>
            
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full border border-amber-600 text-amber-600 py-2 rounded-lg font-medium hover:bg-amber-50 transition"
            >
              {showDetails 
                ? (language === 'en' ? 'Hide Details' : 'ዝርዝሮችን ደብቅ')
                : (language === 'en' ? 'View Details' : 'ዝርዝሮችን ይመልከቱ')
              }
            </button>
          </div>

          {/* Expanded Details */}
          {showDetails && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'en' ? 'Material:' : 'ዕቃ:'}</span>
                  <span className="font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'en' ? 'Dimensions:' : 'ልኬቶች:'}</span>
                  <span className="font-medium">{product.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">{language === 'en' ? 'Delivery:' : 'ማድረሻ:'}</span>
                  <span className="font-medium text-green-600">
                    {product.deliveryZones.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="md:w-1/4 relative">
          <div 
            className="h-48 md:h-full bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg overflow-hidden bg-center bg-cover bg-no-repeat group"
            style={{ backgroundImage: `url('${currentImage}')` }}
          >
            {!currentImage && (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <ImageIcon className="w-16 h-16 text-gray-400" />
              </div>
            )}
            
            {imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  →
                </button>
                
                {/* Image Dots */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          {product.isPopular && (
            <div className="absolute top-3 left-3">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {language === 'en' ? 'Popular' : 'ታዋቂ'}
              </span>
            </div>
          )}
          
          <div className="absolute bottom-3 right-3 flex space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition"
              aria-label="Add to favorites"
            >
              <Heart 
                className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
              />
            </button>
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition"
              aria-label="Share product"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Details */}
        <div className="md:w-3/4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-amber-600 font-medium">
                  {product.category}
                </span>
                {product.inStock ? (
                  <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    <Check className="w-3 h-3 mr-1" />
                    <span className="text-xs font-medium">
                      {language === 'en' ? 'In Stock' : 'በክምችት'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs font-medium">
                      {product.isCustom 
                        ? language === 'en' ? 'Custom Order' : 'ብጁ ትዕዛዝ'
                        : language === 'en' ? 'Made to Order' : 'በትዕዛዝ የሚሰራ'
                      }
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {language === 'en' ? product.name_en : product.name_am}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {product.description}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-3xl font-bold text-amber-700 mb-2">
                {formatPrice(product.price)}
              </p>
              {product.estimatedWeeks && (
                <p className="text-sm text-gray-500">
                  {language === 'en' 
                    ? `Ready in ${product.estimatedWeeks} weeks`
                    : `በ${product.estimatedWeeks} ሳምንታት ውስጥ ዝግጁ`
                  }
                </p>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Material' : 'ዕቃ'}</p>
              <p className="font-medium">{product.material}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Dimensions' : 'ልኬቶች'}</p>
              <p className="font-medium">{product.dimensions}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Delivery' : 'ማድረሻ'}</p>
              <p className="font-medium text-green-600">
                {product.deliveryZones.length} {language === 'en' ? 'areas' : 'አካባቢዎች'}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">{language === 'en' ? 'Availability' : 'አቅርቦት'}</p>
              <p className="font-medium">
                {product.inStock 
                  ? (language === 'en' ? 'Immediate' : 'በቅጽበት')
                  : (language === 'en' ? 'On Order' : 'በትዕዛዝ')
                }
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {language === 'en' ? 'Available in:' : 'የሚገኝበት:'} {' '}
                <span className="font-medium">{product.deliveryZones.join(', ')}</span>
              </span>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-6 py-3 border border-amber-600 text-amber-600 rounded-lg font-medium hover:bg-amber-50 transition"
              >
                {showDetails 
                  ? (language === 'en' ? 'Hide Details' : 'ዝርዝሮችን ደብቅ')
                  : (language === 'en' ? 'Full Details' : 'ሙሉ ዝርዝሮች')
                }
              </button>
              
              <button
                onClick={handleReserve}
                className="px-8 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {language === 'en' ? 'Reserve Now' : 'አሁን ያስቀምጡ'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}