import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 5000;
const prisma = new PrismaClient();

// =============== CREATE UPLOAD DIRECTORIES ===============
const uploadDirs = [
  'public/uploads/products',
  'public/uploads/thumbnails',
  'public/uploads/medium'
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// =============== MIDDLEWARE ===============
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static files (IMAGES)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// =============== HEALTH CHECK ===============
app.get('/api/health', (req, res) => {
  // Count files in upload directories
  const uploadStats = {
    products: fs.readdirSync('public/uploads/products').length,
    thumbnails: fs.readdirSync('public/uploads/thumbnails').length,
    medium: fs.readdirSync('public/uploads/medium').length
  };
  
  res.json({ 
    status: 'OK', 
    message: 'Emu Furniture API is running',
    timestamp: new Date().toISOString(),
    database: 'Connected',
    uploads: uploadStats
  });
});

// =============== PUBLIC ROUTES ===============

// Products routes
try {
  const productRoutes = require('./routes/products').default || require('./routes/products');
  app.use('/api/products', productRoutes);
  console.log('✅ Products routes loaded');
} catch (error) {
  console.log('⚠️  Products routes not found');
}

// Public blog routes
try {
  const publicBlogRoutes = require('./routes/blogs');
  app.use('/api/blogs', publicBlogRoutes);
  console.log('✅ Public blog routes loaded');
} catch (error) {
  console.log('⚠️  Public blog routes not found');
}

// =============== AUTH ROUTES ===============
try {
  const authRoutes = require('./routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('⚠️  Auth routes not found');
}

// =============== IMAGE UPLOAD ROUTES ===============
try {
  const uploadRoutes = require('./routes/upload');
  app.use('/api/upload', uploadRoutes);
  console.log('✅ Upload routes loaded');
} catch (error) {
  console.log('⚠️  Upload routes not found');
}

// =============== ADMIN ROUTES ===============

// Admin products routes
try {
  const adminProductRoutes = require('./routes/admin/products');
  app.use('/api/admin/products', adminProductRoutes);
  console.log('✅ Admin product routes loaded');
} catch (error) {
  console.log('⚠️  Admin product routes not found');
}

// Admin dashboard routes
try {
  const adminDashboardRoutes = require('./routes/admin/dashboard');
  app.use('/api/admin/dashboard', adminDashboardRoutes);
  console.log('✅ Admin dashboard routes loaded');
} catch (error) {
  console.log('⚠️  Admin dashboard routes not found');
}

// Admin user routes
try {
  const adminUserRoutes = require('./routes/admin/users');
  app.use('/api/admin/users', adminUserRoutes);
  console.log('✅ Admin user routes loaded');
} catch (error) {
  console.log('⚠️  Admin user routes not found');
}

// Admin blog routes
try {
  const adminBlogRoutes = require('./routes/admin/blogs');
  app.use('/api/admin/blogs', adminBlogRoutes);
  console.log('✅ Admin blog routes loaded');
} catch (error) {
  console.log('⚠️  Admin blog routes not found');
}

// =============== ERROR HANDLING ===============

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  
  // Handle Multer errors
  if (err.name === 'MulterError') {
    if (err.message === 'File too large') {
      return res.status(400).json({
        success: false,
        error: 'File size too large. Maximum 10MB allowed.'
      });
    }
    if (err.message === 'Unexpected field') {
      return res.status(400).json({
        success: false,
        error: 'Invalid field name for file upload.'
      });
    }
    if (err.message === 'Too many files') {
      return res.status(400).json({
        success: false,
        error: 'Too many files uploaded. Maximum 10 files allowed.'
      });
    }
  }
  
  res.status(500).json({ 
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// =============== START SERVER ===============
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`📸 Upload API: http://localhost:${PORT}/api/upload`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`👑 Admin APIs:`);
  console.log(`   - Products: http://localhost:${PORT}/api/admin/products`);
  console.log(`   - Dashboard: http://localhost:${PORT}/api/admin/dashboard`);
  console.log(`   - Users: http://localhost:${PORT}/api/admin/users`);
  console.log(`   - Blogs: http://localhost:${PORT}/api/admin/blogs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📁 Upload directories:`);
  uploadDirs.forEach(dir => {
    const fileCount = fs.readdirSync(dir).length;
    console.log(`   - ${dir} (${fileCount} files)`);
  });
});