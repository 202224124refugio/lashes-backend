// conexion/db.js
const mongoose = require('mongoose');

// Cargar dotenv solo cuando NO estamos en producción
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config({ path: './admin.env' });
}

const cadenaConexion = process.env.CADENA_CONEXION_DB;

const conectarBD = async () => {
  try {
    await mongoose.connect(cadenaConexion);
    console.log('Conexión exitosa a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
    process.exit(1);
  }
};

module.exports = conectarBD;
