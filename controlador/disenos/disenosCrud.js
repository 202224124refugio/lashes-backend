    const disenos = require('../../modelos/disenos');
    const Diseno = require('../../modelos/disenos');

    // 🟢 Crear diseño
    exports.crearDiseno = async(req, res) => {
        try {
            console.log('📥 Datos recibidos:', req.body);
            const nuevoDiseno = new Diseno(req.body);
            const guardado = await nuevoDiseno.save();

            res.status(201).json({
                mensaje: 'Diseño creado exitosamente',
                diseno: guardado,
            });
        } catch (error) {
            console.error('❌ Error al crear diseño:', error);
            res.status(400).json({ error: error.message });
        }
    };

    //obtener diseño 

    exports.obtenerDiseno = async(req, res) => {
        try {
            const disenos = await Diseno.find();
            res.status(200).json(disenos);
        } catch (error) {
            console.error(' Error al obtener técnicas:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener diseños' });
        }

    };

    // 🟡 Actualizar diseño
    exports.actualizarDiseno = async(req, res) => {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        try {
            const diseno = await Diseno.findById(id);
            if (!diseno) {
                return res.status(404).json({ mensaje: 'Diseño no encontrado.' });
            }

            if (nombre) diseno.nombre = nombre;
            if (descripcion) diseno.descripcion = descripcion;

            const actualizado = await diseno.save();
            res.status(200).json({
                mensaje: 'Diseño actualizado correctamente.',
                diseno: actualizado,
            });
        } catch (error) {
            console.error('❌ Error al actualizar diseño:', error);
            res.status(500).json({ error: error.message });
        }
    };

    // 🔴 Eliminar diseño
    exports.eliminarDiseno = async(req, res) => {
        const { id } = req.params;

        try {
            const eliminado = await Diseno.findByIdAndDelete(id);
            if (!eliminado) {
                return res.status(404).json({ mensaje: 'Diseño no encontrado.' });
            }

            res.status(200).json({
                mensaje: 'Diseño eliminado correctamente.',
                diseno: eliminado,
            });
        } catch (error) {
            console.error('❌ Error al eliminar diseño:', error);
            res.status(500).json({ error: error.message });
        }
    };