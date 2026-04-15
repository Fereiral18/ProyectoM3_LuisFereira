import { store } from './store.js';
import { renderChat } from './views/chat/chat.js';

export function setActiveView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));

    document.getElementById(`${viewId}-view`)?.classList.add('active-view');

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.route === viewId);
    });

    store.currentView = viewId;

    if (viewId === 'chat') {
        renderChat();
    }
}

export function navigateTo(route) {
    const url = new URL(window.location);
    url.searchParams.set('view', route);

    history.pushState({ view: route }, '', url);
    setActiveView(route);
}