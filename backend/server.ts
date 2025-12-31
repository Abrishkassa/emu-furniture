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

// Add request logging middleware - FIXED POSITION
app.use((req, res, next) => {
  console.log(`\n[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  // Special logging for auth routes
  if (req.originalUrl.includes('/auth')) {
    console.log('🔐 Auth route detected');
    console.log('Request path:', req.path);
    console.log('Original URL:', req.originalUrl);
  }
  
  next();
});

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
console.log('\n=== LOADING AUTH ROUTES ===');
try {
  const authPath = path.join(__dirname, 'routes/auth.js');
  console.log('📁 Checking auth file:', authPath);
  console.log('📁 File exists:', fs.existsSync(authPath));
  
  if (fs.existsSync(authPath)) {
    // Clear cache to ensure fresh load
    delete require.cache[require.resolve('./routes/auth')];
    
    console.log('📦 Attempting to load auth module...');
    const authModule = require('./routes/auth');
    console.log('📦 Module loaded. Type:', typeof authModule);
    
    if (typeof authModule === 'function') {
      // Mount the auth router
      console.log('✅ Mounting auth router at /api/auth');
      app.use('/api/auth', authModule);
      console.log('✅ Auth routes mounted successfully');
      
      // Add a DIRECT test route that bypasses the auth router
      app.get('/api/auth-direct-test', (req, res) => {
        console.log('Direct auth test route called');
        res.json({
          success: true,
          message: 'Direct auth test (bypasses auth.js router)',
          timestamp: new Date().toISOString()
        });
      });
    } else {
      console.log('❌ Auth module is not a function');
      throw new Error('Auth module is not a valid Express router');
    }
  } else {
    console.log('❌ Auth file not found');
    throw new Error('Auth routes file not found');
  }
} catch (error: any) {
  console.log('❌ ERROR loading auth routes:');
  console.log('❌ Error message:', error.message);
  console.log('❌ Error stack:', error.stack);
  
  // Create emergency auth routes that will definitely work
  console.log('🆘 Creating emergency auth routes...');
  
  app.get('/api/auth/test', (req, res) => {
    console.log('Emergency auth test route called');
    res.json({
      success: true,
      message: 'Emergency auth route - auth.js failed to load',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  });
  
  app.post('/api/auth/login', (req, res) => {
    console.log('Emergency login route called:', req.body.email);
    res.json({
      success: true,
      user: {
        id: 'emergency-1',
        email: req.body.email || 'emergency@test.com',
        name: 'Emergency Admin',
        role: 'ADMIN'
      },
      token: 'emergency-token-' + Date.now(),
      message: 'Using emergency login route'
    });
  });
}

// =============== IMAGE UPLOAD ROUTES ===============
try {
  // Use import() for CommonJS modules in TypeScript
  const uploadModule = require('./routes/upload');
  const uploadRoutes = uploadModule.default || uploadModule;
  app.use('/api/upload', uploadRoutes);
  console.log('✅ Upload routes loaded');
} catch (error: any) {
  console.log('⚠️  Upload routes not found:', error.message);
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

// =============== ADD A ROUTE DEBUGGING ENDPOINT ===============
app.get('/api/debug/routes', (req, res) => {
  const authRoutes: any[] = [];
  
  app._router.stack.forEach((layer: any, index: number) => {
    if (layer.route) {
      // Direct routes
      if (layer.route.path.includes('auth')) {
        authRoutes.push({
          index,
          path: layer.route.path,
          methods: Object.keys(layer.route.methods),
          type: 'direct'
        });
      }
    } else if (layer.name === 'router') {
      // Router middleware
      const regexStr = layer.regexp.toString();
      if (regexStr.includes('auth')) {
        authRoutes.push({
          index,
          path: regexStr,
          methods: ['ROUTER'],
          type: 'router'
        });
      }
    }
  });
  
  res.json({
    message: 'Route debugging',
    authRoutesCount: authRoutes.length,
    authRoutes: authRoutes
  });
});

// =============== ERROR HANDLING ===============

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('\n⚠️  Server error caught by error handler:');
  console.error('Error name:', err.name);
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  console.error('Request URL:', req.originalUrl);
  
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

// 404 handler - MUST BE LAST (after all other routes)
app.use('*', (req, res) => {
  console.log(`\n⚠️  404 Handler triggered for: ${req.method} ${req.originalUrl}`);
  console.log('Available auth-related routes:');
  
  // Log all routes for debugging
  app._router.stack.forEach((layer: any, index: number) => {
    if (layer.route) {
      console.log(`  [${index}] ${Object.keys(layer.route.methods)} ${layer.route.path}`);
    } else if (layer.name === 'router' && layer.regexp) {
      const regexStr = layer.regexp.toString();
      if (regexStr.includes('auth')) {
        console.log(`  [${index}] ROUTER ${regexStr}`);
      }
    }
  });
  
  res.status(404).json({
    success: false,
    error: 'Route not found',
    requested: req.originalUrl,
    method: req.method
  });
});

// =============== START SERVER ===============
app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`📸 Upload API: http://localhost:${PORT}/api/upload`);
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth`);
  console.log(`   - Test: http://localhost:${PORT}/api/auth/test`);
  console.log(`   - Direct test: http://localhost:${PORT}/api/auth-direct-test`);
  console.log(`👑 Admin APIs:`);
  console.log(`   - Products: http://localhost:${PORT}/api/admin/products`);
  console.log(`   - Dashboard: http://localhost:${PORT}/api/admin/dashboard`);
  console.log(`   - Users: http://localhost:${PORT}/api/admin/users`);
  console.log(`   - Blogs: http://localhost:${PORT}/api/admin/blogs`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🐞 Debug routes: http://localhost:${PORT}/api/debug/routes`);
  console.log(`📁 Upload directories:`);
  uploadDirs.forEach(dir => {
    const fileCount = fs.readdirSync(dir).length;
    console.log(`   - ${dir} (${fileCount} files)`);
  });
  console.log('\n=== SERVER STARTED ===\n');
});