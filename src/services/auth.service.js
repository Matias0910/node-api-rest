// src/services/auth.service.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Simulamos un usuario para login (en un proyecto real, se consultaría la BD)
const USERS = [{ 
  username: 'techlab', 
  password: 'password123' 
}];

export const loginService = (username, password) => {
  const user = USERS.find(u => u.username === username && u.password === password);

  if (!user) {
    throw new Error('Credenciales inválidas'); // El controlador lo convierte a 401
  }

  // Crear el token con el payload (username), el secreto y la expiración
  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } 
  );
  
  return token;
};