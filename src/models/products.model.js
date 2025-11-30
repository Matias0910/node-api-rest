// src/models/products.model.js
import { collection, getDocs, getDoc, doc, addDoc, deleteDoc, updateDoc, setDoc, query, orderBy, limit, startAfter } from 'firebase/firestore';
import db from '../../firebase.js';

const productsCol = collection(db, 'productos'); 

export const getAllProductsModel = async ({ pageSize = 20, startAfterId = null } = {}) => {
  // Construye la query con paginación. Por default devuelve la primera página.
  let q;

  if (startAfterId) {
    // Obtener snapshot del documento a partir del cual empezar (cursor)
    const lastDocSnapshot = await getDoc(doc(db, 'productos', startAfterId));
    if (!lastDocSnapshot.exists()) {
      return { products: [], lastId: null };
    }
    q = query(productsCol, orderBy('nombre'), startAfter(lastDocSnapshot), limit(pageSize));
  } else {
    q = query(productsCol, orderBy('nombre'), limit(pageSize));
  }

  const productSnapshot = await getDocs(q);
  const productList = productSnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  const lastVisible = productSnapshot.docs[productSnapshot.docs.length - 1];
  return { products: productList, lastId: lastVisible ? lastVisible.id : null };
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

// FUNCIÓN PARA PATCH (ACTUALIZACIÓN PARCIAL)
export const updateProductModel = async (id, data) => {
  const productDoc = doc(db, 'productos', id);
  // updateDoc solo actualiza los campos proporcionados
  await updateDoc(productDoc, data); 
  return { id, ...data }; 
};

// FUNCIÓN PARA PUT (REEMPLAZO TOTAL)
export const replaceProductModel = async (id, data) => {
  const productDoc = doc(db, 'productos', id);
  // setDoc reemplaza el documento completamente. Si faltan campos en 'data', se eliminan de Firestore.
  await setDoc(productDoc, data);
  return { id, ...data }; 
};

export const deleteProductModel = async (id) => {
  const productDoc = doc(db, 'productos', id);
  await deleteDoc(productDoc);
  return { message: `Producto con ID ${id} eliminado.` };
};