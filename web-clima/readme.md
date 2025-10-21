# Dashboard de Clima (Consumo de API) 🌤️

Uma aplicação front-end para consulta de dados meteorológicos em tempo real. Este projeto foca no consumo eficiente de APIs externas e na manipulação dinâmica do DOM com JavaScript assíncrono.

Demonstra competências práticas em:

* **Front-end e Consumo de APIs** (Este projeto)
* **Back-end e IA (NLP)**
* **Automação e Web Scraping**
* **Lógica e Estrutura de Dados (Visual)**
* **WebSockets (Tempo Real)**

## ⚙️ Tecnologias Utilizadas

O foco deste projeto foi criar uma ferramenta leve e rápida, utilizando apenas tecnologias web nativas:

* **HTML5:** Estrutura semântica.
* **CSS3:** Estilização moderna (Flexbox) para a interface.
* **JavaScript (ES6+):** Lógica da aplicação.
    * **Fetch API:** Para realizar as requisições HTTP.
    * **Async/Await:** Para gerir o fluxo de dados assíncrono (Promises).
* **OpenWeatherMap API:** API RESTful externa para fornecimento dos dados de clima.

## ⚠️ Como Executar Localmente

1.  **Clonar o repositório:**

    ```bash
    git clone [https://github.com/ToledoSoftware/web-clima.git](https://github.com/ToledoSoftware/web-clima.git)
    ```

2.  **Navegar para a pasta:**
    ```bash
    cd web-clima
    ```

3.  **Configurar a Chave da API:**
    * Crie uma conta gratuita no [OpenWeatherMap](https://openweathermap.org/) para gerar a sua API Key.
    * Abra o ficheiro `script.js`.
    * Localize a constante `apiKey` e substitua o conteúdo pela sua chave.

4.  **Executar:**
    * Como este é um projeto puramente estático (HTML/CSS/JS), basta abrir o ficheiro `index.html` no teu navegador.

## 🎯 Competências Demonstradas

* **Consumo de API REST:** Implementação de chamadas `GET` a um endpoint de terceiros.
* **Gestão de Assincronia:** Utilização de `async/await` para gerir requisições de forma limpa e legível.
* **Manipulação do DOM:** Atualização dinâmica da interface (UI) baseada nos dados recebidos da API, sem recarregar a página.
* **Tratamento de Erros:** Implementação de blocos `try...catch` para lidar com respostas de erro da API (ex: cidade não encontrada) e falhas de rede.
* **Segurança de Chaves:** Para este exercício didático focado no front-end, a chave da API está no lado do cliente. Em projetos dinâmicos, seriam devidamente ocultas no back-end.