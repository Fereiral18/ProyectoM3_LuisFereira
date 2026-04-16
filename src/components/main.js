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
function setVh() {
  document.documentElement.style.setProperty(
    "--vh",
    window.innerHeight * 0.01
  );
}

setVh();
window.addEventListener("resize", setVh);

const chat = document.getElementById("chat-input");
const chatContainer = document.querySelector(".chat-container");

// cuando el input recibe foco
chat.addEventListener("focusin", () => {
  chatContainer.classList.add("input-active");
});

chat.addEventListener("focusout", () => {
  chatContainer.classList.remove("input-active");
});
initApp();