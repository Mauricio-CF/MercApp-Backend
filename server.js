// server.js — servidor principal (ESM)
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './db.js'         // conecta a MongoDB
import productsRouter from './routes/products.js'
import categoriesRouter from './routes/categories.js'

const app = express()
app.use(cors({
  origin: process.env.FRONTEND_URL || '*' // en producción pon URL de Netlify
}))
app.use(express.json())

// Health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }))

// Conectar DB y luego levantar servidor
const PORT = process.env.PORT || 3000

connectDB()
  .then(() => {
    // Rutas después de conectar DB
    app.use('/api/products', productsRouter)
    app.use('/api/categories', categoriesRouter)

    app.use((req, res) => res.status(404).json({ error: 'Not found' }))

    app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('No se pudo iniciar servidor por error en DB:', err)
  })
