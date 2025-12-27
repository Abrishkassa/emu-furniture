'use client';

import { useState, useEffect } from 'react';
import { 
  Sofa, Package, Clock, Phone, MapPin, 
  TrendingUp, Shield, Truck, Star,
  ChevronRight, CheckCircle, Users
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import TrustBadges from '@/components/TrustBadges';
import Testimonials from '@/components/Testimonials';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  rating: number;
  isPopular: boolean;
  estimatedDelivery: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [popularProducts, setPopularProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Traditional Ethiopian Sofa",
        description: "Hand-carved wooden sofa with premium fabric",
        price: 25000,
        currency: "ETB",
        category: "Sofa",
        rating: 4.8,
        isPopular: true,
        estimatedDelivery: "7-10 days"
      },
      {
        id: 2,
        name: "Modern Coffee Table",
        description: "Glass and wood combination",
        price: 8500,
        currency: "ETB",
        category: "Table",
        rating: 4.5,
        isPopular: true,
        estimatedDelivery: "5-7 days"
      },
      {
        id: 3,
        name: "Executive Office Chair",
        description: "Ergonomic design with leather upholstery",
        price: 12000,
        currency: "ETB",
        rating: 4.9,
        category: "Chair",
        isPopular: true,
        estimatedDelivery: "3-5 days"
      },
      {
        id: 4,
        name: "Bedroom Wardrobe",
        description: "Spacious 6-door wardrobe with mirror",
        price: 35000,
        currency: "ETB",
        category: "Wardrobe",
        rating: 4.7,
        isPopular: false,
        estimatedDelivery: "14-21 days"
      },
      {
        id: 5,
        name: "Dining Set (6 chairs)",
        description: "Solid wood dining table with matching chairs",
        price: 42000,
        currency: "ETB",
        category: "Dining",
        rating: 4.6,
        isPopular: true,
        estimatedDelivery: "10-14 days"
      },
      {
        id: 6,
        name: "Bookshelf Unit",
        description: "Modular bookshelf with adjustable shelves",
        price: 9500,
        currency: "ETB",
        category: "Shelf",
        rating: 4.4,
        isPopular: false,
        estimatedDelivery: "7-10 days"
      },
    ];

    setProducts(mockProducts);
    setPopularProducts(mockProducts.filter(p => p.isPopular));
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ThemeToggle />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-900 via-amber-800 to-amber-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Emu Furniture
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Ethiopian Craftsmanship Meets Modern Design Excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-amber-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Browse Collections <ChevronRight className="inline ml-2" />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Book Showroom Visit
            </button>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-amber-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-amber-200">Designs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10+</div>
              <div className="text-amber-200">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Features */}
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Why Choose Emu Furniture?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We combine traditional Ethiopian craftsmanship with modern design principles to create furniture that lasts generations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Package className="w-10 h-10 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Free Delivery in Addis</h3>
            <p className="text-gray-600 dark:text-gray-300">For orders over 10,000 ETB. Assembly included.</p>
          </div>
          
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Clock className="w-10 h-10 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Custom Orders</h3>
            <p className="text-gray-600 dark:text-gray-300">Tailored to your specifications. 3D design preview available.</p>
          </div>
          
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30">
              <Sofa className="w-10 h-10 text-amber-700 dark:text-amber-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Showroom Visit</h3>
            <p className="text-gray-600 dark:text-gray-300">Experience the quality firsthand. Book your private viewing.</p>
          </div>
        </div>

        {/* Popular Products */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Most Popular Items
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Customer favorites this month
              </p>
            </div>
            <button className="hidden sm:flex items-center text-amber-700 dark:text-amber-500 font-semibold hover:text-amber-800 dark:hover:text-amber-400 transition-colors">
              View All Products <ChevronRight className="ml-2" />
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularProducts.map((product) => (
                <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-56 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <Sofa className="w-24 h-24 text-amber-700 dark:text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                    <div className="absolute top-4 right-4 flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-bold text-gray-800 dark:text-white">{product.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-amber-700 dark:text-amber-500">
                          {product.price.toLocaleString()} {product.currency}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Est. delivery: {product.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                    <button className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                      Reserve Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Process Section */}
        <div className="mb-16 bg-gradient-to-r from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Browse & Select", desc: "Choose from our collection or request custom design" },
              { step: "02", title: "Consultation", desc: "Free design consultation with our experts" },
              { step: "03", title: "Production", desc: "Crafted by skilled Ethiopian artisans" },
              { step: "04", title: "Delivery & Setup", desc: "Free delivery and professional assembly" }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-3/4 w-full h-0.5 bg-amber-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <Testimonials />

        {/* Contact Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                Visit Our Showroom
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Experience the quality and craftsmanship in person. Our showroom is open 6 days a week with expert consultants ready to help you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-amber-700 dark:text-amber-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Location</p>
                    <p className="text-gray-600 dark:text-gray-300">Megenagna, Addis Ababa, Ethiopia</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Near Friendship Hotel</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-amber-700 dark:text-amber-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Opening Hours</p>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Saturday: 8:30 AM - 6:30 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Sunday: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-amber-700 dark:text-amber-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Contact Us</p>
                    <p className="text-gray-600 dark:text-gray-300">+251 91 123 4567</p>
                    <p className="text-gray-600 dark:text-gray-300">info@emufurniture.com</p>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                      ✨ Book a private viewing outside hours
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <button className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                  Book Your Visit Now
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-amber-200 dark:bg-gray-700 flex items-center justify-center mb-6">
                  <Users className="w-12 h-12 text-amber-700 dark:text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Schedule a Private Tour
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get personalized attention and exclusive previews of new collections.
                </p>
                <div className="space-y-3 text-left w-full max-w-xs">
                  {[
                    "One-on-one consultation",
                    "Custom design discussion",
                    "Material selection guidance",
                    "No obligation quote"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 opacity-90">Get early access to new collections and exclusive offers</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Emu Furniture</h3>
              <p className="text-gray-400">
                Crafting exceptional furniture with Ethiopian heritage and modern design.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Showroom</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Delivery Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">Follow us for inspiration and updates</p>
              <div className="flex space-x-4">
                {['Facebook', 'Instagram', 'Telegram'].map((social) => (
                  <a key={social} href="#" className="bg-gray-700 hover:bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Emu Furniture. All rights reserved.</p>
            <p className="mt-2">Addis Ababa, Ethiopia | VAT Registered</p>
          </div>
        </div>
      </footer>
    </div>
  );
}