# REST API - Node.js + Express + Firebase

<!-- markdownlint-disable MD013 MD033 -->

Una API REST moderna y optimizada para gestión de productos, construida con Node.js, Express y Firestore. Incluye autenticación con JWT, paginación automática, caché en memoria y un CRUD completo.

## 🚀 Características

- **Autenticación JWT**: Protección de endpoints con tokens Bearer.
- **Paginación inteligente**: Consultas paginadas a Firestore para mejor rendimiento.
- **Caché en memoria**: Reduce latencia en consultas frecuentes con TTL configurable.
- **CRUD Completo**: Create, Read (paginado), Update (PATCH/PUT), Delete.
- **Middleware de validación**: Autenticación integrada en todas las rutas.
- **Manejo de errores**: Respuestas JSON consistentes con códigos HTTP apropiados.
- **Optimizado para Firestore**: Usa queries eficientes (`query`, `orderBy`, `limit`, `startAfter`).

## 📋 Requisitos Previos

- **Node.js** >= 16.x
- **npm** >= 8.x
- **Firebase Project** (Firestore habilitado)
- **Variables de entorno** configuradas (`.env`)

## 🔧 Instalación

### 1. Clonar repositorio
```bash
git clone https://github.com/Matias0910/node-api-rest.git
cd node-api-rest
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```env
# Firebase Configuration
FIREBASE_API_KEY=tu_api_key
FIREBASE_AUTH_DOMAIN=tu_project.firebaseapp.com
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_STORAGE_BUCKET=tu_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=tu_messaging_id
FIREBASE_APP_ID=tu_app_id

# JWT Secret
JWT_SECRET=tu_secreto_jwt_super_seguro

# Server Port (opcional, default: 3000)
PORT=3000
```

### 4. Crear colección en Firestore
En tu consola de Firebase, crea una colección llamada `productos` con documentos que tengan esta estructura:

```json
{
  "nombre": "Tablet Pro X",
  "precio": 899.99,
  "stock": 25,
  "descripcion": "Tablet de última generación con 128GB",
  "activo": true,
  "sku": "TAB-PR-001"
}
```

### 5. Iniciar servidor
```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

Para modo desarrollo con reinicio automático:
```bash
npm run dev
```

## 🔑 Autenticación

### Obtener Token (Login)

**Endpoint**: `POST /auth/login`

**Credenciales de prueba** (simuladas en `src/services/auth.service.js`):
- Usuario: `techlab`
- Contraseña: `password123`

**Ejemplo:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "techlab",
    "password": "password123"
  }'
```

**Respuesta:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "expiresIn": "1h"
}
```

**Nota:** Todos los endpoints de `/api/products` requieren un Bearer token en el header `Authorization`.

## 📚 Endpoints de Productos

### GET - Obtener todos los productos (paginado)

**Endpoint**: `GET /api/products`

**Headers requeridos:**
```
Authorization: Bearer <token>
```

**Query Parameters (opcionales):**
- `pageSize`: Número de productos por página (default: 20)
- `startAfterId`: ID del último producto de la página anterior para cursor pagination

**Ejemplo:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Primera página (20 productos)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products"

# Primera página con tamaño custom (5 productos)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products?pageSize=5"

# Segunda página (usando cursor del documento anterior)
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products?pageSize=5&startAfterId=NOwACDaeYGC9H0Hi8cWV"
```

**Respuesta (200 OK):**
```json
{
  "products": [
    {
      "id": "cNpmnNx8jNDtM21nUZjP",
      "nombre": "Cámara Web Full HD StellarCam",
      "precio": 45,
      "stock": 50,
      "descripcion": "Ideal para streaming y videollamadas",
      "activo": true,
      "sku": "CAM-ST-FHD"
    }
  ],
  "lastId": "cNpmnNx8jNDtM21nUZjP",
  "performanceMs": 245
}
```

### GET - Obtener producto por ID

**Endpoint**: `GET /api/products/:id`

**Ejemplo:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products/cNpmnNx8jNDtM21nUZjP"
```

**Respuesta (200 OK):**
```json
{
  "id": "cNpmnNx8jNDtM21nUZjP",
  "nombre": "Cámara Web Full HD StellarCam",
  "precio": 45,
  "stock": 50,
  "descripcion": "Ideal para streaming y videollamadas",
  "activo": true,
  "sku": "CAM-ST-FHD"
}
```

### POST - Crear nuevo producto

**Endpoint**: `POST /api/products/create`

**Body requerido:**
```json
{
  "nombre": "Nuevo Producto",
  "precio": 99.99,
  "stock": 10,
  "descripcion": "Descripción del producto",
  "activo": true,
  "sku": "NEW-001"
}
```

