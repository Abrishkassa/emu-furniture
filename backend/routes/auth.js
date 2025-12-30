router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);
    console.log('Password provided:', password);
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    console.log('User found:', !!user);
    if (user) {
      console.log('User role:', user.role);
      console.log('User password hash (first 30 chars):', user.password?.substring(0, 30) + '...');
      console.log('Password length:', user.password?.length);
    }
    
    if (!user) {
      console.log('ERROR: User not found');
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }
    
    // Check if user is admin or staff
    if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
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
        phone: user.phone
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
});