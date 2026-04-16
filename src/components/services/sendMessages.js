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
    return data.text;
}

console.log("API KEY:", process.env.GEMINI_API_KEY);