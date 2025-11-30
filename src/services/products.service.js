// src/services/products.service.js
import * as productModel from '../models/products.model.js';

// Cache en memoria simple por combinacion de pageSize/startAfterId
const cache = new Map();
const DEFAULT_TTL = 10000; // ms

const makeCacheKey = (opts) => JSON.stringify({ pageSize: opts?.pageSize || 20, startAfterId: opts?.startAfterId || null });

export const getProductsService = async (opts = {}) => {
  const key = makeCacheKey(opts);
  const now = Date.now();
  const cached = cache.get(key);
  if (cached && (now - cached.ts) < (cached.ttl ?? DEFAULT_TTL)) {
    return cached.result;
  }

  const result = await productModel.getAllProductsModel(opts);
  cache.set(key, { result, ts: now, ttl: DEFAULT_TTL });
  return result;
};

export const getProductService = async (id) => {
  return await productModel.getProductByIdModel(id);
};

export const createProductService = async (productData) => {
  return await productModel.createProductModel(productData);
};

export const deleteProductService = async (id) => {
  return await productModel.deleteProductModel(id);
};

// FUNCIÓN PARA PATCH (ACTUALIZACIÓN PARCIAL)
export const updateProductService = async (id, data) => {
  return await productModel.updateProductModel(id, data);
};

// FUNCIÓN PARA PUT (REEMPLAZO TOTAL)
export const replaceProductService = async (id, productData) => {
  if (!productData.nombre || !productData.precio || productData.stock === undefined) {
    throw new Error('Datos de producto incompletos para reemplazo total (PUT). Se requieren nombre, precio y stock.');
  }
  return await productModel.replaceProductModel(id, productData);
};