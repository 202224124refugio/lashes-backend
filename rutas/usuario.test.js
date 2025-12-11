const request = require('supertest');
const app = require('../app');
const Usuario = require('../modelos/usuarios');

const usuarioValido = {
    nombre: 'Test User',
    correo: 'test@pruebas.com',
    contraseña: 'password123',
};

test('Verifica que Jest funciona', () => {
    expect(true).toBe(true);
});

describe('POST /crear-usuario', () => {


    test('Debe crear un usuario y devolver status 201', async () => {


        const response = await request(app)
            .post('/crear-usuario')
            .send(usuarioValido);


        expect(response.statusCode).toBe(201);
        expect(response.body.nombre).toBe(usuarioValido.nombre);


        const userInDB = await Usuario.findOne({ correo: usuarioValido.correo });
        expect(userInDB).not.toBeNull();
        expect(userInDB.nombre).toBe(usuarioValido.nombre);
    });


    test('Debe fallar si la contraseña está ausente y devolver status 400', async () => {

        const usuarioInvalido = { nombre: 'Invalido', correo: 'fail@test.com' };

        const response = await request(app)
            .post('/crear-usuario')
            .send(usuarioInvalido);


        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');


        const userInDB = await Usuario.findOne({ correo: usuarioInvalido.correo });
        expect(userInDB).toBeNull();
    });
});