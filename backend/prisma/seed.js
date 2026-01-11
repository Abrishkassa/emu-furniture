const { PrismaClient, Role } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')
  
  // Clear existing data
  await prisma.user.deleteMany({})
  console.log('🧹 Cleared existing users')
  
  // Generate bcrypt hash for password
  console.log('🔐 Generating password hash...')
  const saltRounds = 10
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  
  console.log('Hash generated:', hashedPassword.substring(0, 30) + '...')
  
  // Create users
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'admin@emufurniture.com',
        name: 'Admin User',
        phone: '+251992022056',
        role: Role.ADMIN,
        password: hashedPassword,
      },
      {
        email: 'staff@emufurniture.com',
        name: 'Staff Member',
        phone: '+251933333333',
        role: Role.STAFF,
        password: hashedPassword,
      },
    ],
  })
  
  console.log(`✅ Created ${users.count} users`)
  console.log('\n📋 Login Credentials:')
  console.log('   Admin: admin@emufurniture.com / password123')
  console.log('   Staff: staff@emufurniture.com / password123')
  
  // Verify the hash works
  const adminUser = await prisma.user.findFirst({ 
    where: { email: 'admin@emufurniture.com' },
    select: { password: true }
  })
  
  if (adminUser && adminUser.password) {
    const passwordCheck = await bcrypt.compare(password, adminUser.password)
    console.log('\n🔍 Password verification:', passwordCheck ? '✅ SUCCESS' : '❌ FAILED')
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })