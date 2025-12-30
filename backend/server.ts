import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = 5000;
const prisma = new PrismaClient();

// Middleware - KEEP existing
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Add cookie parser for auth

// Health check route - KEEP existing
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Emu Furniture API is running',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Import your actual products route - KEEP existing
const productRoutes = require('./routes/products').default || require('./routes/products');

// Use the actual products route instead of hardcoded one - KEEP existing
app.use('/api/products', productRoutes);

// =============== NEW ADMIN FUNCTIONALITIES ===============

// 1. Import and use auth routes
try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('⚠️  Auth routes not found (run setup steps first)');
}

// 2. Import and use admin product routes
try {
  const adminProductRoutes = require('./routes/admin/products');
  app.use('/api/admin/products', adminProductRoutes);
  console.log('✅ Admin product routes loaded');
} catch (error) {
  console.log('⚠️  Admin product routes not found (run setup steps first)');
}

// 3. Import and use admin dashboard routes
try {
  const adminDashboardRoutes = require('./routes/admin/dashboard');
  app.use('/api/admin/dashboard', adminDashboardRoutes);
  console.log('✅ Admin dashboard routes loaded');
} catch (error) {
  console.log('⚠️  Admin dashboard routes not found (run setup steps first)');
}

// 4. Import and use admin user routes
try {
  const adminUserRoutes = require('./routes/admin/users');
  app.use('/api/admin/users', adminUserRoutes);
  console.log('✅ Admin user routes loaded');
} catch (error) {
  console.log('⚠️  Admin user routes not found (run setup steps first)');
}

// 5. Import and use admin blog routes
try {
  const adminBlogRoutes = require('./routes/admin/blogs');
  app.use('/api/admin/blogs', adminBlogRoutes);
  console.log('✅ Admin blog routes loaded');
} catch (error) {
  console.log('⚠️  Admin blog routes not found (run setup steps first)');
}

// 6. Public blog routes (for frontend display)
try {
  const publicBlogRoutes = require('./routes/blogs');
  app.use('/api/blogs', publicBlogRoutes);
  console.log('✅ Public blog routes loaded');
} catch (error) {
  console.log('⚠️  Public blog routes not found (run setup steps first)');
}

// =============== END NEW FUNCTIONALITIES ===============

// Error handling middleware - KEEP existing (but enhanced)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server - KEEP existing but with more info
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`👑 Admin APIs:`);
  console.log(`   - Products: http://localhost:${PORT}/api/admin/products`);
  console.log(`   - Dashboard: http://localhost:${PORT}/api/admin/dashboard`);
  console.log(`   - Users: http://localhost:${PORT}/api/admin/users`);
  console.log(`   - Blogs: http://localhost:${PORT}/api/admin/blogs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});