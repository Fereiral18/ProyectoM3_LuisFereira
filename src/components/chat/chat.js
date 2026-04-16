import { AppState } from "../state/appState.js";
import { DOM } from "../dom/dom.js";
import { Render } from "../render/render.js";
import { Bot } from "../bot/bot.js";


export const Chat = {
   addUserMessageAndRespond(text) {
    if (!text.trim()) return;

    AppState.messages.push({
        role: 'user',
        text,
        timestamp: new Date()
    });

    Render.messages();
    DOM.chatInput.value = '';

    if (AppState.typingTimeout) clearTimeout(AppState.typingTimeout);

    AppState.isBotTyping = true;
    Render.typingIndicator(true);

    AppState.typingTimeout = setTimeout(async () => {
        const reply = await Bot.getReply(text);

        AppState.messages.push({
            role: 'bot',
            text: reply,
            timestamp: new Date()
        });

        Render.typingIndicator(false);
        Render.messages();
        AppState.isBotTyping = false;
    }, 800 + Math.random() * 400);
},

    handleSendMessage() {
        if (AppState.isBotTyping) return;

        const messageText = DOM.chatInput.value.trim();
        if (!messageText) return;

        this.addUserMessageAndRespond(messageText);
    }
};