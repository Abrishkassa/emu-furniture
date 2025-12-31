'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  X, 
  Upload, 
  Package,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Layers,
  Palette,
  Ruler,
  PackageCheck,
  Star
} from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    // Basic Information
    nameEn: '',
    nameAm: '',
    descriptionEn: '',
    descriptionAm: '',
    price: '',
    currency: 'ETB',
    
    // Category & Type
    categoryEn: 'Living Room',
    categoryAm: 'የመቀመጫ ቤት',
    
    // Specifications
    material: '',
    color: '',
    // REMOVED: dimensions: '',
    
    // Stock & Availability
    inStock: true,
    stockQuantity: '1',
    estimatedDelivery: '1-2 weeks',
    
    // Marketing & Display
    isPopular: false,
    isFeatured: false,
    
    // Media & Tags
    images: [] as string[],
    tags: [] as string[],
  });

  // Fetch available categories and materials
  useEffect(() => {
    fetchCategoriesAndMaterials();
  }, []);

  const fetchCategoriesAndMaterials = async () => {
    try {
      // You can fetch these from your API or keep static
      setCategories([
        'Living Room', 'Bedroom', 'Dining Room', 
        'Office', 'Outdoor', 'Custom Orders', 'Kids Room'
      ]);
      
      setMaterials([
        'Solid Wood', 'Fabric', 'Leather', 'Metal', 
        'Glass', 'Rattan', 'Mahogany', 'Teak', 'Pine',
        'Oak', 'Walnut', 'Bamboo', 'Velvet', 'Linen'
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagAdd = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !formData.tags.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, trimmedTag]
      }));
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    if (!formData.nameEn.trim()) {
      setError('Product name (English) is required');
      return false;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Valid price is required');
      return false;
    }
    
    if (!formData.categoryEn) {
      setError('Category is required');
      return false;
    }
    
    if (formData.images.length === 0) {
      setError('At least one product image is required');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Prepare data for API - EXPLICITLY list fields, don't use spread
      const productData = {
        // Basic Information
        nameEn: formData.nameEn,
        nameAm: formData.nameAm || '',
        descriptionEn: formData.descriptionEn || '',
        descriptionAm: formData.descriptionAm || '',
        price: parseFloat(formData.price),
        currency: formData.currency,
        
        // Category & Type
        categoryEn: formData.categoryEn,
        categoryAm: formData.categoryAm || formData.categoryEn,
        
        // Specifications
        material: formData.material || '',
        color: formData.color || '',
        // DO NOT INCLUDE dimensions
        
        // Stock & Availability
        inStock: formData.inStock,
        stockQuantity: parseInt(formData.stockQuantity) || 0,
        estimatedDelivery: formData.estimatedDelivery,
        
        // Marketing & Display
        isPopular: formData.isPopular,
        isFeatured: formData.isFeatured,
        
        // Media & Tags
        images: formData.images,
        tags: Array.isArray(formData.tags) ? formData.tags : 
              (typeof formData.tags === 'string' ? [formData.tags] : [])
      };
      
      console.log('Sending product data (NO dimensions):', productData);
      
      const response = await fetch('http://localhost:5000/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productData),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSuccess('Product created successfully!');
        
        // Clear form
        setFormData({
          nameEn: '',
          nameAm: '',
          descriptionEn: '',
          descriptionAm: '',
          price: '',
          currency: 'ETB',
          categoryEn: 'Living Room',
          categoryAm: 'የመቀመጫ ቤት',
          material: '',
          color: '',
          // NO dimensions here
          inStock: true,
          stockQuantity: '1',
          estimatedDelivery: '1-2 weeks',
          isPopular: false,
          isFeatured: false,
          images: [],
          tags: [],
        });
        
        // Redirect to products list after 2 seconds
        setTimeout(() => {
          router.push('/admin/products');
        }, 2000);
        
      } else {
        setError(data.error || 'Failed to create product');
      }
      
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle images uploaded from ImageUpload component
  const handleImagesUploaded = (uploadedImages: any[]) => {
    // Convert uploaded images to simple URLs for the form
    const imageUrls = uploadedImages.map(img => img.fullUrls.original);
    setFormData(prev => ({ 
      ...prev, 
      images: imageUrls 
    }));
  };

  // Remove image from the list
  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">Create a new furniture product for your store</p>
          </div>
          <Link
            href="/admin/products"
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Link>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Success!</h3>
              <p className="text-green-600 text-sm">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <div>
              <h3 className="font-medium text-red-800">Error</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* English Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name (English) *
              </label>
              <input
                type="text"
                name="nameEn"
                value={formData.nameEn}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="e.g., Traditional Coffee Table"
                required
              />
            </div>

            {/* Amharic Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name (Amharic)
              </label>
              <input
                type="text"
                name="nameAm"
                value={formData.nameAm}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="e.g., ባህላዊ የቡና ጠረጴዛ"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (ETB) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="categoryEn"
                value={formData.categoryEn}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (English)
            </label>
            <textarea
              name="descriptionEn"
              value={formData.descriptionEn}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="Describe the product features, quality, and benefits..."
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Amharic)
            </label>
            <textarea
              name="descriptionAm"
              value={formData.descriptionAm}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              placeholder="የምርቱን ባህሪያት፣ ጥራት እና ጥቅሞች ይግለጹ..."
            />
          </div>
        </div>

        {/* Section 2: Specifications */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <Layers className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Specifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Material */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material
              </label>
              <div className="relative">
                <select
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors appearance-none"
                >
                  <option value="">Select material</option>
                  {materials.map(material => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="Or type custom material..."
                />
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex items-center">
                <div className="mr-3">
                  <Palette className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                  placeholder="e.g., Brown, Black, Natural"
                />
              </div>
            </div>

            {/* Empty column to maintain layout - REMOVED DIMENSIONS */}
            <div></div>
          </div>
        </div>

        {/* Section 3: Stock & Availability */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center mb-6">
            <div className="bg-amber-100 p-2 rounded-lg mr-3">
              <PackageCheck className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Stock & Availability</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stock Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* Estimated Delivery */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Delivery Time
              </label>
              <input
                type="text"
                name="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="e.g., 3-5 business days"
              />
            </div>

            {/* In Stock Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-700">In Stock</p>
                <p className="text-sm text-gray-500">Product is available for sale</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Section 4: Marketing & Display */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-2 rounded-lg mr-3">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Marketing & Display</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Popular Product */}
            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
              />
              <div>
                <p className="font-medium text-gray-700">Mark as Popular</p>
                <p className="text-sm text-gray-500">Show this product in popular section</p>
              </div>
            </label>

            {/* Featured Product */}
            <label className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="mt-1 mr-3 w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
              />
              <div>
                <p className="font-medium text-gray-700">Mark as Featured</p>
                <p className="text-sm text-gray-500">Highlight this product on homepage</p>
              </div>
            </label>
          </div>
        </div>

        {/* Section 5: Images - Updated with ImageUpload component */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center mb-6">
            <div className="bg-pink-100 p-2 rounded-lg mr-3">
              <ImageIcon className="w-6 h-6 text-pink-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Product Images</h2>
          </div>

          {/* Image Upload Component */}
          <ImageUpload
            onImagesUploaded={handleImagesUploaded}
            maxFiles={10}
            maxSizeMB={10}
          />

          <div className="mt-4 text-sm text-gray-500">
            <p>Upload product images. The first image will be used as the main product image.</p>
          </div>

          {/* Display uploaded images */}
          {formData.images.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Uploaded Images ({formData.images.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((imageUrl, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center">
                                <ImageIcon class="w-12 h-12 text-gray-400" />
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500 truncate">Image {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Section 6: Tags */}
        <div className="bg-white rounded-xl shadow border p-6">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg mr-3">
              <Tag className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Product Tags</h2>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Tags
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                id="tagInput"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="e.g., traditional, wooden, luxury"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    handleTagAdd(input.value);
                    input.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById('tagInput') as HTMLInputElement;
                  if (input.value) {
                    handleTagAdd(input.value);
                    input.value = '';
                  }
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Add
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Add tags to help customers find this product. Press Enter or click Add.
            </p>
          </div>

          {/* Tag Display */}
          {formData.tags.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Added Tags</h3>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Link
            href="/admin/products"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Product...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>

      {/* Demo Data Section (for testing) */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-medium text-blue-800 mb-3">💡 Need test data?</h3>
        <p className="text-blue-600 text-sm mb-4">
          Try these sample values for testing:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-blue-700 mb-1">Traditional Sofa:</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>Name: "Ethiopian Traditional Sofa"</li>
              <li>Price: 25000</li>
              <li>Category: "Living Room"</li>
              <li>Material: "Solid Wood & Fabric"</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-blue-700 mb-1">Modern Desk:</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>Name: "Modern Office Desk"</li>
              <li>Price: 12500</li>
              <li>Category: "Office"</li>
              <li>Material: "Metal and Glass"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}