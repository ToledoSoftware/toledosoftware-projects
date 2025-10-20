
// Esta linha mÃ¡gica se conecta ao servidor Socket.io
// que estÃ¡ servindo esta pÃ¡gina.
const socket = io();

// Pede ao usuÃ¡rio um nome assim que ele entra
const username = prompt("Qual Ã© o seu nome?") || "AnÃ´nimo";

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');


form.addEventListener('submit', (e) => {
    e.preventDefault(); // Impede o recarregamento da pÃ¡gina

    if (input.value) {
        const msgObject = {
            user: username,
            text: input.value
        };
        
        // O servidor receberÃ¡ este objeto
        socket.emit('chat message', msgObject);
        
        input.value = '';
    }
});


// Fica "ouvindo" o evento 'chat message' que o SERVIDOR nos envia
socket.on('chat message', (msgObject) => {
    const item = document.createElement('li');
    
    // Usamos innerHTML para renderizar o <strong>
    // Em um app real, sanitizarÃ­amos isso para evitar ataques XSS
    item.innerHTML = `<strong>${msgObject.user}</strong> ${msgObject.text}`;
    
    messages.appendChild(item);
    
    // Rola a janela para o fundo para ver a Ãºltima mensagem
    window.scrollTo(0, document.body.scrollHeight);
});
