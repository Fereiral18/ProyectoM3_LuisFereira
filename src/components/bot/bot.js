import { sendMessage } from "../../../api/functions.js";

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