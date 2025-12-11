const mongoose = require('mongoose');
const argon2 = require('argon2');
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: { type: String, required: true },
    rol: {
        type: String,
        default: 'cliente',
        enum: ['cliente', 'admin']
    }

});


UsuarioSchema.pre('save', async function(next) {

    if (!this.isModified('password')) {
        return next();
    }

    try {

        const options = {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1
        };


        this.password = await argon2.hash(this.password, options);

        next();
    } catch (error) {

        next(error);
    }
});

//evaluacion 
UsuarioSchema.methods.compararContraseña = async function(contraseñaIngresada) {

    return await argon2.verify(this.password, contraseñaIngresada);
};

module.exports = mongoose.model('usuario', UsuarioSchema);