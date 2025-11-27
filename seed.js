// seed.js — poblar MongoDB con categorías y productos de ejemplo
import { connectDB } from './db.js'
import Category from './models/Category.js'
import Product from './models/Product.js'

await connectDB()

async function seed() {
  // limpiar colecciones (opcional)
  await Product.deleteMany({})
  await Category.deleteMany({})

  // crear categorías
  const categorias = [
    { name: 'Granos' },
    { name: 'Lácteos' },
    { name: 'Bebidas' },
    { name: 'Snacks' },
    { name: 'Verduras' }
  ]

  const createdCats = await Category.insertMany(categorias)

  // productos ejemplo (uno por categoría)
  const productos = [
    {
      name: 'Arroz',
      description: 'Arroz Premium 1kg',
      price: 12.5,
      stock: 50,
      categoryId: createdCats[0]._id,
      image: 'https://www.supermaxi.com/wp-content/uploads/2025/07/7861007200120-1-4.jpg.webp'
    },
    {
      name: 'Leche Entera',
      description: 'Leche entera pasteurizada 1L',
      price: 1.25,
      stock: 30,
      categoryId: createdCats[1]._id,
      image: 'https://www.supermaxi.com/wp-content/uploads/2024/08/7861012510511-1-4.jpg'
    
    },
    {
      name: 'Jugo de Naranja',
      description: 'Jugo natural 1L',
      price: 2.0,
      stock: 20,
      categoryId: createdCats[2]._id,
      image: 'https://www.fybeca.com/on/demandware.static/-/Sites-masterCatalog_FybecaEcuador/default/dw154d28bf/images/large/17029_1.jpg'
    },
    {
      name: 'Galletas ChocoMax',
      description: 'Galletas con chispas de chocolate para toda ocasión',
      price: 1.5,
      stock: 60,
      categoryId: createdCats[3]._id,
      image: 'https://alsuper.online/products/391232.png'
    },
    {
      name: 'Tomate',
      description: 'Tomate fresco por kg',
      price: 1.8,
      stock: 40,
      categoryId: createdCats[4]._id,
      image: 'https://www.organiclife.ec/wp-content/uploads/2015/02/tomate.png'
    }
  ]

  // convertir categoryId a field category esperado por model
  for (const p of productos) {
    const prod = new Product({
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.categoryId,
      image: p.image
    })
    await prod.save()
  }

  console.log('Seed completado')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
