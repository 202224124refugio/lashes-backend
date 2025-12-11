const serverless = require('serverless-http');
const app = require('../servidor'); // ruta correcta

module.exports = server = serverless(app);
