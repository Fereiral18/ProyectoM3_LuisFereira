import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("Missing GEMINI_API_KEY");
        }

        const { message, system } = req.body || {};

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        const prompt = `
${system || ""}
Usuario: ${message}
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("🔥 Gemini error:", error);

        return res.status(500).json({
            error: error.message || "Error generating response"
        });
    }
}