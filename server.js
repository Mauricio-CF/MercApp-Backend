// server.js — servidor principal (ESM)
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Cargar dotenv SOLO en desarrollo
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

import { connectDB } from './db.js';
import productsRouter from './routes/products.js';
import categoriesRouter from './routes/categories.js';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));

app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.use('/api/products', productsRouter);
    app.use('/api/categories', categoriesRouter);

    app.use((req, res) => res.status(404).json({ error: 'Not found' }));

    app.listen(PORT, () => console.log(`API escuchando en el puerto ${PORT}`));
  })
  .catch(err => {
    console.error('No se pudo iniciar servidor por error en DB:', err);
  });
