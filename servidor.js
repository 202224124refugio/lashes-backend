const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Función para conectar a MongoDB con manejo de errores
async function conectarMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error al conectar a MongoDB Atlas:', err);
        // No terminar la función, solo mostrar error en logs y en endpoint
    }
}

// Llamamos a la función de conexión
conectarMongo();

// Endpoint principal
app.get('/', (req, res) => res.send('Backend funcionando correctamente'));

// Endpoint para probar la conexión a MongoDB
app.get('/api/test-db', async (req, res) => {
    try {
        if (!mongoose.connection.readyState) {
            return res.status(500).json({ error: 'MongoDB no conectado' });
        }
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({
            message: 'Conexión a MongoDB exitosa',
            colecciones: collections.map(c => c.name)
        });
    } catch (err) {
        console.error('Error en test DB:', err);
        res.status(500).json({ error: 'Error al consultar la base de datos', detalle: err.message });
    }
});

// Middleware de manejo global de errores (para capturar cualquier otro fallo)
app.use((err, req, res, next) => {
    console.error('Error global:', err);
    res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});

// Solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}

module.exports = app;
