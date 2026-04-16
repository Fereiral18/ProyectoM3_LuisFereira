import { DOM } from "../dom/dom.js";

export function isAtBottom() {
    const el = DOM.messagesContainer;

    return el.scrollHeight - el.scrollTop <= el.clientHeight + 80;
}

export function scrollToBottom() {
    const el = DOM.messagesContainer;
    el.scrollTop = el.scrollHeight;
}