const Catalogo = require('../../modelos/catalogo');


exports.crearProducto = async(req, res) => {
    try {
        console.log('📨 Datos recibidos para producto:', req.body);

        // El req.body que envías desde AdminPanel.jsx coincide con el modelo
        const nuevoProducto = new Catalogo(req.body);
        const guardado = await nuevoProducto.save();

        console.log('✅ Producto creado:', guardado);
        res.status(201).json({
            mensaje: 'Producto creado exitosamente',
            producto: guardado
        });
    } catch (error) {
        console.error('❌ Error al crear producto:', error.message);
        res.status(400).json({ error: error.message });
    }
};

// 🔵 Obtener todos los Productos
exports.obtenerProductos = async(req, res) => {
    try {
        const productos = await Catalogo.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error('❌ Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
    }
};


exports.obtenerProductoPorId = async(req, res) => {
    try {
        const { id } = req.params;
        const producto = await Catalogo.findById(id);

        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        res.status(200).json(producto);

    } catch (error) {
        console.error('❌ Error al obtener producto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


// 🟠 Actualizar Producto
exports.actualizarProducto = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, diseno, estilo, tecnica, precio } = req.body;

        const producto = await Catalogo.findById(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        // Actualizamos los campos que vengan en el body
        producto.nombre = nombre || producto.nombre;
        producto.descripcion = descripcion || producto.descripcion;
        producto.diseno = diseno || producto.diseno;
        producto.estilo = estilo || producto.estilo;
        producto.tecnica = tecnica || producto.tecnica;
        producto.precio = precio || producto.precio;

        const actualizado = await producto.save();

        console.log('✏️ Producto actualizado:', actualizado);
        res.status(200).json({
            mensaje: 'Producto actualizado correctamente',
            producto: actualizado
        });
    } catch (error) {
        console.error('❌ Error al actualizar producto:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// 🔴 Eliminar Producto
exports.eliminarProducto = async(req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await Catalogo.findByIdAndDelete(id);

        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado.' });
        }

        console.log('🗑️ Producto eliminado:', eliminado);
        res.status(200).json({
            mensaje: 'Producto eliminado exitosamente',
            producto: eliminado
        });
    } catch (error) {
        console.error('❌ Error al eliminar producto:', error.message);
        res.status(500).json({ error: error.message });
    }
};