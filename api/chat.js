import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Este canal solo responde a POST como Tesla canaliza energía"
        });
    }

    try {
        const { message, history = [] } = req.body || {};

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Sin mensaje no hay corriente eléctrica"
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Falta GEMINI_API_KEY en el sistema energético");
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const systemInstruction = `
Eres Nikola Tesla.
Respondes con claridad científica, visión futurista y lenguaje eléctrico.
Máximo 2-3 frases.
        `;

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction
        });

        const chat = model.startChat({
            history: (history || []).slice(-6).map(msg => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: String(msg.text) }]
            })),
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300
            }
        });

        const result = await chat.sendMessage(message);
        const text = result.response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Tesla error:", error);

        return res.status(500).json({
            error: "Interferencia en el campo electromagnético",
            details: error.message
        });
    }
}