import { getCustomRepository, getRepository } from "typeorm";
import { MessagesRepository } from "../repository/MessagesRepository";

interface IMessage {
    email: string;
    message: string
}


class CreateMessageService {
    private messageRepository: MessagesRepository;

    constructor(repository) {
        this.messageRepository = getCustomRepository(
            repository
        );
    }

    async execute({ email, message }: IMessage) {

        if (!email) {
            throw new Error("Por favor informe um email!")
        }

        if (!message) {
            throw new Error("Por favor escreva uma messagem!")
        }

        const newMessage = this.messageRepository.create({ email, message })

        await this.messageRepository.save(newMessage);

        return newMessage;
    }
}

export { CreateMessageService }