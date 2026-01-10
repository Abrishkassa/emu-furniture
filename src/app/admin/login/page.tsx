'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Use localhost:5000 since that's where your backend is running
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });

      console.log('Login response status:', res.status);
      
      const data = await res.json();
      console.log('Login response data:', data);

      if (data.success) {
        // Store token in localStorage for frontend use
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          localStorage.setItem('adminUser', JSON.stringify(data.user));
        }
        
        // Redirect to admin dashboard
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        setError(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Cannot connect to server. Make sure backend is running on localhost:5000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-md w-full space-y-8 p-8">
        {/* Logo */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">E</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Emu Furniture Admin</h2>
          <p className="mt-2 text-gray-600">Sign in to your admin dashboard</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <div>
                <p className="text-red-700 text-sm font-medium">{error}</p>
                <p className="text-red-500 text-xs mt-1">
                  Backend: localhost:5000 | Make sure server is running
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                placeholder="admin@emufurniture.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-3" />
                  Sign in
                </>
              )}
            </button>
          </div>

          {/* Debug info and credentials */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Debug Information</h3>
              <div className="space-y-1 text-xs text-blue-700">
                <p>Backend URL: <code className="bg-blue-100 px-2 py-1 rounded">http://localhost:5000</code></p>
                <p>Route: <code className="bg-blue-100 px-2 py-1 rounded">/api/auth/login</code></p>
                <p>Make sure backend is running and CORS is configured</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Test Credentials</h3>
              <div className="space-y-1 text-xs text-amber-700">
                <p>Email: <code className="bg-amber-100 px-2 py-1 rounded">admin@emufurniture.com</code></p>
                <p>Password: <code className="bg-amber-100 px-2 py-1 rounded">password123</code></p>
                <p className="text-xs mt-2">Make sure this user exists in your database</p>
              </div>
            </div>
          </div>

          {/* Troubleshooting tips */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Troubleshooting Tips</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Check if backend is running on port 5000</li>
              <li>• Verify user exists in database</li>
              <li>• Check browser console for CORS errors</li>
              <li>• Test backend route directly: <a href="http://localhost:5000/api/auth/test" target="_blank" className="text-amber-600 hover:underline">/api/auth/test</a></li>
            </ul>
          </div>

          {/* Back to store */}
          <div className="text-center pt-4">
            <Link
              href="/"
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              ← Back to Emu Furniture Store
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}