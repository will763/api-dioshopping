import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";
import { MessagesRepository } from "../repository/MessagesRepository";

class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { email, message } = request.body;

        const createMessageService = new CreateMessageService(MessagesRepository);

        const newMessage = await createMessageService.execute({ email, message });

        return response.json(newMessage);
    }
}

export { CreateMessageController }