import request from 'supertest'
import { createConnection, getConnection } from 'typeorm';
import { app } from '../server';

describe('CreateMessageController', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query("DELETE FROM messages");
        await connection.close();
    })

    test('should able to create a message', () => {

        return request(app).post('/message').send({
            email: 'test@email.com',
            message: 'testing'
        }).then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body.email).toEqual('test@email.com')
            expect(response.body.message).toEqual('testing')
            console.log(response.body);
        });
    })

})