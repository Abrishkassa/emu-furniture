const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function createAdminsFromCSV() {
  try {
    console.log('\n=== CREATING ADMIN USERS FROM CSV ===\n');
    
    // Read CSV file
    const csvPath = path.join(__dirname, 'admins.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('❌ admins.csv file not found!');
      console.log('Please create admins.csv with the following format:');
      console.log('email,password,name,phone,role');
      console.log('admin@example.com,password123,Admin Name,+251911000000,ADMIN');
      return;
    }
    
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.trim().split('\n');
    
    // Skip header row
    const headers = lines[0].split(',');
    console.log('CSV Headers:', headers.join(', '));
    console.log('');
    
    let created = 0;
    let updated = 0;
    let skipped = 0;
    
    // Process each user
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [email, password, name, phone, role, id] = line.split(',').map(s => s.trim());
      
      console.log(`Processing: ${email} (ID: ${id || 'auto'})...`);
      
      // Validate required fields
      if (!email || !password || !name) {
        console.log(`  ⚠️  Skipped: Missing required fields\n`);
        skipped++;
        continue;
      }
      
      // Validate role
      const validRoles = ['ADMIN', 'STAFF', 'CUSTOMER'];
      const userRole = role && validRoles.includes(role.toUpperCase()) ? role.toUpperCase() : 'STAFF';
      
      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        });
        
        if (existingUser) {
          // Update existing user
          const hashedPassword = await bcrypt.hash(password, 10);
          await prisma.user.update({
            where: { email: email.toLowerCase() },
            data: {
              password: hashedPassword,
              name: name,
              role: userRole,
              phone: phone || null
            }
          });
          console.log(`  ✅ Updated: ${name} (${userRole})\n`);
          updated++;
        } else {
          // Create new user
          const hashedPassword = await bcrypt.hash(password, 10);
          await prisma.user.create({
            data: {
              email: email.toLowerCase(),
              password: hashedPassword,
              name: name,
              role: userRole,
              phone: phone || null
            }
          });
          console.log(`  ✅ Created: ${name} (${userRole})\n`);
          created++;
        }
      } catch (error) {
        console.log(`  ❌ Error: ${error.message}\n`);
        skipped++;
      }
    }
    
    console.log('=== SUMMARY ===');
    console.log(`✅ Created: ${created}`);
    console.log(`🔄 Updated: ${updated}`);
    console.log(`⚠️  Skipped: ${skipped}`);
    console.log(`📊 Total processed: ${created + updated + skipped}`);
    console.log('\nYou can now login at: https://emufurniturehawassa.com/admin/login\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminsFromCSV();
