⚡ README.md
# ⚡ Tesla ChatBot AI

ChatBot interactivo inspirado en **Nikola Tesla**, construido como una SPA moderna con JavaScript puro en frontend y un backend en Node.js.  
El bot responde con personalidad basada en Tesla utilizando la API de Google Generative AI.

---

## 🚀 Demo

> Aplicación tipo chat donde puedes conversar con un “Tesla virtual” entrenado con prompts personalizados.

---

## 🧠 Características

- 💬 Chat en tiempo real estilo WhatsApp
- ⚡ Personalidad basada en Nikola Tesla
- 🧩 Arquitectura SPA sin frameworks
- 🔁 Routing con History API
- 🤖 Integración con IA generativa (Google Gemini)
- 📱 Diseño responsive mobile-first
- ⏳ Indicador de “escribiendo…”
- 🧵 Separación modular del frontend
- 🌐 Backend con Express API
- ☁️ Deploy listo en Vercel

---

## 🛠️ Stack Tecnológico

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla ES Modules)

### Backend
- Node.js
- Express
- CORS
- dotenv
- Google Generative AI (@google/generative-ai)

### Deploy
- Vercel (frontend + serverless API)

---

## 📁 Estructura del Proyecto
```bash

.
├── index.html
├── styles.css
├── src/
│ ├── components/
│ │ ├── main.js
│ │ ├── router/
│ │ ├── chat/
│ │ ├── bot/
│ │ ├── services/
│ │ ├── utils/
│ │ ├── events/
│ │ ├── render/
│ │ ├── dom/
│ │ └── state/
│ └── ...
├── backend/
│ ├── server.js
│ ├── routes/
│ │ └── chat.js
│ ├── services/
│ │ └── gemini.js
│ ├── package.json
│ └── .env
├── api/
│ └── chat.js
├── package.json
└── vercel.json

```
---

## ⚙️ Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/tesla-chatbot.git
cd tesla-chatbot
2. Instalar dependencias backend
cd backend
npm install
3. Configurar variables de entorno

Crear archivo .env en /backend:

GEMINI_API_KEY=tu_api_key_aqui
PORT=3000
4. Ejecutar servidor backend
npm start

5. Ejecutar frontend

Puedes usar Live Server o simplemente abrir:

index.html
```
## 🤖 IA del Bot (Tesla Persona)

### El chatbot está configurado con un prompt especial:

“Eres Nikola Tesla, un genio inventor y científico visionario...”

Esto permite respuestas con personalidad histórica, técnica y creativa.

## 📡 API Endpoints
POST /api/chat

Envía un mensaje al bot:

{
  "message": "Hola Tesla"
}

Respuesta:

{
  "reply": "..."
}

## ☁️ Deploy en Vercel

### El proyecto está preparado para desplegarse en Vercel:

vercel deploy
URL: https://proyecto-m3-luis-fereira.vercel.app/?view=home

Incluye:

frontend estático
serverless functions en /api

## 🧩 Arquitectura del Frontend

### El frontend está dividido en módulos:

router/ → navegación SPA
chat/ → lógica del chat
bot/ → respuestas y conexión IA
services/ → comunicación API
state/ → estado global
render/ → UI rendering
utils/ → helpers (scroll, format time)
events/ → manejo de eventos DOM

## ✨ Futuras mejoras
 ### Streaming de respuestas en tiempo real
 Memoria conversacional persistente
 Voz (speech-to-text / text-to-speech)
 Autenticación de usuarios
 Historias de chat guardadas
 Animaciones tipo iMessage

## 👨‍💻 Autor

### Proyecto desarrollado como práctica de:

SPAs sin frameworks
Arquitectura modular en JavaScript
Integración con IA generativa
UX tipo chat moderno

Produccion/URL : https://proyecto-m3-luis-fereira.vercel.app/?view=home

## ⚡ Inspiración

### Basado en Nikola Tesla — ciencia, innovación y visión futurista.

```

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

Puedes usarlo, modificarlo y distribuirlo libremente con fines personales o comerciales, siempre que incluyas la atribución correspondiente.

Consulta el archivo `LICENSE` para más información.
