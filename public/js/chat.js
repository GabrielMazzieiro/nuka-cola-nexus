document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    // Handle form submission and send message
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('chat message', message);
            messageInput.value = '';
        }
    });

    // Listen for new messages from server
    socket.on('chat message', (msg) => {
        const li = document.createElement('li');
        li.textContent = msg;
        chatMessages.appendChild(li);
    });
});