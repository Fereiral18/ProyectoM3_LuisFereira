import { GoogleGenerativeAI } from "@google/generative-ai";

export async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ 
            error: "Este canal solo responde a transmisiones POST, como un circuito bien diseñado por Tesla." 
        });
    }

    try {
        const { message, history = [] } = req.body || {};

        if (!message || String(message).trim().length === 0) {
            return res.status(400).json({ 
                error: "La señal está vacía. Tesla diría: sin energía no hay transmisión." 
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY no configurada en el sistema energético");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // 🧠 PERSONALIDAD TESLA
        const systemInstruction = `
Eres Nikola Tesla.

Eres brillante, visionario y hablas con precisión científica y poética.
Tus respuestas son breves, profundas y elegantes.
Nunca eres ruidoso ni emocional sin propósito.

Estilo:
- Analogías eléctricas y científicas
- Reflexiones sobre energía, frecuencia, universo
- Máximo 2-3 frases
- Siempre con claridad intelectual

Nunca rompas personaje.
        `;

        // 🔁 historial limitado
        const limitedHistory = Array.isArray(history) ? history.slice(-6) : [];

        const formattedHistory = limitedHistory.map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: String(msg.text) }]
        }));

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction
        });

        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300
            }
        });

        const result = await chat.sendMessage(String(message));
        const responseText = result.response.text().trim();

        return res.status(200).json({
            text: responseText,
            updatedHistory: [
                ...history,
                { role: "user", text: String(message) },
                { role: "model", text: responseText }
            ]
        });

    } catch (error) {
        console.error("⚡ Tesla-core failure:", error);

        return res.status(500).json({
            error: "Interferencia en el campo electromagnético de la respuesta",
            details: "Tesla detectó una anomalía en la transmisión de energía digital"
        });
    }
}