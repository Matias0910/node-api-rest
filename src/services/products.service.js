// src/services/products.service.js
import * as productModel from '../models/products.model.js';

export const getProductsService = async () => {
  return await productModel.getAllProductsModel();
};

export const getProductService = async (id) => {
  const product = await productModel.getProductByIdModel(id);
  if (!product) {
    throw new Error('Producto no encontrado'); 
  }
  return product;
};

export const createProductService = async (productData) => {
  // Validación básica del Requerimiento: Si faltan campos esenciales.
  if (!productData.nombre || !productData.precio) {
    throw new Error('Datos de producto incompletos. Se requiere nombre y precio.');
  }
  return await productModel.createProductModel(productData);
};

export const deleteProductService = async (id) => {
    return await productModel.deleteProductModel(id);
};