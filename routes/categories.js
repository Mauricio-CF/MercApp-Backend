// routes/categories.js
import express from 'express'
import Category from '../models/Category.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const cats = await Category.find().lean()
  res.json(cats)
})

router.post('/', async (req, res) => {
  try {
    const c = new Category({ name: req.body.name })
    await c.save()
    res.status(201).json(c)
  } catch (err) { res.status(400).json({ error: err.message }) }
})

export default router
