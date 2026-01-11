const express = require('express');
const bcrypt = require('bcrypt');
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

// Debug route to check user password hash
router.get('/debug-user', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@emufurniture.com' }
    });
    
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    
    // Analyze the hash
    const hash = user.password;
    console.log('\n=== DEBUG USER PASSWORD ===');
    console.log('Full hash:', hash);
    console.log('Hash length:', hash.length);
    console.log('Hash starts with $2b$:', hash.startsWith('$2b$'));
    console.log('Hash starts with $2a$:', hash.startsWith('$2a$'));
    console.log('Hash starts with $2y$:', hash.startsWith('$2y$'));
    
    // Test with bcrypt
    const testPassword = 'password123';
    
    console.log('\nTesting password comparison:');
    try {
      const bcryptResult = await bcrypt.compare(testPassword, hash);
      console.log('bcrypt.compare result:', bcryptResult);
    } catch (e) {
      console.log('bcrypt.compare error:', e.message);
    }
    
    res.json({
      email: user.email,
      role: user.role,
      hashLength: hash.length,
      hashPrefix: hash.substring(0, 30) + '...',
      hashStartsWith: {
        '$2b$': hash.startsWith('$2b$'),
        '$2a$': hash.startsWith('$2a$'),
        '$2y$': hash.startsWith('$2y$')
      }
    });
    
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

// FIX PASSWORD ROUTE - Temporary, remove after fixing
router.post('/fix-password', async (req, res) => {
  try {
    const { email = 'admin@emufurniture.com', newPassword = 'password123' } = req.body;
    
    console.log('\n=== FIXING PASSWORD ===');
    console.log('Email:', email);
    console.log('New Password:', newPassword);
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    console.log('Current password hash:', user.password);
    console.log('Current hash length:', user.password.length);
    
    // Create new hash with bcrypt
    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    console.log('New password hash:', newHashedPassword);
    console.log('New hash length:', newHashedPassword.length);
    
    // Update user with new hash
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHashedPassword }
    });
    
    // Verify the new hash works
    const isValid = await bcrypt.compare(newPassword, newHashedPassword);
    console.log('Verification test with new hash:', isValid);
    
    // Also test with old hash for comparison
    const oldHashTest = await bcrypt.compare(newPassword, user.password);
    console.log('Test with old hash:', oldHashTest);
    
    res.json({
      success: true,
      message: 'Password fixed successfully',
      testPassword: newPassword,
      verification: isValid,
      oldHashTest: oldHashTest,
      newHash: newHashedPassword.substring(0, 30) + '...'
    });
    
  } catch (error) {
    console.error('Fix password error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('\n=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }
    
    // Clean email
    const cleanEmail = email.trim().toLowerCase();
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: cleanEmail }
    });
    
    console.log('User found:', !!user);
    if (user) {
      console.log('User role:', user.role);
      console.log('User name:', user.name);
      console.log('Stored hash length:', user.password?.length || 0);
      console.log('Stored hash prefix:', user.password?.substring(0, 30) + '...' || 'No hash');
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
    
    // Verify password with detailed logging
    console.log('Comparing password...');
    console.log('Input password length:', password.length);
    console.log('Stored hash length:', user.password.length);
    
    try {
      const validPassword = await bcrypt.compare(password, user.password);
      console.log('Password valid?', validPassword);
      
      if (!validPassword) {
        console.log('ERROR: Password comparison failed');
        console.log('Tip: Run /api/auth/fix-password to reset password hash');
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
    } catch (bcryptError) {
      console.error('Bcrypt comparison error:', bcryptError.message);
      console.log('This usually means the stored hash is not a valid bcrypt hash');
      console.log('Try running: POST /api/auth/fix-password');
      
      return res.status(500).json({
        success: false,
        error: 'Authentication error. Please contact administrator.'
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
    console.log('Token generated:', token.substring(0, 30) + '...');
    
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
    console.error('\n=== LOGIN ERROR ===');
    console.error('Error:', error.message);
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