// api/test-db.js
const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const app = express();
app.use(express.json());

// Conexión a MongoDB
async function conectarMongo() {
    try {
        await mongoose.connect(process.env.CADENA_CONEXION_DB);
        console.log('Conectado a MongoDB Atlas');
    } catch (err) {
        console.error('Error al conectar a MongoDB Atlas:', err);
    }
}
conectarMongo();

// Endpoint GET /
router.get('/', async (req, res) => {
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
        res.status(500).json({ error: err.message });
    }
});

app.use('/', router);

module.exports = serverless(app);
