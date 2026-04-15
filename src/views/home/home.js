import { navigateTo } from '../../router.js';

export function initHome() {
    document.getElementById('go-to-chat-btn')
        ?.addEventListener('click', () => navigateTo('chat'));
}