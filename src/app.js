import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Importar rutas
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middleware Globales
app.use(cors());
app.use(express.json());

// Enrutamiento
app.use('/auth', authRoutes);
app.use('/api/products', productsRoutes);

// 404
app.use((req, res, next) => {
  res.status(404).json({
    message: `Error 404: Ruta no encontrada: ${req.method} ${req.originalUrl}`,
    status: 404
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({
    message: 'Error interno del servidor (500).',
    status: err.status || 500,
    error: err.message
  });
});

export default app;
