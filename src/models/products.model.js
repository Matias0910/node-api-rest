// src/models/products.model.js
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import db from '../../firebase.js'; // Ajuste de ruta: Retrocede para acceder a firebase.js

const productsCol = collection(db, 'productos'); // Asume que la colección se llama 'productos'

export const getAllProductsModel = async () => {
  const productSnapshot = await getDocs(productsCol);
  const productList = productSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return productList;
};

export const getProductByIdModel = async (id) => {
  const productDoc = doc(db, 'productos', id);
  const productSnapshot = await getDoc(productDoc);
  if (!productSnapshot.exists()) {
    return null; 
  }
  return { id: productSnapshot.id, ...productSnapshot.data() };
};

export const createProductModel = async (productData) => {
  const newProductRef = await addDoc(productsCol, productData);
  return { id: newProductRef.id, ...productData };
};

export const deleteProductModel = async (id) => {
  const productDoc = doc(db, 'productos', id);
  await deleteDoc(productDoc);
  return { message: `Producto con ID ${id} eliminado.` };
};