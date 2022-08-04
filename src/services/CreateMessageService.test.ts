import { createConnection, getConnection } from "typeorm";
import { CreateMessageService } from "./CreateMessageService";
import { MessagesRepository } from "../repository/MessagesRepository";

describe('CreateMessageService', () => {

    beforeAll(async () => {
        const connection = await createConnection();
        connection.runMigrations();
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query("DELETE FROM messages");
        await connection.close();
    })

    it('should create a message', async () => {

        const createMessageService = new CreateMessageService(MessagesRepository);
        const newMessage = await createMessageService.execute({ email: 'test@gmail.com', message: 'first time testing' });

        expect(newMessage).toBeTruthy();
        expect(newMessage).toHaveProperty('id')
        expect(newMessage).toHaveProperty('email')
    })

    it('should throw email error message', async () => {
        const createMessageService = new CreateMessageService(MessagesRepository);

        expect(createMessageService.execute({ email: '', message: 'test' })).rejects.toThrow("Por favor informe um email!");
    })

    it('should throw error message', async () => {
        const createMessageService = new CreateMessageService(MessagesRepository);

        expect(createMessageService.execute({ email: 'test@email.com', message: '' })).rejects.toThrow("Por favor escreva uma messagem!");
    })

})