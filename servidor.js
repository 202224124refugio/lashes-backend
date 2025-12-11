// servidor.js
require('dotenv').config({ path: './admin.env' });

const app = require('./app');

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor local ejecutándose en el puerto ${PUERTO}`);
});
