🪑 Emu Furniture - Ethiopian Furniture E-commerce Platform
https://img.shields.io/badge/Emu-Furniture-amber
https://img.shields.io/badge/Next.js-14-black
https://img.shields.io/badge/TypeScript-5-blue
https://img.shields.io/badge/Tailwind-3-blue
https://img.shields.io/badge/PostgreSQL-15-blue
https://img.shields.io/badge/License-MIT-green

A modern, full-stack furniture e-commerce platform built specifically for the Ethiopian market. Emu Furniture addresses local business challenges with innovative solutions for limited online payment infrastructure.

✨ Key Features
🌍 Ethiopian Market Focus
Bilingual Interface: Full Amharic/English language support

Local Payment Solutions: WhatsApp-based ordering, cash-on-delivery, bank transfer workflows

Delivery Zone Management: Addis Ababa area-specific delivery

Custom Orders: Bespoke furniture design requests

Traditional + Modern: Blends Ethiopian craftsmanship with contemporary design

🛒 E-commerce Capabilities
Advanced Product Filtering: By category, price, material, delivery zone

Multiple View Modes: Grid and list views

WhatsApp Integration: Direct product reservation via WhatsApp

Real-time Search: Instant product search

Stock Management: In-stock vs. custom order tracking

Responsive Design: Mobile-first approach

🛠️ Technical Highlights
Full Stack TypeScript: Type-safe frontend and backend

Modern Architecture: Next.js 14 App Router + Express.js API

Database Ready: PostgreSQL with Prisma ORM

Optimized Performance: Image optimization, code splitting

Developer Friendly: Comprehensive documentation, CI/CD ready

📸 Screenshots
Homepage	Shop Page	Product Details
https://via.placeholder.com/400x250/8B4513/FFFFFF?text=Emu+Furniture+Home	https://via.placeholder.com/400x250/D4AF37/000000?text=Shop+with+Filters	https://via.placeholder.com/400x250/228B22/FFFFFF?text=Product+Details
🏗️ Architecture
text
emu-furniture/
├── app/                    # Next.js 14 App Router
│   ├── shop/              # Shop page with filtering
│   ├── custom-orders/     # Custom furniture requests
│   ├── showroom/          # Showroom information
│   ├── blog/              # Content marketing
│   └── contact/           # Contact information
├── components/            # Reusable React components
│   ├── shop/              # Shop-specific components
│   │   ├── ProductCard.tsx
│   │   └── FilterSidebar.tsx
│   ├── layout/            # Layout components
│   └── shared/            # Shared UI components
├── backend/               # Express.js API server
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── routes/            # API routes
│   └── server.ts          # Main server file
├── lib/                   # Shared utilities
│   ├── database/          # Database configuration
│   └── utils/             # Helper functions
├── prisma/               # Database schema & migrations
├── public/               # Static assets
└── scripts/              # Database seeding & utilities
🚀 Quick Start
Prerequisites
Node.js 18+

PostgreSQL 14+ (or use Docker)

npm or yarn

Installation
Clone the repository

bash
git clone https://github.com/yourusername/emu-furniture.git
cd emu-furniture
Install dependencies

bash
npm install
cd backend && npm install && cd ..
Set up environment variables

bash
cp .env.example .env.local
# Edit .env.local with your configuration
Set up PostgreSQL database

bash
# Using Docker (recommended)
docker run --name emu-furniture-db -e POSTGRES_PASSWORD=password -e POSTGRES_DB=emu_furniture -p 5432:5432 -d postgres:15

# Or install locally and run
# Ubuntu/Debian: sudo apt-get install postgresql postgresql-contrib
# macOS: brew install postgresql
Run database migrations

bash
npx prisma generate
npx prisma db push
# Or for production: npx prisma migrate dev --name init
Seed the database (optional)

bash
npx ts-node scripts/seed.ts
Start development servers

bash
# Run both frontend and backend concurrently
npm run dev:full

# Or run separately:
# Terminal 1: npm run dev:backend
# Terminal 2: npm run dev:frontend
Open in browser

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Prisma Studio: http://localhost:5555 (database GUI)

📱 Development
Available Scripts
bash
# Development
npm run dev:full          # Run frontend and backend together
npm run dev:frontend     # Run Next.js frontend only
npm run dev:backend      # Run Express backend only

# Production
npm run build            # Build Next.js application
npm start               # Start production server

# Database
npm run db:studio       # Open Prisma Studio GUI
npm run db:seed         # Seed database with sample data

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # TypeScript type checking
Project Structure Details
Frontend (Next.js 14)
App Router: Modern file-based routing

Server Components: Optimized performance

Client Components: Interactive features

Tailwind CSS: Utility-first styling

Lucide React: Icon library

Backend (Express.js)
TypeScript: Full type safety

REST API: Clean, organized endpoints

PostgreSQL: Robust database

Prisma ORM: Type-safe database queries

Modular Structure: Controllers, routes, middleware

Database Schema
Key models include:

Products: Furniture items with bilingual descriptions

Categories: Product classification

Orders: Customer orders with Ethiopian payment methods

Users: Customers and administrators

BlogPosts: Content marketing articles

🌐 API Reference
Products
http
GET    /api/products       # List products with filters
GET    /api/products/:id   # Get single product
POST   /api/products       # Create product (admin)
PUT    /api/products/:id   # Update product (admin)
DELETE /api/products/:id   # Delete product (admin)
Orders
http
POST   /api/orders         # Create new order
GET    /api/orders/:id     # Get order status
PUT    /api/orders/:id     # Update order status
Categories
http
GET    /api/categories     # List all categories
GET    /api/categories/:id # Get category with products
🎯 Ethiopian Market Solutions
