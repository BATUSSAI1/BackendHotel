const request = require('supertest');
const app = require('../app');
const { expectCt } = require('helmet');

let id; 
let token;
test('POST /user debe crear un usuario', async () => {
    const body = {
        firstName: 'jorge',
        lastName: 'Vera',
        email: 'jorgevera@gmail.com',
        password: '12345',
        gender: 'MALE'
        
    }
    const res = await request(app).post('/user').send(body)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();

});

test('POST /user/login logear a un usuario', async () => {
    const body = {
        email: 'jorgevera@gmail.com',
        password: '12345',
    }
    const res = await request(app).post('/user/login').send(body)
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test('GET /user debe traer todos los usuarios', async () => {
    const res = await request(app)
    .get('/user')
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});



test('PUT /user/:id actualizar un usuario', async () => {
    const body = {
        firstName: 'jorge updated',
    }
    const res = await request(app).put(`/user/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});



test('POST /user/login con credenciales invalidos debe enviar error', async() =>{
    const body = {
        email: 'incorrecto@gmail.com',
        password: 'incorrecto',
    }
    const res = await request(app).post('/user/login').send(body);
    expect(res.status).toBe(401)
});


test('DELETE /user/:id debe elimar un usuario', async () => {
    const res = await request(app)
    .delete(`/user/${id}`)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
});

