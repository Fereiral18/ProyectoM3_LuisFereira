import { DOM } from "../dom/dom.js";
import { Router } from "../router/router.js";
import { Chat } from "../chat/chat.js";

export const Events = {
    init() {
        DOM.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                Router.navigate(btn.dataset.route);
            });
        });

        DOM.goToChatBtn?.addEventListener('click', () => {
            Router.navigate('chat');
        });

        DOM.sendBtn?.addEventListener('click', () => Chat.handleSendMessage());

        DOM.chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                Chat.handleSendMessage();
            }
        });

        window.addEventListener('popstate', Router.handlePopState);
    }
};