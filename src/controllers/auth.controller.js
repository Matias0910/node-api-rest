// src/controllers/auth.controller.js
import * as authService from '../services/auth.service.js';

export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan credenciales (usuario/contraseña)', status: 400 });
  }

  try {
    const token = authService.loginService(username, password);
    // 200 OK con el Bearer Token
    res.status(200).json({ token: token, type: 'Bearer', expiresIn: '1h' });
  } catch (error) {
    // El servicio lanza un error si las credenciales son inválidas
    res.status(401).json({ message: 'Error de autenticación: Credenciales inválidas.', status: 401 });
  }
};