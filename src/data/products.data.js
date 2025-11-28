// src/data/products.data.js

const initialProducts = [
  // 1. El producto que creaste manualmente (Asegúrate de que los campos coincidan con tu base de datos)
  {
    nombre: "Tablet Pro X",
    precio: 899.99,
    stock: 25,
    descripcion: "Tablet de última generación con 128GB, ideal para diseño.",
    activo: true,
    sku: "TAB-PR-001"
  },
  
  // 2. Nuevo Producto
  {
    nombre: "Auriculares Inalámbricos Q-Sound",
    precio: 79.50,
    stock: 200,
    descripcion: "Cancelación de ruido activa y 24 horas de batería.",
    activo: true,
    sku: "AUD-Q-100"
  },
  
  // 3. Nuevo Producto
  {
    nombre: "Cámara Web Full HD StellarCam",
    precio: 45.00,
    stock: 50,
    descripcion: "Ideal para streaming y videollamadas, con micrófono integrado.",
    activo: true,
    sku: "CAM-ST-FHD"
  },
  
  // 4. Nuevo Producto
  {
    nombre: "Teclado Mecánico RGB",
    precio: 120.99,
    stock: 80,
    descripcion: "Switches táctiles rápidos, retroiluminación RGB personalizable.",
    activo: true,
    sku: "TEC-ME-RGB"
  },
  
  // 5. Nuevo Producto
  {
    nombre: "Disco Duro Externo 2TB",
    precio: 95.00,
    stock: 150,
    descripcion: "Almacenamiento portátil de alta velocidad con interfaz USB 3.0.",
    activo: true,
    sku: "HDD-EX-2T"
  },
  
  // 6. Nuevo Producto (Inactivo para prueba)
  {
    nombre: "Smartwatch Deportivo X9",
    precio: 180.00,
    stock: 0,
    descripcion: "Monitor de ritmo cardíaco y GPS. Producto agotado.",
    activo: false,
    sku: "SW-DEP-X9"
  }
];

export default initialProducts;