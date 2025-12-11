// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ===== Conexión a MongoDB =====
async function conectarBD() {
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

conectarBD();

// ===== Importar rutas =====
const usuarioRouter = require('./rutas/usuarioRutas');
const tecnicaRouter = require('./rutas/tecnicasRutas');
const estiloRouter = require('./rutas/estilosRutas');
const disenoRouter = require('./rutas/disenoRutas');
const catalogoRouter = require('./rutas/catalogoRutas');
const citasRoutes = require('./rutas/citasRutas');
const ofertaRuta = require('./rutas/ofertaRutas');

// Ruta base
app.get("/", (req, res) => {
    res.json({ status: "Backend Lashes Studio activo" });
});

// ===== Rutas API =====
app.use('/api/ofertas', ofertaRuta);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/tecnicas', tecnicaRouter);
app.use('/api/estilos', estiloRouter);
app.use('/api/disenos', disenoRouter);
app.use('/api/catalogo', catalogoRouter);
app.use('/api/citas', citasRoutes);

// ===== Middleware global de errores =====
app.use((err, req, res, next) => {
    console.error('Error global:', err);
    res.status(500).json({ error: 'Error interno del servidor', detalle: err.message });
});

module.exports = app;
