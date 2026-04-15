export const Bot = {
    getReply(userMessage) {
        const lowerMsg = userMessage.toLowerCase();

        if (lowerMsg.includes('hola') || lowerMsg.includes('buenas') || lowerMsg.includes('hey')) {
            return '¡Hola! 😊 ¿Cómo estás? Cuéntame, ¿en qué te ayudo?';
        } else if (lowerMsg.includes('como estas') || lowerMsg.includes('cómo estás')) {
            return '¡Estoy genial! Gracias por preguntar. Listo para conversar contigo. ✨';
        } else if (lowerMsg.includes('clima') || lowerMsg.includes('tiempo')) {
            return 'Actualmente no tengo acceso a datos en tiempo real 🌤️';
        } else if (lowerMsg.includes('gracias')) {
            return '¡De nada! 🤗';
        } else if (lowerMsg.includes('ayuda')) {
            return 'Puedo responder preguntas básicas y conversar 💡';
        } else if (lowerMsg.includes('creador')) {
            return 'Esta app es una demo SPA con History API 🚀';
        } else {
            return `Entendí: "${userMessage}". ¿Quieres preguntar algo más?`;
        }
    }
};