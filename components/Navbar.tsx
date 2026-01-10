'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ShoppingCart, Phone, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Custom Orders', href: '/custom' },
    { name: 'Showroom', href: '/showroom' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogin = () => {
    // Redirect to admin login page
    router.push('/admin/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">እ</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-amber-900 dark:text-amber-500">Emu Furniture</h1>
              <p className="text-xs text-amber-600 dark:text-amber-400">ለላቀ ጥራት ወሰን የለንም</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 font-medium transition"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="hidden md:flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md"
            >
              <User size={18} />
              <span>Login</span>
            </button>
            
            <a
              href="tel:+251911234567"
              className="hidden md:flex items-center space-x-2 bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 transition"
            >
              <Phone size={18} />
              <span>Call Now</span>
            </a>
            
            <button className="p-2 relative">
              <ShoppingCart className="w-6 h-6 text-amber-700 dark:text-amber-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 pt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-amber-700 dark:hover:text-amber-400 px-3 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Login Button */}
              <button
                onClick={() => {
                  handleLogin();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600 text-white px-4 py-3 rounded-lg mt-2"
              >
                <User size={18} />
                <span>Login</span>
              </button>
              
              <a
                href="tel:+251911234567"
                className="flex items-center justify-center space-x-2 bg-amber-700 text-white px-4 py-3 rounded-lg mt-2"
              >
                <Phone size={18} />
                <span>+251 97 259 0743</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}