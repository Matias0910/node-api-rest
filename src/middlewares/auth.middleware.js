// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Acceso denegado. Se requiere Bearer token.', 
      status: 401 
    });
  }

  const token = authHeader.split(' ')[1]; 
  
  try {
    // Verificar el token usando el secreto del .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded; // Adjuntar información de usuario al request
    
    next();
  } catch (error) {
    // 403 Forbidden: Token inválido, expirado, etc.
    return res.status(403).json({ 
      message: 'Token inválido o expirado.', 
      status: 403 
    });
  }
};

export default authMiddleware;