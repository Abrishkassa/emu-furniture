const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production';

// Test route to verify the route is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth API is working',
    timestamp: new Date().toISOString()
  });
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() }
    });
    
    console.log('User found:', !!user);
    if (user) {
      console.log('User role:', user.role);
      console.log('User name:', user.name);
    }
    
    if (!user) {
      console.log('ERROR: User not found');
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check if user is admin or staff
    const allowedRoles = ['ADMIN', 'STAFF'];
    if (!allowedRoles.includes(user.role)) {
      console.log('ERROR: Not admin/staff. Role:', user.role);
      return res.status(403).json({
        success: false,
        error: 'Access denied. Admin/Staff only.'
      });
    }
    
    // Verify password
    console.log('Comparing password...');
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid?', validPassword);
    
    if (!validPassword) {
      console.log('ERROR: Password comparison failed');
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // Set HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    // Also set a regular cookie for easier testing (optional, remove in production)
    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    console.log('SUCCESS: Login successful for', user.email);
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone || null
      },
      token: token // Also send token in response for frontend storage
    });
    
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Login failed: ' + error.message
    });
  }
});

// Check authentication status
router.get('/check', async (req, res) => {
  try {
    const token = req.cookies.admin_token || req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.json({
        authenticated: false,
        user: null,
        message: 'No token found'
      });
    }
    
    console.log('Auth check token found');
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true
      }
    });
    
    if (!user) {
      return res.json({
        authenticated: false,
        user: null,
        message: 'User not found'
      });
    }
    
    res.json({
      authenticated: true,
      user: user
    });
    
  } catch (error) {
    console.error('Auth check error:', error.message);
    res.json({
      authenticated: false,
      user: null,
      error: error.message
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;