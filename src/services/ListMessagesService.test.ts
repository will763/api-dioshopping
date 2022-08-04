import { createConnection, getConnection } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";
import { CreateMessageService } from "./CreateMessageService";
import { ListMessageService } from "./ListMessagesService";

describe('ListMessagesService', () => {

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

    it('should create a list of messages', async () => {
        const listMessageService = new ListMessageService();
        const allMessages = await listMessageService.execute();

        expect(allMessages[0].email).toEqual('test@email.com')
        expect(allMessages[0].message).toEqual('testing')

    })
})