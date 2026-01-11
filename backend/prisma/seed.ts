const { PrismaClient, Role, OrderStatus, PaymentStatus, BlogCategory, PostStatus, ContactDepartment, ContactMethod, ContactStatus, CustomOrderCategory, CustomOrderTimeline, CustomOrderStatus, CommunicationType, VisitType, BookingStatus } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear ALL existing data in correct order (respecting foreign keys)
  await prisma.communicationHistory.deleteMany({})
  await prisma.customOrder.deleteMany({})
  await prisma.showroomBooking.deleteMany({})
  await prisma.cartItem.deleteMany({})
  await prisma.orderItem.deleteMany({})
  await prisma.order.deleteMany({})
  await prisma.address.deleteMany({})
  await prisma.blogPost.deleteMany({})
  await prisma.contactSubmission.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.user.deleteMany({})
  
  console.log('🧹 Cleared all existing data')

  // Generate proper bcrypt hashes for passwords
  console.log('🔐 Generating password hashes...')
  const saltRounds = 10
  const adminPassword = 'password123'
  const userPassword = 'password123' // Same password for all users in seed
  
  // Hash passwords
  const hashedAdminPassword = await bcrypt.hash(adminPassword, saltRounds)
  const hashedUserPassword = await bcrypt.hash(userPassword, saltRounds)
  
  console.log('Admin hash generated:', hashedAdminPassword.substring(0, 30) + '...')
  console.log('User hash generated:', hashedUserPassword.substring(0, 30) + '...')

  // 1. CREATE USERS
  const users = await prisma.user.createMany({
    data: [
      {
        email: 'admin@emufurniture.com',
        name: 'Admin User',
        phone: '+251992022056',
        role: Role.ADMIN,
        password: hashedAdminPassword,
      },
      {
        email: 'customer@example.com',
        name: 'abriham kassa',
        phone: '+251972590743',
        role: Role.CUSTOMER,
        password: hashedUserPassword,
      },
      {
        email: 'staff@emufurniture.com',
        name: 'Staff Member',
        phone: '+251933333333',
        role: Role.STAFF,
        password: hashedUserPassword,
      },
    ],
  })
  console.log(`👥 Created ${users.count} users`)

  // Verify the hashes work
  console.log('\n🔍 Verifying password hashes...')
  const adminUser = await prisma.user.findFirst({ 
    where: { email: 'admin@emufurniture.com' },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      role: true
    }
  })
  
  if (adminUser && adminUser.password) {
    const passwordCheck = await bcrypt.compare(adminPassword, adminUser.password)
    console.log('Admin password verification:', passwordCheck ? '✅ SUCCESS' : '❌ FAILED')
    
    if (!passwordCheck) {
      console.log('Admin password hash:', adminUser.password)
      console.log('Expected password:', adminPassword)
    }
  } else {
    console.log('❌ Admin user not found or password is null')
  }

  // Get user IDs with proper selection
  const customerUser = await prisma.user.findFirst({ 
    where: { email: 'customer@example.com' },
    select: { id: true }
  })
  
  const staffUser = await prisma.user.findFirst({ 
    where: { email: 'staff@emufurniture.com' },
    select: { id: true, name: true }
  })

  // 2. CREATE ADDRESSES
  if (customerUser) {
    const addresses = await prisma.address.createMany({
      data: [
        {
          userId: customerUser.id,
          street: 'Bole Road',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          zipCode: '1000',
          country: 'Ethiopia',
          isDefault: true,
        },
        {
          userId: customerUser.id,
          street: 'Megenagna',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          zipCode: '1001',
          country: 'Ethiopia',
          isDefault: false,
        },
      ],
    })
    console.log(`📍 Created ${addresses.count} addresses`)
  }

  // 3. CREATE PRODUCTS
  const products = await prisma.product.createMany({
    data: [
      {
        nameEn: 'Ethiopian Traditional Sofa',
        nameAm: 'ባህላዊ የኢትዮጵያ ሶፋ',
        descriptionEn: 'Handcrafted traditional Ethiopian sofa with intricate designs.',
        descriptionAm: 'እጅጌ የተሰራ ባህላዊ የኢትዮጵያ ሶፋ በዝርዝር ዲዛይኖች።',
        price: 25000,
        currency: 'ETB',
        categoryEn: 'Sofa',
        categoryAm: 'ሶፋ',
        subCategory: 'Traditional',
        images: ['sofa1.jpg', 'sofa2.jpg', 'sofa3.jpg'],
        length: 220,
        width: 90,
        height: 85,
        unit: 'cm',
        material: 'Wood & Fabric',
        color: 'Brown',
        inStock: true,
        stockQuantity: 15,
        isPopular: true,
        isFeatured: true,
        rating: 4.5,
        numberOfReviews: 23,
        estimatedDelivery: '3-5 business days',
        specifications: { weight: '80kg', assembly: 'Required', warranty: '2 years' },
        tags: ['traditional', 'wood', 'handcrafted', 'ethiopian'],
      },
      {
        nameEn: 'Modern Coffee Table',
        nameAm: 'ዘመናዊ የካፌ ጠረጴዛ',
        descriptionEn: 'Sleek modern coffee table with glass top.',
        descriptionAm: 'ስለክ ዘመናዊ የካፌ ጠረጴዛ በመስታወት ላይ።',
        price: 8500,
        currency: 'ETB',
        categoryEn: 'Table',
        categoryAm: 'ጠረጴዛ',
        subCategory: 'Modern',
        images: ['table1.jpg', 'table2.jpg'],
        length: 120,
        width: 60,
        height: 45,
        unit: 'cm',
        material: 'Glass & Metal',
        color: 'Silver',
        inStock: true,
        stockQuantity: 8,
        isPopular: true,
        isFeatured: false,
        rating: 4.2,
        numberOfReviews: 15,
        estimatedDelivery: '2-3 business days',
        specifications: { weight: '25kg', assembly: 'Not required', warranty: '1 year' },
        tags: ['modern', 'glass', 'metal', 'coffee-table'],
      },
      {
        nameEn: 'King Size Bed',
        nameAm: 'ንጉስ መጠን የሚሆን አልጋ',
        descriptionEn: 'Comfortable king size bed with storage.',
        descriptionAm: 'ምቹ ንጉስ መጠን የሚሆን አልጋ ከማከማቻ ጋር።',
        price: 35000,
        currency: 'ETB',
        categoryEn: 'Bed',
        categoryAm: 'አልጋ',
        subCategory: 'Storage Bed',
        images: ['bed1.jpg', 'bed2.jpg', 'bed3.jpg', 'bed4.jpg'],
        length: 210,
        width: 180,
        height: 110,
        unit: 'cm',
        material: 'Wood',
        color: 'Walnut',
        inStock: true,
        stockQuantity: 5,
        isPopular: false,
        isFeatured: true,
        rating: 4.8,
        numberOfReviews: 12,
        estimatedDelivery: '5-7 business days',
        specifications: { weight: '120kg', assembly: 'Required', warranty: '3 years' },
        tags: ['bed', 'king-size', 'storage', 'wood'],
      },
      {
        nameEn: 'Dining Chair Set',
        nameAm: 'የምሳ ወንበር ስብስብ',
        descriptionEn: 'Set of 4 modern dining chairs.',
        descriptionAm: '4 ዘመናዊ የምሳ ወንበሮች ስብስብ።',
        price: 12000,
        currency: 'ETB',
        categoryEn: 'Chair',
        categoryAm: 'ወንበር',
        subCategory: 'Dining',
        images: ['chair1.jpg', 'chair2.jpg'],
        length: 50,
        width: 50,
        height: 95,
        unit: 'cm',
        material: 'Wood & Fabric',
        color: 'Beige',
        inStock: true,
        stockQuantity: 20,
        isPopular: false,
        isFeatured: false,
        rating: 4.0,
        numberOfReviews: 8,
        estimatedDelivery: '2-4 business days',
        specifications: { weight: '15kg each', assembly: 'Partial', warranty: '1 year' },
        tags: ['chair', 'dining', 'set', 'modern'],
      },
    ],
  })
  console.log(`🛋️ Created ${products.count} products`)

  // Get product IDs
  const sofaProduct = await prisma.product.findFirst({ 
    where: { nameEn: 'Ethiopian Traditional Sofa' },
    select: { id: true }
  })
  const tableProduct = await prisma.product.findFirst({ 
    where: { nameEn: 'Modern Coffee Table' },
    select: { id: true }
  })
  const bedProduct = await prisma.product.findFirst({ 
    where: { nameEn: 'King Size Bed' },
    select: { id: true }
  })
  const chairProduct = await prisma.product.findFirst({ 
    where: { nameEn: 'Dining Chair Set' },
    select: { id: true }
  })

  // 4. CREATE CART ITEMS
  if (customerUser && sofaProduct && tableProduct) {
    const cartItems = await prisma.cartItem.createMany({
      data: [
        {
          userId: customerUser.id,
          productId: sofaProduct.id,
          quantity: 1,
        },
        {
          userId: customerUser.id,
          productId: tableProduct.id,
          quantity: 2,
        },
      ],
    })
    console.log(`🛒 Created ${cartItems.count} cart items`)
  }

  // 5. CREATE ORDERS
  if (customerUser && sofaProduct && tableProduct && chairProduct) {
    const order1 = await prisma.order.create({
      data: {
        userId: customerUser.id,
        orderNumber: `ORD-${Date.now()}-1`,
        totalAmount: 33500,
        currency: 'ETB',
        status: OrderStatus.PROCESSING,
        paymentMethod: 'Bank Transfer',
        paymentStatus: PaymentStatus.COMPLETED,
        shippingAddress: {
          street: 'Bole Road',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          zipCode: '1000',
          country: 'Ethiopia',
        },
        billingAddress: {
          street: 'Bole Road',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          zipCode: '1000',
          country: 'Ethiopia',
        },
        notes: 'Please deliver after 5 PM',
        items: {
          create: [
            {
              productId: sofaProduct.id,
              quantity: 1,
              price: 25000,
            },
            {
              productId: tableProduct.id,
              quantity: 1,
              price: 8500,
            },
          ],
        },
      },
    })

    const order2 = await prisma.order.create({
      data: {
        userId: customerUser.id,
        orderNumber: `ORD-${Date.now()}-2`,
        totalAmount: 12000,
        currency: 'ETB',
        status: OrderStatus.DELIVERED,
        paymentMethod: 'Credit Card',
        paymentStatus: PaymentStatus.COMPLETED,
        shippingAddress: {
          street: 'Megenagna',
          city: 'Addis Ababa',
          state: 'Addis Ababa',
          zipCode: '1001',
          country: 'Ethiopia',
        },
        deliveredAt: new Date('2024-12-20'),
        items: {
          create: [
            {
              productId: chairProduct.id,
              quantity: 1,
              price: 12000,
            },
          ],
        },
      },
    })
    console.log(`📦 Created 2 orders`)
  }

  // 6. CREATE BLOG POSTS
  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        titleEn: 'The Art of Ethiopian Furniture Design',
        titleAm: 'የኢትዮጵያ የእቃ አቀናባሪ ዲዛይን ስነ ጥበብ',
        excerptEn: 'Explore the rich history and craftsmanship of Ethiopian furniture making.',
        excerptAm: 'የኢትዮጵያ የእቃ አቀናባሪ ስራ ሀብታም ታሪክ እና የጥበብ ሙያ ያስሱ።',
        contentEn: 'Full article content here... Ethiopian furniture design has a rich history dating back centuries...',
        contentAm: 'ሙሉ የጽሁፍ ይዘት እዚህ ላይ... የኢትዮጵያ የእቃ አቀናባሪ ዲዛይን ምዕተ ዓመታት የሚወስድ ሀብታም ታሪክ አለው...',
        author: 'Selamawit Mekonnen',
        authorRoleEn: 'Design Expert',
        authorRoleAm: 'የዲዛይን ሙያተኛ',
        readTime: 5,
        category: BlogCategory.DESIGN,
        tags: ['design', 'tradition', 'craftsmanship'],
        imageUrl: 'blog1.jpg',
        likes: 45,
        comments: 12,
        shares: 8,
        views: 230,
        featured: true,
        status: PostStatus.PUBLISHED,
        slug: 'art-of-ethiopian-furniture-design',
        metaDescriptionEn: 'Learn about Ethiopian furniture design traditions',
        metaDescriptionAm: 'ስለ ኢትዮጵያ የእቃ አቀናባሪ ዲዛይን ባህሎች ይማሩ',
        metaKeywords: ['ethiopian', 'furniture', 'design', 'traditional'],
      },
      {
        titleEn: 'Sustainable Wood Sourcing',
        titleAm: 'ተጠቃሚ የእንጨት ምንጭ',
        excerptEn: 'How we ensure sustainable and ethical wood sourcing for our furniture.',
        excerptAm: 'ለእቃችን ተጠቃሚ እና ሥነ ᝌግባራዊ የእንጨት ምንጭ እንዴት እንደምናረጋግጥ።',
        contentEn: 'Full article content here... Sustainability is at the core of our values...',
        contentAm: 'ሙሉ የጽሁፍ ይዘት እዚህ ላይ... ተጠቃሚነት በእሴቶቻችን ማዕከል ላይ ነው...',
        author: 'Kaleb Assefa',
        authorRoleEn: 'Sustainability Manager',
        authorRoleAm: 'የተጠቃሚነት አስተዳዳሪ',
        readTime: 7,
        category: BlogCategory.SUSTAINABILITY,
        tags: ['sustainability', 'eco-friendly', 'wood'],
        imageUrl: 'blog2.jpg',
        likes: 32,
        comments: 8,
        shares: 15,
        views: 180,
        featured: false,
        status: PostStatus.PUBLISHED,
        slug: 'sustainable-wood-sourcing',
        metaDescriptionEn: 'Our commitment to sustainable wood sourcing practices',
        metaDescriptionAm: 'ለተጠቃሚ የእንጨት ምንጭ ልምዶች ያለን ቁርጠኝነት',
        metaKeywords: ['sustainable', 'wood', 'eco-friendly', 'ethiopia'],
      },
    ],
  })
  console.log(`📝 Created ${blogPosts.count} blog posts`)

  // 7. CREATE CONTACT SUBMISSIONS
  const contacts = await prisma.contactSubmission.createMany({
    data: [
      {
        name: 'Alemayehu Bekele',
        email: 'alemayehu@example.com',
        phone: '+251944444444',
        subject: 'Custom Order Inquiry',
        message: 'I would like to order a custom dining table for 8 people.',
        department: ContactDepartment.CUSTOM,
        contactMethod: ContactMethod.WHATSAPP,
        status: ContactStatus.NEW,
        source: 'website',
      },
      {
        name: 'Meron Tesfaye',
        email: 'meron@example.com',
        phone: '+251955555555',
        subject: 'Showroom Visit',
        message: 'I want to visit your showroom this weekend.',
        department: ContactDepartment.SHOWROOM,
        contactMethod: ContactMethod.PHONE,
        status: ContactStatus.IN_PROGRESS,
        assignedTo: 'Staff Member',
        source: 'website',
      },
      {
        name: 'Teklu Wolde',
        email: 'teklu@example.com',
        phone: '+251966666666',
        subject: 'Product Support',
        message: 'I need help assembling my recently purchased bed.',
        department: ContactDepartment.SUPPORT,
        contactMethod: ContactMethod.EMAIL,
        status: ContactStatus.RESOLVED,
        assignedTo: 'Support Team',
        notes: 'Customer was guided through phone',
        source: 'website',
      },
    ],
  })
  console.log(`📞 Created ${contacts.count} contact submissions`)

  // 8. CREATE CUSTOM ORDERS
  if (staffUser && staffUser.name) {
    const customOrder = await prisma.customOrder.create({
      data: {
        customerName: 'Daniel Girma',
        customerEmail: 'daniel@gmail.com',
        customerPhone: '+251921314151',
        category: CustomOrderCategory.SOFA,
        length: 240,
        width: 100,
        height: 90,
        unit: 'cm',
        material: 'Leather',
        color: 'Black',
        budget: 45000,
        timeline: CustomOrderTimeline.SIX_TO_EIGHT_WEEKS,
        additionalNotes: 'Need L-shaped configuration',
        designReferences: ['ref1.jpg', 'ref2.jpg'],
        status: CustomOrderStatus.DESIGN,
        assignedTo: staffUser.name,
        quoteAmount: 48000,
        communicationHistory: {
          create: [
            {
              type: CommunicationType.EMAIL,
              summary: 'Initial inquiry received',
              details: 'Customer sent design references',
            },
            {
              type: CommunicationType.MEETING,
              summary: 'Design consultation',
              details: 'Discussed materials and dimensions',
            },
          ],
        },
      },
    })
    console.log(`🎨 Created custom order for ${customOrder.customerName}`)
  }

  // 9. CREATE SHOWROOM BOOKINGS
  const bookings = await prisma.showroomBooking.createMany({
    data: [
      {
        visitorName: 'Sara yohannis',
        visitorEmail: 'sarah@gmail.com',
        visitorPhone: '+251912131415',
        bookingDate: new Date('2024-12-30'),
        bookingTime: '14:00',
        numberOfGuests: 3,
        specialRequirements: 'Wheelchair accessible',
        visitType: VisitType.PRIVATE_TOUR,
        status: BookingStatus.CONFIRMED,
        confirmedBy: 'Admin User',
        confirmationDate: new Date('2024-12-25'),
      },
      {
        visitorName: 'Michael Cohen',
        visitorEmail: 'michael@example.com',
        visitorPhone: '+251999999999',
        bookingDate: new Date('2024-12-28'),
        bookingTime: '10:00',
        numberOfGuests: 2,
        visitType: VisitType.BUSINESS_VISIT,
        status: BookingStatus.PENDING,
        source: 'phone',
      },
    ],
  })
  console.log(`📅 Created ${bookings.count} showroom bookings`)

  console.log('\n✅ Seed completed successfully! All tables populated.')
  console.log('\n📋 Login Credentials:')
  console.log('   Admin: admin@emufurniture.com / password123')
  console.log('   Staff: staff@emufurniture.com / password123')
  console.log('   Customer: customer@example.com / password123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })