export async function chatWithGemini(system, message) {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: `${system}\n\nUsuario: ${message}` }
                        ]
                    }
                ]
            })
        }
    );

    const data = await res.json();

    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2));

    // 🚨 1. detectar error real
    if (data.error) {
        console.error("GEMINI ERROR:", data.error);
        throw new Error(data.error.message);
    }

    // 🚨 2. validar candidates
    if (!data.candidates || data.candidates.length === 0) {
        console.error("No candidates:", data);
        return "No hubo respuesta de Gemini.";
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        console.error("Estructura inesperada:", data);
        return "Respuesta sin texto.";
    }

    return text;
}