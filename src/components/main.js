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

initApp();