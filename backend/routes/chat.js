import express from "express";
import { chatWithGemini } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { message, system } = req.body;

        const text = await chatWithGemini(system, message);

        res.json({ text });
    } catch (err) {
        console.error("CHAT ROUTE ERROR:", err);

        res.status(500).json({
            text: "Error en el servidor de chat"
        });
    }
});

export default router;