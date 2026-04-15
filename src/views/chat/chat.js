import { store } from '../../store.js';

const messagesContainer = document.getElementById('messages-container');
const chatInput = document.getElementById('chat-input');

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function renderChat() {
    renderMessages();
}

function renderMessages() {
    messagesContainer.innerHTML = '';

    store.messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`;

        div.innerHTML = `
            <div class="bubble">
                ${msg.text}
                <span class="timestamp">${formatTime(msg.timestamp)}</span>
            </div>
        `;

        messagesContainer.appendChild(div);
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotReply(text) {
    const lower = text.toLowerCase();

    if (lower.includes('hola')) return '¡Hola! 😊';
    if (lower.includes('clima')) return 'No tengo datos en tiempo real 🌤️';

    return `Dijiste: "${text}"`;
}

export function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    store.messages.push({
        role: 'user',
        text,
        timestamp: new Date()
    });

    chatInput.value = '';
    renderMessages();

    setTimeout(() => {
        store.messages.push({
            role: 'bot',
            text: getBotReply(text),
            timestamp: new Date()
        });

        renderMessages();
    }, 1000);
}