import { DOM } from "../dom/dom.js";
import { AppState } from "../state/appState.js";
import { formatTime } from "../utils/formatTime.js";

export const Render = {
    messages() {
        if (!DOM.messagesContainer) return;

        DOM.messagesContainer.innerHTML = '';

        AppState.messages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`;

            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.innerHTML = `${msg.text} <span class="timestamp">${formatTime(msg.timestamp)}</span>`;

            messageDiv.appendChild(bubble);
            DOM.messagesContainer.appendChild(messageDiv);
        });

        DOM.messagesContainer.scrollTop = DOM.messagesContainer.scrollHeight;
    },

    typingIndicator(show) {
        if (!DOM.messagesContainer) return;

        if (show) {
            if (document.querySelector('.typing-indicator')) return;

            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML =
                `<div class="typing-indicator"><span></span><span></span><span></span></div>`;

            DOM.messagesContainer.appendChild(typingDiv);
        } else {
            document.getElementById('typing-indicator')?.remove();
        }
    }
};