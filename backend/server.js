import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoute from "./routes/chat.js";


dotenv.config();
const app = express();

/* 🔥 1. CORS PRIMERO (OBLIGATORIO) */
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.use("/api/chat", chatRoute);

app.listen(3000, () => console.log("Server running"));

console.log("API KEY:", process.env.GEMINI_API_KEY);