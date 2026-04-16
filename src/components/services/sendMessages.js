import { TESLA_PROMPT } from "../chat/teslaPrompt.js";

export async function sendMessage(message) {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            system: TESLA_PROMPT
        })
    });

    const data = await res.json();

    console.log("BACKEND RESPONSE:", data);

    if (!res.ok) {
        throw new Error(data.error || "Error en el servidor");
    }

    return data.text || "Sin respuesta del oráculo de Tesla";
}