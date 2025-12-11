const Usuario = require('../../modelos/usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'clave_segura';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const SALT_ROUNDS = 10;

// =====================================================
// CREAR USUARIO
// =====================================================
exports.crearUsuario = async (req, res) => {
    try {
        console.log('📨 Datos recibidos:', req.body);

        const { nombre, correo, password } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const adminEmails = [
            "studiolashesadmmi_operator_1@gmail.com",
            "studiolashesadmmi_operator_2@gmail.com",
            "studiolashesadmmi_operator_3@gmail.com"
        ];

        const rolAsignado = adminEmails.includes(correo.toLowerCase()) ? 'admin' : 'cliente';

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password: hashedPassword,
            rol: rolAsignado
        });

        const guardado = await nuevoUsuario.save();

        console.log(`✅ Usuario creado: ${guardado.correo} | Rol: ${guardado.rol}`);

        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: {
                id: guardado._id,
                nombre: guardado.nombre,
                correo: guardado.correo,
                rol: guardado.rol
            }
        });

    } catch (err) {
        console.error('❌ Error al crear usuario:', err.message);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        res.status(500).json({ error: err.message });
    }
};

// =====================================================
// LOGIN WEB
// =====================================================
exports.loginUsuario = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
        }

        const esCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esCorrecta) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas.' });
        }

        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso.',
            token,
            usuario: payload
        });

    } catch (error) {
        console.error('❌ Error en loginUsuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

// =====================================================
// LOGIN MÓVIL
// =====================================================
exports.loginMovil = async (req, res) => {
    try {
        console.log('📲 Petición recibida desde Android:', req.body);
        const { username, password } = req.body;

        const usuario = await Usuario.findOne({ correo: username });
        if (!usuario) {
            return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
        }

        const esCorrecta = await bcrypt.compare(password, usuario.password);
        if (!esCorrecta) {
            return res.status(401).json({ status: "error", message: "Contraseña incorrecta" });
        }

        // Generamos token también para móvil
        const payload = {
            id: usuario._id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        res.status(200).json({
            status: "success",
            message: `¡Bienvenido ${usuario.nombre}!`,
            token,
            usuario: payload
        });

    } catch (error) {
        console.error('❌ Error en loginMovil:', error);
        res.status(500).json({ status: "server_error", message: "Error interno del servidor" });
    }
};

// =====================================================
// ACTUALIZAR USUARIO
// =====================================================
exports.actualizarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, password } = req.body;

    try {
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        if (nombre) usuario.nombre = nombre;
        if (correo) usuario.correo = correo;
        if (password) usuario.password = await bcrypt.hash(password, SALT_ROUNDS);

        const guardado = await usuario.save();
        res.status(200).json({
            mensaje: 'Usuario actualizado correctamente.',
            usuario: {
                id: guardado._id,
                nombre: guardado.nombre,
                correo: guardado.correo,
                rol: guardado.rol
            }
        });

    } catch (error) {
        console.error('❌ Error en actualizarUsuario:', error);
        if (error.code === 11000) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }
        res.status(500).json({ mensaje: 'Error en el servidor', error });
    }
};

// =====================================================
// ELIMINAR USUARIO
// =====================================================
exports.eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json({
            mensaje: 'Usuario eliminado exitosamente.',
            usuario: usuarioEliminado
        });

    } catch (error) {
        console.error('❌ Error en eliminarUsuario:', error);
        res.status(500).json({ mensaje: 'Error en el servidor al intentar eliminar el usuario.' });
    }
};