**Ejemplo:**
```bash
curl -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Auriculares Bluetooth",
    "precio": 79.99,
    "stock": 15,
    "descripcion": "Auriculares inalámbricos con cancelación de ruido",
    "activo": true,
    "sku": "AUR-BT-001"
  }' \
  "http://localhost:3000/api/products/create"
```

**Respuesta (201 Created):**
```json
{
  "id": "abc123def456",
  "nombre": "Auriculares Bluetooth",
  "precio": 79.99,
  "stock": 15,
  "descripcion": "Auriculares inalámbricos con cancelación de ruido",
  "activo": true,
  "sku": "AUR-BT-001"
}
```

### PATCH - Actualizar parcialmente un producto

**Endpoint**: `PATCH /api/products/:id`

**Body (solo los campos a actualizar):**
```json
{
  "precio": 89.99,
  "stock": 20
}
```

**Ejemplo:**
```bash
curl -X PATCH -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 89.99,
    "stock": 20
  }' \
  "http://localhost:3000/api/products/abc123def456"
```

**Respuesta (200 OK):**
```json
{
  "id": "abc123def456",
  "precio": 89.99,
  "stock": 20
}
```

### PUT - Reemplazar completamente un producto

**Endpoint**: `PUT /api/products/:id`

**Body requerido (todos los campos):**
```json
{
  "nombre": "Producto Reemplazado",
  "precio": 199.99,
  "stock": 5,
  "descripcion": "Nuevo producto",
  "activo": true,
  "sku": "NEW-SKU"
}
```

**Nota:** PUT valida que estén presentes: `nombre`, `precio` y `stock`.

**Ejemplo:**
```bash
curl -X PUT -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Laptop Gaming",
    "precio": 1299.99,
    "stock": 3,
    "descripcion": "Laptop para gaming de alta gama",
    "activo": true,
    "sku": "LAPTOP-001"
  }' \
  "http://localhost:3000/api/products/abc123def456"
```

**Respuesta (200 OK):**
```json
{
  "id": "abc123def456",
  "nombre": "Laptop Gaming",
  "precio": 1299.99,
  "stock": 3,
  "descripcion": "Laptop para gaming de alta gama",
  "activo": true,
  "sku": "LAPTOP-001"
}
```

### DELETE - Eliminar un producto

**Endpoint**: `DELETE /api/products/:id`

**Ejemplo:**
```bash
curl -X DELETE -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products/abc123def456"
```

**Respuesta (200 OK):**
```json
{
  "message": "Producto con ID abc123def456 eliminado."
}
```

## 🎯 Optimizaciones Implementadas

### Paginación
- **Antes**: Traía TODOS los documentos de la colección por cada request → O(n) en transferencia de datos.
- **Después**: Usa `getDocs(query)` con `limit(pageSize)` y `startAfter()` → solo trae lo necesario.
- **Beneficio**: Reducción de latencia, ancho de banda y costo de lectura en Firestore.

### Caché en Memoria
- Respuestas cacheadas por combinación de `pageSize` + `startAfterId`.
- TTL de 10 segundos (configurable en `src/services/products.service.js`).
- **Beneficio**: Evita llamadas repetidas a Firestore bajo tráfico similar.

### Ordenamiento
- Las consultas se ordenan por `nombre` para garantizar orden consistente en paginación.
- Considera añadir un índice en Firestore si la colección es muy grande.

## 📁 Estructura del Proyecto

```
node-rest-api/
├── src/
│   ├── controllers/          # Lógica de rutas (request/response)
│   │   ├── auth.controller.js
│   │   └── products.controller.js
│   ├── models/              # Interfaz con Firestore
│   │   └── products.model.js
│   ├── services/            # Lógica de negocio + caché
│   │   ├── auth.service.js
│   │   └── products.service.js
│   ├── routes/              # Definición de rutas
│   │   ├── auth.routes.js
│   │   └── products.routes.js
│   ├── middlewares/         # Middleware de autenticación
│   │   └── auth.middleware.js
│   └── data/                # Datos iniciales
│       └── products.data.js
├── firebase.js              # Configuración de Firestore
├── index.js                 # Punto de entrada principal
├── package.json             # Dependencias
├── .env                     # Variables de entorno (no commitear)
└── README.md                # Este archivo
```

## 🔒 Variables de Entorno

Todas las variables de entorno deben configurarse en `.env` (archivo no versionado):

| Variable | Descripción | Ejemplo |
|----------|-----------|---------|
| `FIREBASE_API_KEY` | API key de Firebase | `AIza...` |
| `FIREBASE_AUTH_DOMAIN` | Auth domain | `project.firebaseapp.com` |
| `FIREBASE_PROJECT_ID` | ID del proyecto | `my-project` |
| `FIREBASE_STORAGE_BUCKET` | Storage bucket | `my-project.appspot.com` |
| `FIREBASE_MESSAGING_SENDER_ID` | Messaging ID | `123456789` |
| `FIREBASE_APP_ID` | App ID | `1:123456:web:abc...` |
| `JWT_SECRET` | Secreto para firmar JWT | `tu_secreto_super_seguro` |
| `PORT` | Puerto del servidor | `3000` (default) |

