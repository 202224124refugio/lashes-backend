require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

async function conectarMongo() {
    try {
        await mongoose.connect(process.env.CADENA_CONEXION_DB);
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error al conectar a MongoDB Atlas:', err);
        process.exit(1);
    }
}

conectarMongo();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
