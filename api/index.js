const serverless = require('serverless-http');
const app = require('../servidor'); // importa tu servidor.js

module.exports = server = serverless(app);
