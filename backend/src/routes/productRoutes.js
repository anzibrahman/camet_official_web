// src/routes/productRoutes.js
import express from 'express'
import {
  getAllProducts,
  getProductBySlug,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js'

const router = express.Router()

// Public routes
router.get('/products', getAllProducts)
router.get('/products/:slug', getProductBySlug)

// Admin routes
router.get('/admin/products', getAllProductsAdmin)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router