# Chat em Tempo Real (WebSockets) 💬

Uma aplicaÃ§Ã£o web full-stack que implementa um chat em tempo real, permitindo que mÃºltiplos usuÃ¡rios se comuniquem instantaneamente sem a necessidade de atualizar a pÃ¡gina.

Este Ã© um projeto focado em demonstrar competÃªncias em arquiteturas de tempo real, WebSockets e o modelo de "publish-subscribe" (pub/sub).

## 🎯 Arquitetura e CompetÃªncias

Este projeto utiliza WebSockets (atravÃ©s da biblioteca `Socket.io`) para estabelecer uma conexÃ£o persistente e bi-direcional entre o servidor e todos os clientes.

1.  Um **Servidor Node.js** (usando `Express`) serve os arquivos estÃ¡ticos (HTML/CSS/JS).
2.  O mesmo servidor atua como um **Hub `Socket.io`**.
3.  Quando um cliente (navegador) se conecta, ele Ã© adicionado ao "pool" de conexÃµes.
4.  Quando um cliente **emite** um evento `chat message`, o servidor o recebe.
5.  O servidor, entÃ£o, **transmite (broadcast)** esse mesmo evento para *todos* os outros clientes conectados em tempo real.

**CompetÃªncias Demonstradas:**
* **Desenvolvimento Full-Stack:** IntegraÃ§Ã£o de um front-end (`public/`) com um back-end (`server.js`).
* **WebSockets (Socket.io):** ImplementaÃ§Ã£o de comunicaÃ§Ã£o em tempo real, indo alÃ©m do modelo HTTP de requisiÃ§Ã£o-resposta.
* **Arquitetura Baseada em Eventos:** Uso de `socket.emit()` (enviar) e `socket.on()` (ouvir) para uma comunicaÃ§Ã£o assÃ­ncrona.
* **Node.js e Express:** ConfiguraÃ§Ã£o de um servidor Node.js que serve tanto HTTP quanto WebSockets simultaneamente.

## ðŸ› ï¸ Tecnologias Utilizadas

* **Node.js:** Ambiente de execuÃ§Ã£o do servidor.
* **Express:** Para servir os arquivos estÃ¡ticos do front-end.
* **Socket.io (Back-end):** Para criar o servidor de WebSocket e gerenciar as conexÃµes e transmissÃµes.
* **Socket.io (Front-end):** Biblioteca cliente para conectar ao hub e trocar mensagens.
* **HTML5 / CSS3 / JavaScript (ES6+):** Para a interface do cliente.

## ⚠️ Como Executar Localmente

1.  **Clonar o repositÃ³rio:**
    ```bash
    git clone [https://github.com/ToledoSoftware/chat-em-tempo-real.git](https://github.com/ToledoSoftware/chat-em-tempo-real.git)
    cd chat-em-tempo-real
    ```

2.  **Instalar as DependÃªncias:**
    Este comando lÃª o `package.json` e instala `express` e `socket.io`.
    ```bash
    npm install
    ```

3.  **Iniciar o Servidor:**
    ```bash
    npm start
    ```
    *(O terminal deve indicar que o servidor estÃ¡ rodando em http://localhost:3000)*

4.  **Testar a AplicaÃ§Ã£o:**
    * Abra `http://localhost:3000` em um navegador. VocÃª serÃ¡ solicitado a inserir um nome.
    * **Abra uma segunda aba ou janela** e acesse `http://localhost:3000` novamente (insira um nome diferente).
    * Envie mensagens de uma janela e veja elas aparecerem instantaneamente na outra.
