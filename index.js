// index.js
import app from './src/app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express.js corriendo en el puerto ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
});