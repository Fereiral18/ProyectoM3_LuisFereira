import { DOM } from "../dom/dom.js";
import { AppState } from "../state/appState.js";
import { Render } from "../render/render.js";
import { formatTime } from "../utils/formatTime.js";

export const Router = {
    setView(viewId) {
        DOM.homeView.classList.remove('active-view');
        DOM.chatView.classList.remove('active-view');
        DOM.aboutView.classList.remove('active-view');

        if (viewId === 'home') DOM.homeView.classList.add('active-view');
        if (viewId === 'chat') DOM.chatView.classList.add('active-view');
        if (viewId === 'about') DOM.aboutView.classList.add('active-view');

        DOM.navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.route === viewId);
        });

        AppState.currentView = viewId;

        if (viewId === 'chat') {
            Render.messages();
            DOM.messagesContainer.scrollTop = DOM.messagesContainer.scrollHeight;
            DOM.chatInput?.focus();
        }
    },

    navigate(route, addToHistory = true) {
        const valid = ['home', 'chat', 'about'];
        if (!valid.includes(route)) route = 'home';

        if (addToHistory) {
            const url = new URL(window.location.href);
            url.searchParams.set('view', route);
            history.pushState({ view: route }, '', url);
        }

        this.setView(route);
    },

    initFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const view = params.get('view');

        if (view) this.setView(view);
        else this.setView('home');

        const welcomeTime = document.getElementById('welcome-time');
        if (welcomeTime) welcomeTime.textContent = formatTime(new Date());

        Render.messages();
    },

   handlePopState(event) {
    const view = event.state?.view || 'home';
    Router.setView(view);
}
};