import { DOM } from "../dom/dom.js";
import { AppState } from "../state/appState.js";
import { formatTime } from "../utils/formatTime.js";
import { isAtBottom, scrollToBottom } from "../utils/scroll.js";

export const Render = {
    messages() {
    if (!DOM.messagesContainer) return;

    const container = DOM.messagesContainer;

    // 🚨 1. guardar estado ANTES de tocar el DOM
    const shouldScroll =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

    // 🚨 2. render
    container.innerHTML = '';

    AppState.messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`;

        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        bubble.innerHTML = `
            ${msg.text}
            <span class="timestamp">${formatTime(msg.timestamp)}</span>
        `;

        messageDiv.appendChild(bubble);
        container.appendChild(messageDiv);
    });

    // 🚨 3. scroll solo si corresponde
    if (shouldScroll) {
        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    }
},

    
    typingIndicator(show) {
    if (!DOM.messagesContainer) return;

    const container = DOM.messagesContainer;

    if (show) {
        if (document.querySelector('.typing-indicator')) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML =
            `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

        container.appendChild(typingDiv);

        requestAnimationFrame(() => {
            container.scrollTop = container.scrollHeight;
        });
    } else {
        document.getElementById('typing-indicator')?.remove();
    }
}
};