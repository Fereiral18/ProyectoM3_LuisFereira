import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { message, system } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });

        // Construimos el prompt combinando system + user
        const prompt = `
${system || ""}

Usuario: ${message}
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ text });

    } catch (error) {
        console.error("Gemini error:", error);
        return res.status(500).json({
            error: "Error generating response"
        });
    }
}