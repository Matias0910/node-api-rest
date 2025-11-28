// index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 

// Importar rutas (Ajuste de ruta a la carpeta src)
import productsRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Globales
app.use(cors()); 
app.use(express.json()); // body-parser para JSON

// === Enrutamiento ===
// Rutas de autenticación
app.use('/auth', authRoutes); 
// Rutas de productos (prefix /api/products)
app.use('/api/products', productsRoutes); 

// === Manejo de Errores ===

// 1. Middleware 404 para rutas desconocidas
app.use((req, res, next) => {
  // Si la solicitud llega aquí, ninguna ruta la ha manejado
  res.status(404).json({
    message: `Error 404: Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    status: 404
  });
});

// 2. Middleware de manejo de errores general (500)
app.use((err, req, res, next) => {
  console.error(err.stack); // Muestra el error en la consola del servidor
  // Solo devolvemos 500 si no se ha definido un status code antes
  if (res.headersSent) {
    return next(err); 
  }
  res.status(err.status || 500).json({
    message: 'Error interno del servidor (500).',
    status: err.status || 500,
    error: err.message
  });
});


// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express.js corriendo en el puerto ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});