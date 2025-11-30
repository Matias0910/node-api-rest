// src/controllers/products.controller.js
import * as productService from '../services/products.service.js';

// GET /api/products?pagesize=20&startAfterId=<id>
export const getProducts = async (req, res) => {
  const t0 = Date.now();
  const pageSize = parseInt(req.query.pageSize) || 20;
  const startAfterId = req.query.startAfterId || null;
  try {
    const result = await productService.getProductsService({ pageSize, startAfterId });
    const elapsed = Date.now() - t0;
    return res.json({ products: result.products, lastId: result.lastId, performanceMs: elapsed });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos.', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductService(id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado', status: 404 });
    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener el producto.', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productService.createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message.includes('incompletos')) {
      return res.status(400).json({ message: error.message, status: 400 }); 
    }
    res.status(500).json({ message: 'Error al crear el producto.', error: error.message, status: 500 });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await productService.deleteProductService(id);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar el producto.', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const updated = await productService.updateProductService(id, data);
    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar el producto.', error: error.message });
  }
};

export const replaceProduct = async (req, res) => {
  const { id } = req.params;
  const productData = req.body;
  try {
    const replaced = await productService.replaceProductService(id, productData);
    return res.json(replaced);
  } catch (error) {
    if (error.message.includes('incompletos')) {
      return res.status(400).json({ message: error.message, status: 400 });
    }
    return res.status(500).json({ message: 'Error al reemplazar el producto.', error: error.message });
  }
};