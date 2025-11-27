// routes/products.js
import express from 'express'
import Product from '../models/Product.js'
const router = express.Router()

// GET /api/products  - lista
router.get('/', async (req, res) => {
  try {
    const { q, category } = req.query
    const filter = {}
    if (q) filter.$or = [
      { name: new RegExp(q, 'i') },
      { description: new RegExp(q, 'i') }
    ]
    if (category) filter.category = category

    const products = await Product.find(filter).populate('category', 'name').lean()
    res.json(products)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/products/:id  - detalle (poblado con categoría)
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('category', 'name')
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(p)
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST crear
router.post('/', async (req, res) => {
  try {
    // req.body debe contener: name, description, price, stock, category (id), image
    const p = new Product({
      name: req.body.name,
      description: req.body.description || '',
      price: Number(req.body.price),
      stock: Number(req.body.stock || 0),
      category: req.body.categoryId, // frontend envía categoryId
      image: req.body.image || ''
    })
    await p.save()
    const populated = await p.populate('category', 'name')
    res.status(201).json(populated)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// PUT actualizar
router.put('/:id', async (req, res) => {
  try {
    const data = { ...req.body }
    if (data.price) data.price = Number(data.price)
    if (data.stock) data.stock = Number(data.stock)
    const p = await Product.findByIdAndUpdate(req.params.id, {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.categoryId,
      image: data.image
    }, { new: true }).populate('category', 'name')
    if (!p) return res.status(404).json({ error: 'No encontrado' })
    res.json(p)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ ok: true })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

export default router
