// src/routes/products.routes.js
import { Router } from 'express';
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct, replaceProduct } from '../controllers/products.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas de Productos (TODAS PROTEGIDAS)
// Aplicar el middleware de autenticación a todas las rutas definidas a continuación
router.use(authMiddleware); 

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// POST /api/products/create
router.post('/create', createProduct); 

// DELETE /api/products/:id
router.delete('/:id', deleteProduct);

// PATCH /api/products/:id
router.patch('/:id', updateProduct);

// PUT /api/products/:id
router.put('/:id', replaceProduct);

export default router;