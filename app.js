import { navigateTo, setActiveView } from './router.js';
import { initHome } from './views/home/home.js';
import { sendMessage } from './views/chat/chat.js';

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        navigateTo(btn.dataset.route);
    });
});

document.getElementById('send-btn')
    ?.addEventListener('click', sendMessage);

document.getElementById('chat-input')
    ?.addEventListener('keypress', e => {
        if (e.key === 'Enter') sendMessage();
    });

initHome();

// routing inicial
const params = new URLSearchParams(window.location.search);
const view = params.get('view') || 'home';

setActiveView(view);

window.addEventListener('popstate', e => {
    const view = e.state?.view || 'home';
    setActiveView(view);
});