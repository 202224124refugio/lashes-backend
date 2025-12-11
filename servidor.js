const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => {
        console.error('Error al conectar a MongoDB Atlas:', err);
        process.exit(1); // Termina la función si no hay conexión
    });

// Endpoint principal
app.get('/', (req, res) => res.send('Backend funcionando correctamente'));

// Endpoint para probar la conexión a MongoDB en Vercel
app.get('/api/test-db', async (req, res) => {
    try {
        const collections = await mongoose.connection.db.listCollections().toArray();
        res.json({
            message: 'Conexión a MongoDB exitosa',
            colecciones: collections.map(c => c.name)
        });
    } catch (err) {
        console.error('Error en test DB:', err);
        res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
    }
});

// Solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
}

module.exports = app;
