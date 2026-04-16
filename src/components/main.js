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
function scrollToBottom() {
    const container = document.getElementById("messages-container");
    container.scrollTop = container.scrollHeight;
}

let lastHeight = window.innerHeight;

window.addEventListener("resize", () => {
    const currentHeight = window.innerHeight;

    // si cambió mucho, probablemente apareció/desapareció teclado
    if (Math.abs(lastHeight - currentHeight) > 100) {
        scrollToBottom();
    }

    lastHeight = currentHeight;
});
if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () => {
        scrollToBottom();
    });
}

initApp();