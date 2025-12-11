// servidor.js
require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

// Conectar a MongoDB
async function conectarMongo() {
    try {
        await mongoose.connect(process.env.CADENA_CONEXION_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error al conectar a MongoDB Atlas:', err);
    }
}

conectarMongo();

// Solo levantar servidor en desarrollo local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}

module.exports = app;
