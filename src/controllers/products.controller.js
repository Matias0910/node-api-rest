// src/controllers/products.controller.js
import * as productService from '../services/products.service.js';

export const getProducts = async (req, res) => {
  try {
    const products = await productService.getProductsService();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error (500) al obtener productos.', error: error.message, status: 500 });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productService.getProductService(id);
    res.status(200).json(product);
  } catch (error) {
    if (error.message === 'Producto no encontrado') {
      return res.status(404).json({ message: error.message, status: 404 });
    }
    res.status(500).json({ message: 'Error (500) al obtener el producto.', error: error.message, status: 500 });
  }
};

export const createProduct = async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = await productService.createProductService(productData);
    res.status(201).json(newProduct); // 201 Created
  } catch (error) {
    if (error.message.includes('incompletos')) {
      return res.status(400).json({ message: error.message, status: 400 }); // 400 Bad Request
    }
    res.status(500).json({ message: 'Error (500) al crear el producto.', error: error.message, status: 500 });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productService.deleteProductService(id);
    res.status(204).send(); // 204 No Content (Éxito sin cuerpo de respuesta)
  } catch (error) {
    res.status(500).json({ message: 'Error (500) al eliminar el producto.', error: error.message, status: 500 });
  }
};