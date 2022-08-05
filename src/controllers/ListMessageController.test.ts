import request from 'supertest'
import { createConnection, getConnection } from 'typeorm';
import { MessagesRepository } from '../repository/MessagesRepository';
import { app } from '../server';
import { CreateMessageService } from '../services/CreateMessageService';

describe('ListMessageController', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        connection.runMigrations();
        const createMessageService = new CreateMessageService(MessagesRepository);
        await createMessageService.execute({ email: 'test@email.com', message: 'testing' });
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query("DELETE FROM messages");
        await connection.close();
    })

    test('should able to return a list of message', () => {

        return request(app).get('/message').then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body[0].email).toEqual('test@email.com');
            expect(response.body[0].message).toEqual('testing');
        })
    })

})