**⚠️ IMPORTANTE**: Nunca commitees el archivo `.env`. Usa `.env.example` para documentar variables necesarias.

## 🧪 Testing Manual con cURL

### 1. Login y guardar token
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"techlab","password":"password123"}' | jq -r '.token')

echo $TOKEN
```

### 2. Crear producto
```bash
PRODUCT_ID=$(curl -s -X POST -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Test Producto",
    "precio":99.99,
    "stock":10,
    "descripcion":"Producto de prueba",
    "activo":true,
    "sku":"TEST-001"
  }' http://localhost:3000/api/products/create | jq -r '.id')

echo "Created product: $PRODUCT_ID"
```

### 3. Obtener todos (paginado)
```bash
curl -s -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products?pageSize=10" | jq '.'
```

### 4. Obtener por ID
```bash
curl -s -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products/$PRODUCT_ID" | jq '.'
```

### 5. Actualizar (PATCH)
```bash
curl -s -X PATCH -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"precio":79.99}' \
  "http://localhost:3000/api/products/$PRODUCT_ID" | jq '.'
```

### 6. Reemplazar (PUT)
```bash
curl -s -X PUT -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Producto Actualizado",
    "precio":149.99,
    "stock":5,
    "descripcion":"Actualizado",
    "activo":true,
    "sku":"UPD-001"
  }' \
  "http://localhost:3000/api/products/$PRODUCT_ID" | jq '.'
```

### 7. Eliminar
```bash
curl -s -X DELETE -H "Authorization: Bearer $TOKEN" \
  "http://localhost:3000/api/products/$PRODUCT_ID" | jq '.'
```

## 📊 Códigos HTTP

| Código | Significado |
|--------|-----------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - Credenciales inválidas |
| 403 | Forbidden - Token inválido o expirado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## 🚀 Próximos Pasos (Recomendaciones)

1. **Cache externo (Redis)**: Para múltiples instancias o persistencia entre reinicios.
2. **Índices Firestore**: Añadir índice en campo `nombre` si la colección crece.
3. **Validación de datos**: Usar librerías como `joi` o `zod` para validar entrada.
4. **Logging**: Integrar `pino` o `winston` para logs estructurados en producción.
5. **Métricas**: Instrumentar con Prometheus para monitorear latencias en tiempo real.
6. **Tests unitarios**: Agregar suite de tests con `jest` o `mocha`.
7. **CI/CD**: Configurar GitHub Actions para tests automáticos en cada push.
8. **Documentación OpenAPI**: Generar Swagger/OpenAPI para documentación interactiva.

## 📝 Historial de Cambios

### v1.1.0 - Optimización de Rendimiento
- ✅ Implementado paginación en GET productos
- ✅ Añadido caché en memoria con TTL
- ✅ Completado CRUD (PATCH y PUT)
- ✅ Medición de performance en respuestas
- ✅ Mejora de documentación

### v1.0.0 - Versión inicial
- API REST básica con autenticación JWT
- CRUD inicial para productos

## 📄 Licencia

ISC

## 👤 Autor

Salazar Matías - [@Matias0910](https://github.com/Matias0910)

## 📞 Soporte

Si encuentras problemas:
1. Verifica que el archivo `.env` esté configurado correctamente.
2. Revisa que Firestore esté habilitado en tu proyecto de Firebase.
3. Asegúrate de que `npm install` haya instalado todas las dependencias.
4. Revisa los logs del servidor para más detalles sobre el error.

---

**Última actualización**: 30 de noviembre de 2025

## 📦 Despliegue (Producción)

- URL de producción (deploy reciente): https://node-rest-jzc9w0vjb-matias0910s-projects.vercel.app

- Estado actual: el proyecto fue desplegado en Vercel y las variables de entorno necesarias fueron añadidas.

- Nota importante sobre acceso público: Vercel puede aplicar "Deployment Protection" que requiere autenticación para acceder al deployment. Si quieres que la URL sea pública y accesible por cualquier persona, en la Dashboard de Vercel ve a **Settings → Security → Deployment Protection** y desactiva la protección para este proyecto.

- Alternativa segura: si prefieres mantener la protección activada, genera un *Bypass Token* en Vercel y compártelo solo para pruebas; de lo contrario, indícalo y yo puedo ejecutar pruebas remotas con ese token.

---

**Última actualización del despliegue**: 30 de noviembre de 2025
