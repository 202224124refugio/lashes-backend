const express = require('express');
const cors = require('cors');
const conectarBD = require('./conexion/db'); // IMPORTANTE: Importamos la conexión aquí

// Importación de rutas
const usuarioRouter = require('./rutas/usuarioRutas');
const tecnicaRouter = require('./rutas/tecnicasRutas');
const estiloRouter = require('./rutas/estilosRutas');
const disenoRouter = require('./rutas/disenoRutas');
const catalogoRouter = require('./rutas/catalogoRutas');
const citasRoutes = require('./rutas/citasRutas');
const ofertaRuta = require('./rutas/ofertaRutas');

const app = express();

// 1. Conectar a Base de Datos (Crucial para Vercel)
// Mongoose maneja el "pool" de conexiones, así que basta con llamarlo aquí.
conectarBD();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ruta de prueba para ver si el servidor responde en Vercel
app.get('/', (req, res) => {
    res.send('¡Hola! El servidor de Lashes Studio está funcionando correctamente en Vercel.');
});

// Rutas de la API
app.use('/api/ofertas', ofertaRuta);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/tecnicas', tecnicaRouter);
app.use('/api/estilos', estiloRouter);
app.use('/api/disenos', disenoRouter);
app.use('/api/catalogo', catalogoRouter);
app.use('/api/citas', citasRoutes);

// Exportamos la app (Obligatorio para Vercel)
module.exports = app;