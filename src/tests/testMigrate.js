const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app')

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
            firstName: 'Test',
            lastName: 'Test',
            email: 'test@gmail.com',
            password: 'test1234',
            gender: 'OTHER',
        }
        await request(app).post('/user').send(user);

        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();