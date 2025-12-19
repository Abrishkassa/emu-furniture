'use client';

import { X, Filter as FilterIcon } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{ id: string; name_en: string; name_am: string }>;
  materials: string[];
  deliveryZones: string[];
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  priceStats: { min: number; max: number };
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedMaterials: string[];
  onMaterialChange: (materials: string[]) => void;
  selectedZones: string[];
  onZoneChange: (zones: string[]) => void;
  inStockOnly: boolean;
  onInStockChange: (value: boolean) => void;
  popularOnly: boolean;
  onPopularChange: (value: boolean) => void;
  customOnly: boolean;
  onCustomChange: (value: boolean) => void;
  language: 'en' | 'am';
}

export default function FilterSidebar({
  isOpen,
  onClose,
  categories,
  materials,
  deliveryZones,
  priceRange,
  onPriceChange,
  priceStats,
  selectedCategory,
  onCategoryChange,
  selectedMaterials,
  onMaterialChange,
  selectedZones,
  onZoneChange,
  inStockOnly,
  onInStockChange,
  popularOnly,
  onPopularChange,
  customOnly,
  onCustomChange,
  language
}: FilterSidebarProps) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handleMaterialToggle = (material: string) => {
    if (selectedMaterials.includes(material)) {
      onMaterialChange(selectedMaterials.filter(m => m !== material));
    } else {
      onMaterialChange([...selectedMaterials, material]);
    }
  };

  const handleZoneToggle = (zone: string) => {
    if (selectedZones.includes(zone)) {
      onZoneChange(selectedZones.filter(z => z !== zone));
    } else {
      onZoneChange([...selectedZones, zone]);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Mobile Filter Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <div className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center">
                  <FilterIcon className="w-5 h-5 mr-2" />
                  {language === 'en' ? 'Filters' : 'ማጣሪያዎች'}
                </h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {renderFilterContent()}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white rounded-xl shadow p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <FilterIcon className="w-5 h-5 mr-2" />
            {language === 'en' ? 'Filters' : 'ማጣሪያዎች'}
          </h2>
          {renderFilterContent()}
        </div>
      </div>
    </>
  );

  function renderFilterContent() {
    return (
      <div className="space-y-8">
        {/* Price Range */}
        <div>
          <h3 className="font-bold text-lg mb-3">
            {language === 'en' ? 'Price Range' : 'የዋጋ ክልል'}
          </h3>
          <div className="mb-4">
            <input
              type="range"
              min={priceStats.min}
              max={priceStats.max}
              value={localPriceRange[0]}
              onChange={(e) => {
                const newRange: [number, number] = [Number(e.target.value), localPriceRange[1]];
                setLocalPriceRange(newRange);
              }}
              onMouseUp={() => onPriceChange(localPriceRange)}
              onTouchEnd={() => onPriceChange(localPriceRange)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="range"
              min={priceStats.min}
              max={priceStats.max}
              value={localPriceRange[1]}
              onChange={(e) => {
                const newRange: [number, number] = [localPriceRange[0], Number(e.target.value)];
                setLocalPriceRange(newRange);
              }}
              onMouseUp={() => onPriceChange(localPriceRange)}
              onTouchEnd={() => onPriceChange(localPriceRange)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">{formatPrice(localPriceRange[0])}</span>
            <span className="font-medium">{formatPrice(localPriceRange[1])}</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <h3 className="font-bold text-lg mb-3">
            {language === 'en' ? 'Category' : 'ምድብ'}
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedCategory === category.id
                    ? 'bg-amber-100 text-amber-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {language === 'en' ? category.name_en : category.name_am}
              </button>
            ))}
          </div>
        </div>

        {/* Material */}
        <div>
          <h3 className="font-bold text-lg mb-3">
            {language === 'en' ? 'Material' : 'ዕቃ'}
          </h3>
          <div className="space-y-2">
            {materials.map((material) => (
              <button
                key={material}
                onClick={() => handleMaterialToggle(material)}
                className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedMaterials.includes(material)
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="mr-2">
                  {selectedMaterials.includes(material) ? '✓' : '○'}
                </span>
                {material}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Zone */}
        <div>
          <h3 className="font-bold text-lg mb-3">
            {language === 'en' ? 'Delivery Zone' : 'የማድረሻ ዞን'}
          </h3>
          <div className="space-y-2">
            {deliveryZones.map((zone) => (
              <button
                key={zone}
                onClick={() => handleZoneToggle(zone)}
                className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition ${
                  selectedZones.includes(zone)
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="mr-2">
                  {selectedZones.includes(zone) ? '✓' : '○'}
                </span>
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div>
          <h3 className="font-bold text-lg mb-3">
            {language === 'en' ? 'Quick Filters' : 'ፈጣን ማጣሪያዎች'}
          </h3>
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onInStockChange(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="ml-2">{language === 'en' ? 'In Stock Only' : 'በክምችት ብቻ'}</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={popularOnly}
                onChange={(e) => onPopularChange(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="ml-2">{language === 'en' ? 'Popular Items' : 'ታዋቂ ንጥሎች'}</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={customOnly}
                onChange={(e) => onCustomChange(e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <span className="ml-2">{language === 'en' ? 'Custom Orders' : 'ብጁ ትዕዛዞች'}</span>
            </label>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => {
            onCategoryChange('all');
            onPriceChange([0, 100000]);
            onMaterialChange([]);
            onZoneChange([]);
            onInStockChange(false);
            onPopularChange(false);
            onCustomChange(false);
          }}
          className="w-full py-3 border-2 border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition"
        >
          {language === 'en' ? 'Clear All Filters' : 'ሁሉንም ማጣሪያዎች አጽዳ'}
        </button>
      </div>
    );
  }
}