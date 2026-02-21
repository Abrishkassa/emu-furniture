const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function verifyAdmin() {
  try {
    const email = 'admin@emufurniturehawassa.com';
    const testPassword = 'Admin@2024!Secure';
    
    console.log('\n=== VERIFYING ADMIN USER ===\n');
    console.log('Looking for:', email);
    
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });
    
    if (!user) {
      console.log('❌ User not found in database!');
      console.log('\nRun: node create-admins-from-csv.js');
      return;
    }
    
    console.log('\n✅ User found:');
    console.log('- Email:', user.email);
    console.log('- Name:', user.name);
    console.log('- Role:', user.role);
    console.log('- Phone:', user.phone);
    console.log('- Created:', user.createdAt);
    console.log('- Password hash length:', user.password?.length || 0);
    
    // Test password
    console.log('\n=== TESTING PASSWORD ===');
    console.log('Test password:', testPassword);
    
    if (!user.password) {
      console.log('❌ No password hash stored!');
      return;
    }
    
    const isValid = await bcrypt.compare(testPassword, user.password);
    console.log('Password valid:', isValid ? '✅ YES' : '❌ NO');
    
    if (!isValid) {
      console.log('\n⚠️  Password does not match!');
      console.log('Updating password...');
      
      const hashedPassword = await bcrypt.hash(testPassword, 10);
      await prisma.user.update({
        where: { email: email.toLowerCase() },
        data: { password: hashedPassword }
      });
      
      console.log('✅ Password updated successfully!');
      console.log('\nTry logging in again with:');
      console.log('Email:', email);
      console.log('Password:', testPassword);
    } else {
      console.log('\n✅ Everything looks good!');
      console.log('\nLogin credentials:');
      console.log('Email:', email);
      console.log('Password:', testPassword);
      console.log('URL: https://emufurniturehawassa.com/admin/login');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();
