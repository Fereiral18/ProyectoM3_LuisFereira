import { sendMessage } from "../services/sendMessages.js";

export const Bot = {
    async getReply(userMessage) {
        try {
            const response = await sendMessage(userMessage);
            return response;
        } catch (error) {
            console.error("BOT ERROR:", error);
            return "ERROR REAL: " + error.message;
        }
    }
};