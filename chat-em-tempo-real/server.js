import express from 'express';
import { createServer } from 'node:http'; // MÃ³dulo HTTP nativo do Node
import { Server } from 'socket.io'; // Importa o Socket.io Server

const app = express();
// Criamos um servidor HTTP *usando* o Express.
// O Socket.io precisa se anexar ao servidor HTTP nativo.
const server = createServer(app);

// Inicia o Socket.io e anexa-o ao servidor HTTP
// O 'cors' permite que nosso front-end (mesmo em localhost) se conecte
const io = new Server(server, {
    cors: {
        origin: "*", // Em produÃ§Ã£o, restrinja isso ao seu domÃ­nio
    }
});

const port = 3000;

// Diz ao Express para servir os ficheiros estÃ¡ticos da pasta 'public'
app.use(express.static('public'));


// io.on('connection', ...) corre CADA VEZ que um novo usuÃ¡rio abre a pÃ¡gina
io.on('connection', (socket) => {
    console.log(`Um usuÃ¡rio se conectou. ID: ${socket.id}`);

    // Fica "ouvindo" por um evento de 'disconnect' (ex: fechar a aba)
    socket.on('disconnect', () => {
        console.log(`UsuÃ¡rio ${socket.id} desconectou.`);
    });

    // Fica "ouvindo" pelo evento 'chat message' que o cliente vai nos enviar
    socket.on('chat message', (msgObject) => {
        // msgObject Ã© o objeto { user: 'Nome', text: 'Mensagem' }
        console.log(`Mensagem recebida: ${msgObject.user}: ${msgObject.text}`);
        
        // io.emit(...) envia o evento para TODOS os clientes conectados
        // (incluindo o que enviou)
        io.emit('chat message', msgObject);
    });
});

// NOTA: Usamos server.listen() em vez de app.listen()
server.listen(port, () => {
    console.log(`Servidor de chat rodando em http://localhost:${port}`);
});
