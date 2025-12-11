const serverless = require('serverless-http');
const app = require('../servidor'); // Ajusta la ruta si tu servidor está en otra carpeta

module.exports = serverless(app);
