const chatInput = document.getElementById("chat-input");
const inputArea = document.getElementById("input-area");
import { Render } from "./render/render.js";
import { Router } from "./router/router.js";
import { Events } from "./events/events.js";
import { AppState } from "./state/appState.js";

function initApp() {
    Render.messages();
    Router.initFromUrl();
    Events.init();

    setInterval(() => {
        if (AppState.currentView === 'chat') {
            Render.messages();
        }
    }, 60000);
}
const messagesContainer = document.getElementById("messages-container");

export function scrollToBottom() {
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
export function isAtBottom() {
  return messagesContainer.scrollHeight - messagesContainer.scrollTop <= messagesContainer.clientHeight + 50;
}
initApp();