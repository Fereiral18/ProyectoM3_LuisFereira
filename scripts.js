// ==================== ESTADO GLOBAL ====================
    let currentView = 'home';      // 'home', 'chat', 'about'
    
    // Datos del chat (mensajes)
    let messages = [
        { role: 'bot', text: '👋 ¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?', timestamp: new Date() }
    ];
    
    let isBotTyping = false;
    let typingTimeout = null;
    
    // Elementos DOM
    const homeView = document.getElementById('home-view');
    const chatView = document.getElementById('chat-view');
    const aboutView = document.getElementById('about-view');
    const navBtns = document.querySelectorAll('.nav-btn');
    const messagesContainer = document.getElementById('messages-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const goToChatBtn = document.getElementById('go-to-chat-btn');
    
    // ==================== FUNCIONES DE RENDERIZADO ====================
    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // Renderizar todos los mensajes del chat
    function renderMessages() {
        if (!messagesContainer) return;
        messagesContainer.innerHTML = '';
        
        messages.forEach((msg, idx) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`;
            
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            bubble.innerHTML = `${msg.text} <span class="timestamp">${formatTime(msg.timestamp)}</span>`;
            
            messageDiv.appendChild(bubble);
            messagesContainer.appendChild(messageDiv);
        });
        
        // Auto-scroll al final
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Mostrar indicador "escribiendo..."
    function showTypingIndicator() {
        if (!messagesContainer) return;
        // Evitar duplicados
        if (document.querySelector('.typing-indicator')) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `<div class="typing-indicator"><span></span><span></span><span></span></div>`;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }
    
    // Respuesta inteligente simulada (respuestas contextuales)
    function getBotReply(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes('hola') || lowerMsg.includes('buenas') || lowerMsg.includes('hey')) {
            return '¡Hola! 😊 ¿Cómo estás? Cuéntame, ¿en qué te ayudo?';
        } else if (lowerMsg.includes('como estas') || lowerMsg.includes('cómo estás')) {
            return '¡Estoy genial! Gracias por preguntar. Listo para conversar contigo. ✨';
        } else if (lowerMsg.includes('clima') || lowerMsg.includes('tiempo')) {
            return 'Actualmente no tengo acceso a datos en tiempo real, pero puedo sugerirte revisar tu app del clima favorita 🌤️';
        } else if (lowerMsg.includes('gracias')) {
            return '¡De nada! Para eso estoy. Si necesitas algo más, aquí ando 🤗';
        } else if (lowerMsg.includes('ayuda') || lowerMsg.includes('funciones')) {
            return 'Puedo responder preguntas básicas, saludar, darte información sobre esta app y conversar. Pregúntame lo que quieras. 💡';
        } else if (lowerMsg.includes('creador') || lowerMsg.includes('desarrollador')) {
            return 'Esta app fue desarrollada como demo de SPA con History API y diseño responsive. ¡Un proyecto frontend moderno! 🚀';
        } else {
            return `Entendí que dices: "${userMessage}". Soy un asistente simple, pero puedo ayudarte con preguntas básicas. ¿Quieres preguntar algo más?`;
        }
    }
    
    // Agregar mensaje del usuario y obtener respuesta del bot (con typing)
    function addUserMessageAndRespond(text) {
        if (!text.trim()) return;
        
        // Agregar mensaje de usuario
        const userMsgObj = { role: 'user', text: text, timestamp: new Date() };
        messages.push(userMsgObj);
        renderMessages();
        
        // Limpiar input
        chatInput.value = '';
        
        // Simular que el bot está escribiendo
        if (typingTimeout) clearTimeout(typingTimeout);
        isBotTyping = true;
        showTypingIndicator();
        
        typingTimeout = setTimeout(() => {
            // Obtener respuesta del bot
            const botReplyText = getBotReply(text);
            const botMsgObj = { role: 'bot', text: botReplyText, timestamp: new Date() };
            messages.push(botMsgObj);
            removeTypingIndicator();
            renderMessages();
            isBotTyping = false;
        }, 800 + Math.random() * 400); // delay más natural
    }
    
    // Enviar mensaje desde input
    function handleSendMessage() {
        if (isBotTyping) return;
        const messageText = chatInput.value.trim();
        if (messageText === '') return;
        addUserMessageAndRespond(messageText);
    }
    
    // ==================== ROUTING CON HISTORY API ====================
    function setActiveView(viewId) {
        // Ocultar todas las vistas
        homeView.classList.remove('active-view');
        chatView.classList.remove('active-view');
        aboutView.classList.remove('active-view');
        
        // Mostrar la vista seleccionada
        if (viewId === 'home') homeView.classList.add('active-view');
        if (viewId === 'chat') chatView.classList.add('active-view');
        if (viewId === 'about') aboutView.classList.add('active-view');
        
        // Actualizar botones activos
        navBtns.forEach(btn => {
            const route = btn.getAttribute('data-route');
            if (route === viewId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        currentView = viewId;
        
        // Pequeño ajuste: cuando se cambia a la vista chat, refrescar scroll y mensajes
        if (viewId === 'chat') {
            renderMessages(); // asegura que los mensajes estén actualizados
            if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
            chatInput?.focus();
        }
    }
    
    // Cambiar de ruta (pushState + actualizar UI)
    function navigateTo(route, addToHistory = true) {
        const validRoutes = ['home', 'chat', 'about'];
        if (!validRoutes.includes(route)) route = 'home';
        
        if (addToHistory) {
            const state = { view: route };
            const url = new URL(window.location.href);
            url.searchParams.set('view', route);
            history.pushState(state, '', url);
        }
        
        setActiveView(route);
    }
    
    // Manejar evento popstate (back/forward)
    window.addEventListener('popstate', (event) => {
        const state = event.state;
        let viewToLoad = 'home';
        if (state && state.view) {
            viewToLoad = state.view;
        } else {
            // leer query params como respaldo
            const params = new URLSearchParams(window.location.search);
            const viewParam = params.get('view');
            if (viewParam && ['home', 'chat', 'about'].includes(viewParam)) viewToLoad = viewParam;
        }
        setActiveView(viewToLoad);
    });
    
    // ==================== EVENTOS DE NAVEGACIÓN ====================
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const route = btn.getAttribute('data-route');
            navigateTo(route, true);
        });
    });
    
    // Botón desde Home hacia Chat
    if (goToChatBtn) {
        goToChatBtn.addEventListener('click', () => {
            navigateTo('chat', true);
        });
    }
    
    // Eventos de envío de mensajes
    if (sendBtn) sendBtn.addEventListener('click', handleSendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
            }
        });
    }
    
    // Inicializar la app según la URL al cargar
    function initRoutingFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const initialView = params.get('view');
        if (initialView && ['home', 'chat', 'about'].includes(initialView)) {
            setActiveView(initialView);
            // actualizar history state para consistencia
            const state = { view: initialView };
            history.replaceState(state, '', window.location.href);
        } else {
            // Vista por defecto: home, pero aseguramos state
            const defaultState = { view: 'home' };
            const url = new URL(window.location.href);
            if (!url.searchParams.has('view')) {
                url.searchParams.set('view', 'home');
                history.replaceState(defaultState, '', url);
            }
            setActiveView('home');
        }
        // Cargar timestamp inicial del mensaje de bienvenida en el chat
        const welcomeTimeSpan = document.getElementById('welcome-time');
        if (welcomeTimeSpan) {
            welcomeTimeSpan.textContent = formatTime(new Date());
        }
        renderMessages();
    }
    
    // Si el chat ya tiene mensajes almacenados en array, render inicial
    renderMessages();
    initRoutingFromUrl();
    
    // Opcional: Actualizar timestamp del mensaje de bienvenida al cambiar de hora (dinámico)
    setInterval(() => {
        if (currentView === 'chat') {
            renderMessages(); // refrescar timestamps en caso de que pasen minutos
        }
    }, 60000);
    
    // Prevenir que el indicador de escritura quede si hay errores, y evitar múltiples timers
    window.addEventListener('beforeunload', () => {
        if (typingTimeout) clearTimeout(typingTimeout);
    });