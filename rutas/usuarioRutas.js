const express = require('express');
const router = express.Router();

const crud = require('../controlador/usuario/usuarioCrud');
// ruta corregida
const auth = require('../middleware/auth');

// Crear usuario
router.post('/crear', crud.crearUsuario);

// Login web
router.post('/login', crud.loginUsuario);

// Login móvil
router.post('/login-movil', crud.loginMovil);

// Actualizar usuario (protegido)
router.put('/actualizar/:id', auth, crud.actualizarUsuario);

// Eliminar usuario (protegido)
router.delete('/eliminar/:id', auth, crud.eliminarUsuario);

module.exports = router;
