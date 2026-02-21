const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createCustomAdmin() {
  try {
    console.log('\n=== CREATE ADMIN USER ===\n');
    
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');
    const name = await question('Enter admin name: ');
    const phone = await question('Enter admin phone (optional): ');
    
    console.log('\nCreating admin user...');
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });
    
    if (existingUser) {
      console.log('\n⚠️  User already exists with this email!');
      const update = await question('Update password? (yes/no): ');
      
      if (update.toLowerCase() === 'yes') {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { email: email.toLowerCase().trim() },
          data: { 
            password: hashedPassword,
            role: 'ADMIN'
          }
        });
        console.log('\n✅ Admin user updated successfully!');
      }
      
      rl.close();
      return;
    }
    
    // Create new admin user
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name.trim(),
        role: 'ADMIN',
        phone: phone.trim() || null
      }
    });
    
    console.log('\n✅ Admin user created successfully!');
    console.log('\nLogin credentials:');
    console.log('- Email:', admin.email);
    console.log('- Password:', password);
    console.log('- Role:', admin.role);
    console.log('\nYou can now login at: https://emufurniturehawassa.com/admin/login\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

createCustomAdmin();
