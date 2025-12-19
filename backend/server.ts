 import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Emu Furniture API is running',
    timestamp: new Date().toISOString()
  });
});

// Sample products route
app.get('/api/products', (req, res) => {
  const products = [
    {
      id: 1,
      name: "Traditional Coffee Table",
      price: 8500,
      currency: "ETB",
      category: "Living Room"
    },
    {
      id: 2,
      name: "Modern Sofa Set",
      price: 45000,
      currency: "ETB",
      category: "Living Room"
    }
  ];
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
