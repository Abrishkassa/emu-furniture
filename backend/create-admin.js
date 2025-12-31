const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('=== CREATING ADMIN USER ===');
    
    const email = 'admin@emufurniture.com';
    const password = 'admin123';
    const name = 'System Administrator';
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingAdmin) {
      console.log('Admin already exists:');
      console.log('- Email:', existingAdmin.email);
      console.log('- Name:', existingAdmin.name);
      console.log('- Role:', existingAdmin.role);
      
      // Update password if needed
      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
      });
      console.log('✅ Password updated');
      
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        role: 'ADMIN',
        phone: '+251900000000'
      }
    });
    
    console.log('✅ Admin user created:');
    console.log('- Email:', admin.email);
    console.log('- Name:', admin.name);
    console.log('- Role:', admin.role);
    console.log('- Created at:', admin.createdAt);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();