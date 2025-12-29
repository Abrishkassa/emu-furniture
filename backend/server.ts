import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = 5000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Emu Furniture API is running',
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// Import your actual products route
// In server.ts - change the import
const productRoutes = require('./routes/products').default || require('./routes/products');

// Use the actual products route instead of hardcoded one
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📦 Products API available at http://localhost:${PORT}/api/products`);
});