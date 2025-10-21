# Analisador de Sentimentos (Full-Stack + IA) 🤖

Uma aplicação web full-stack que analisa o sentimento de uma frase inserida pelo usuário. O front-end (HTML/CSS/JS) envia o texto para um back-end (Node.js/Express) que, por sua vez, consulta uma API de IA (Hugging Face) para obter o resultado.

Competências utilizadas:

* **Front-end e Consumo de APIs** (Projeto 1)
* **Back-end, Proxy e IA** (Este projeto)
* **Automação e Web Scraping**
* **Lógica e Estrutura de Dados (Visual)**
* **WebSockets (Tempo Real)**

## 🎯 Objetivo e Arquitetura

O projeto demonstra como consumir uma API de IA de forma **segura** em um arquivo **.env** com uma implementação de uma **arquitetura de proxy**.

1.  O **Front-end** (`public/client.js`) não sabe nada sobre a chave de API. Ele apenas envia o texto para o nosso próprio back-end (`/analisar`).
2.  O **Back-end** (`server.js`) recebe a requisição.
3.  O Back-end secretamente anexa a chave de API (`HF_API_TOKEN` lida do arquivo `.env`) à requisição.
4.  O Back-end chama a API externa (Hugging Face).
5.  O Back-end processa a resposta da IA e a envia de volta ao front-end.

Esta arquitetura garante que a chave de API secreta **nunca** seja exposta ao navegador do usuário.

## 🛠️ Tecnologias Utilizadas

### Front-end (Pasta `/public`)

* **HTML5:** Estrutura da página.
* **CSS3:** Estilização moderna (Flexbox).
* **JavaScript (ES6+):**
    * **Fetch API:** Para fazer chamadas (POST) ao *nosso* back-end.

### Back-end (Raiz do projeto)

* **Node.js:** Ambiente de execução do servidor.
* **Express.js:** Para criar o servidor web e o endpoint `/analisar`.
* **dotenv:** Para carregar variáveis de ambiente (a chave da API) do arquivo `.env`.
* **cors:** Para permitir que o front-end (em `localhost`) se comunique com o back-end (em `localhost`).
* **Hugging Face Inference API:** A API externa de IA usada para a análise de sentimento (utilizando o modelo `nlptown/bert-base-multilingual-uncased-sentiment`).

## ⚙️ Como Executar Localmente

1.  **Clonar o repositório:**
    *(Substitua `NOME-DO-REPO` pelo nome que deu a este repositório)*
    ```bash
    git clone [https://github.com/ToledoSoftware/analisador-sentimentos.git](https://github.com/ToledoSoftware/analisador-sentimentos.git)
    cd analisador-sentimentos
    ```

2.  **Instalar as dependências do Back-end:**
    Este comando lê o `package.json` e instala o Express, dotenv, etc.
    ```bash
    npm install
    ```

3.  **Configurar a Chave da API (Hugging Face):**
    * Crie uma conta gratuita no [Hugging Face](https://huggingface.co/join).
    * Vá em **Settings > Access Tokens** e gere um novo token com a função "read".
    * Crie um arquivo chamado `.env` na raiz do projeto.
    * Adicione sua chave ao arquivo `.env`:
    ```
    HF_API_TOKEN=hf_SUA_CHAVE_DE_API_AQUI
    ```

4.  **Iniciar o Servidor:**
    ```bash
    npm start
    ```
    (Ou `node server.js`)

5.  **Abrir a Aplicação:**
    * O terminal mostrará: `Servidor (Hugging Face) rodando em http://localhost:3000`.
    * Abra este endereço (`http://localhost:3000`) no seu navegador.