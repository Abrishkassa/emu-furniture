'use client';

import { useEffect, useState } from 'react';
import { 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp,
  ShoppingCart,
  Star,
  AlertCircle,
  Eye,
  Plus,
  BarChart3,
  Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/dashboard/stats', {
        credentials: 'include'
      });
      
      if (res.ok) {
        const data = await res.json();
        setStats(data.data);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.counts?.products?.total || 0,
      icon: Package,
      color: 'bg-blue-500',
      href: '/admin/products'
    },
    {
      title: 'In Stock',
      value: stats?.counts?.products?.inStock || 0,
      icon: ShoppingCart,
      color: 'bg-green-500',
      href: '/admin/products?filter=inStock'
    },
    {
      title: 'Out of Stock',
      value: stats?.counts?.products?.outOfStock || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
      href: '/admin/products?filter=outOfStock'
    },
    {
      title: 'Average Price',
      value: `ETB ${(stats?.prices?.average || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-amber-500',
      href: '#'
    },
    {
      title: 'Total Users',
      value: stats?.counts?.users?.total || 0,
      icon: Users,
      color: 'bg-purple-500',
      href: '/admin/users'
    },
    {
      title: 'Admins',
      value: stats?.counts?.users?.admins || 0,
      icon: Star,
      color: 'bg-indigo-500',
      href: '/admin/users?role=ADMIN'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <div>
            <h3 className="font-medium text-red-800">Error Loading Dashboard</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="mt-3 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="bg-white rounded-xl shadow border hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-xl`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Products & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow border">
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Products</h2>
              <Link
                href="/admin/products"
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                View all
              </Link>
            </div>
          </div>
          
          <div className="divide-y">
            {stats?.recentProducts?.map((product: any) => (
              <div key={product.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{product.nameEn}</p>
                    <div className="flex items-center mt-1 space-x-3">
                      <span className="text-sm text-gray-500">{product.categoryEn}</span>
                      <span className="text-sm font-bold text-amber-700">
                        ETB {product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>
            ))}
            
            {(!stats?.recentProducts || stats.recentProducts.length === 0) && (
              <div className="px-6 py-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No products yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Store Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Highest Price Product</span>
                <span className="font-bold text-amber-700">
                  ETB {(stats?.prices?.max || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lowest Price Product</span>
                <span className="font-bold text-amber-700">
                  ETB {(stats?.prices?.min || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Product Value</span>
                <span className="font-bold text-amber-700">
                  ETB {((stats?.prices?.average || 0) * (stats?.counts?.products?.total || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/admin/products/new"
                className="flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <div className="flex items-center">
                  <Plus className="w-5 h-5 mr-3" />
                  <span>Add New Product</span>
                </div>
                <span>→</span>
              </Link>
              
              <Link
                href="/"
                target="_blank"
                className="flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-3" />
                  <span>View Store</span>
                </div>
                <span>→</span>
              </Link>
              
              <button
                onClick={() => fetchDashboardData()}
                className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-3" />
                  <span>Refresh Data</span>
                </div>
                <span>↻</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Distribution */}
      {stats?.categories && stats.categories.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Product Categories</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.categories.map((category: any) => (
                <div key={category.categoryEn} className="flex items-center">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category.categoryEn}
                      </span>
                      <span className="text-sm font-bold text-amber-700">
                        {category._count.id} products
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-amber-600 h-2 rounded-full"
                        style={{ 
                          width: `${(category._count.id / stats.counts.products.total) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}