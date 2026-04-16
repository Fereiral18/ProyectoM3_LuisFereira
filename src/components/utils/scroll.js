export function scrollToBottom() {
    const container = document.getElementById("messages-container");
    if (!container) return;

    container.scrollTop = container.scrollHeight;
}