// backend/fix-passwords.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixPasswords() {
  const password = 'password123';
  const correctHash = await bcrypt.hash(password, 10);
  
  console.log('✅ Correct hash for "password123":');
  console.log(correctHash);
  console.log('Length:', correctHash.length);
  
  // Update admin user
  await prisma.user.update({
    where: { email: 'admin@emufurniture.com' },
    data: { password: correctHash }
  });
  
  // Update staff user
  await prisma.user.update({
    where: { email: 'staff@emufurniture.com' },
    data: { password: correctHash }
  });
  
  // Update customer user
  await prisma.user.update({
    where: { email: 'customer@example.com' },
    data: { password: correctHash }
  });
  
  console.log('\n✅ All user passwords updated!');
  console.log('Now use: password123');
  
  // Verify
  const users = await prisma.user.findMany({
    select: { email: true, role: true, password: true }
  });
  
  console.log('\nUpdated users:');
  for (const user of users) {
    const isValid = await bcrypt.compare('password123', user.password);
    console.log(`- ${user.email} (${user.role}): Password valid? ${isValid}`);
  }
  
  await prisma.$disconnect();
}

fixPasswords().catch(console.error);