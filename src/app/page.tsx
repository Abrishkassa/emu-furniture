'use client';

import { useState, useEffect } from 'react';
import { Sofa, Package, Clock, Phone, MapPin } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Emu Furniture
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Ethiopian Craftsmanship, Modern Design
          </p>
          <button className="bg-white text-amber-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-100 transition">
            Browse Collections
          </button>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <Package className="w-12 h-12 mx-auto mb-4 text-amber-700" />
            <h3 className="text-xl font-bold mb-2">Free Delivery in Addis</h3>
            <p className="text-gray-600">For orders over 10,000 ETB</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <Clock className="w-12 h-12 mx-auto mb-4 text-amber-700" />
            <h3 className="text-xl font-bold mb-2">Custom Orders</h3>
            <p className="text-gray-600">Made to your specifications</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <Sofa className="w-12 h-12 mx-auto mb-4 text-amber-700" />
            <h3 className="text-xl font-bold mb-2">Showroom Visit</h3>
            <p className="text-gray-600">See before you buy</p>
          </div>
        </div>

        {/* Products Preview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <div key={product.id} className="bg-white rounded-xl shadow p-6">
                  <div className="h-48 bg-amber-100 rounded-lg mb-4 flex items-center justify-center">
                    <Sofa className="w-20 h-20 text-amber-700" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-amber-700 font-bold text-lg mb-4">
                    {product.price.toLocaleString()} {product.currency}
                  </p>
                  <button className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800 transition">
                    Reserve Item
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-3xl font-bold mb-6">Visit Our Showroom</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-amber-700 mr-3" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p className="text-gray-600">Megenagna, Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <Phone className="w-6 h-6 text-amber-700 mr-3" />
                <div>
                  <p className="font-semibold">Call Us</p>
                  <p className="text-gray-600">+251 91 123 4567</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Map will go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}