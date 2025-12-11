// api/index.js
const serverless = require('serverless-http');
const app = require('../app'); // Importa app.js, que tiene todas las rutas y middlewares

module.exports = serverless(app);
