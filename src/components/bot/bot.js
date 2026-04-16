import { sendMessage } from "../services/sendMessages.js";



export const Bot = {
    async getReply(userMessage) {
        try {
            const response = await sendMessage(userMessage);
            return response;
        } catch (error) {
            return "Hubo un problema conectando con la mente de Tesla ⚡";
        }
    }
};