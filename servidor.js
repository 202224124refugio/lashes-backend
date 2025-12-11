require('dotenv').config(); // Quitamos la ruta específica './admin.env' ya que lo borramos

const app = require('./app');

// Definimos el puerto
const PUERTO = process.env.PUERTO || 3000;

// Como la conexión a la BD ya está en app.js, aquí solo iniciamos el "listener"
app.listen(PUERTO, () => {
    console.log(`🚀 Servidor ejecutándose localmente en el puerto ${PUERTO}`);
});