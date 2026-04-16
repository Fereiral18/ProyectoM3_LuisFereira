import { TESLA_PROMPT } from "../src/components/chat/teslaPrompt.js";


export async function sendMessage(message) {
    const res = await fetch("http://localhost:3000/api/chat", {
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
    return data.text;
}