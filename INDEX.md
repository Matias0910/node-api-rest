# node-api-rest

<!-- markdownlint-disable MD013 MD033 -->

> REST API profesional para gestión de productos con paginación, caché y autenticación JWT

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Express](https://img.shields.io/badge/Express.js-5.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-orange)
![License](https://img.shields.io/badge/License-ISC-yellow)

## ¿Qué incluye?

✅ API REST completa para productos  
✅ Autenticación JWT  
✅ Paginación inteligente  
✅ Caché en memoria  
✅ CRUD 100% funcional  
✅ Documentación exhaustiva  
✅ Listo para producción  

## 📦 Instalación Rápida

```bash
# Clonar
git clone https://github.com/Matias0910/node-api-rest.git
cd node-rest-api

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales Firebase

# Ejecutar
npm start
```

Servidor en `http://localhost:3000`

## 🔑 Login & Token

```bash
# Obtener token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"techlab","password":"password123"}'

# Guardar token
export TOKEN="eyJhbGciOiJIUzI1NiIs..."
```

## 📚 Endpoints Principales

### GET - Productos (Paginado)
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products?pageSize=10"
```

Respuesta:
```json
{
  "products": [...],
  "lastId": "abc123",
  "performanceMs": 245
}
```

### POST - Crear Producto
```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Laptop",
    "precio":999.99,
    "stock":5,
    "descripcion":"Gaming laptop",
    "activo":true,
    "sku":"LAPTOP-001"
  }' http://localhost:3000/api/products/create
```

### PATCH - Actualizar
```bash
curl -X PATCH -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"precio":899.99}' \
  http://localhost:3000/api/products/:id
```

### DELETE - Eliminar
```bash
curl -X DELETE -H "Authorization: Bearer $TOKEN" \
  http://localhost:3000/api/products/:id
```

## 📖 Documentación Completa

- 📄 [README.md](./README.md) - Documentación detallada con ejemplos
- 🚀 [QUICKSTART.md](./QUICKSTART.md) - Guía de inicio rápido

## 🎯 Optimizaciones

| Aspecto | Antes | Después | Mejora |
|---------|-------|---------|--------|
| **Latencia GET todos** | O(n) | O(pageSize) | 80-95% ⬇️ |
| **Datos transferidos** | 100% docs | pageSize docs | 80-95% ⬇️ |
| **Costo Firestore** | Alto | Bajo | 80-95% ⬇️ |
| **Caché** | ❌ | ✅ TTL 10s | 🚀 Rápido |

## 🛠️ Tech Stack

- **Backend**: Express.js (Node.js)
- **Database**: Firebase Firestore
- **Auth**: JWT (jsonwebtoken)
- **CORS**: Habilitado

## ✅ Testing

Todos los endpoints testeados y funcionando:
- ✅ Login (obtener JWT)
- ✅ GET paginado
- ✅ GET por ID
- ✅ POST crear
- ✅ PATCH actualizar
- ✅ PUT reemplazar
- ✅ DELETE eliminar

## 🚀 Despliegue

Listo para desplegar en:
- Heroku
- Firebase Hosting
- AWS Lambda
- Render
- Railway
- Vercel (serverless)

## 📋 Requisitos

- Node.js >= 16
- npm >= 8
- Firebase Project (Firestore)
- Variables de entorno (.env)

## 📝 Commits Recientes

```
61a0cb9 - feat: implementar paginacion, cache y optimizaciones de rendimiento
effbf37 - feat(data): agregar datos iniciales de productos
95e3fc0 - feat(products): creacion de rutas, controladores y servicios
459f1e3 - feat(auth): implementacion de jwt para login y middleware
```

## 👨‍💻 Autor

**Salazar Matías**
- GitHub: [@Matias0910](https://github.com/Matias0910)

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios mayores:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**⭐ Si te fue útil, no olvides hacer star al proyecto! ⭐**  
[Documentación Completa](./README.md) • [Quick Start](./QUICKSTART.md)
