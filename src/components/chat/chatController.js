import { sendMessage } from "../../../api/functions.js";
import { Render } from "../render/render.js";
import { AppState } from "../state/appState.js";

export async function handleUserMessage(text) {

    // usuario
    AppState.messages.push({
        role: "user",
        text,
        timestamp: Date.now()
    });

    Render.messages();

    // typing
    AppState.messages.push({
        role: "bot",
        text: "Pensando...",
        timestamp: Date.now()
    });

    Render.messages();

    const response = await sendMessage(text);

    // reemplazar último mensaje (bot)
    AppState.messages[AppState.messages.length - 1] = {
        role: "bot",
        text: response,
        timestamp: Date.now()
    };

    Render.messages();
}