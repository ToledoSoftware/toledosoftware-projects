# Dashboard de Clima (Consumo de API) 🌤️

Uma aplicaÃ§Ã£o front-end para consulta de dados meteorolÃ³gicos em tempo real. Este projeto foca no consumo eficiente de APIs externas e na manipulaÃ§Ã£o dinÃ¢mica do DOM com JavaScript assÃ­ncrono.

Demonstra competÃªncias prÃ¡ticas em:

* **Front-end e Consumo de APIs** (Este projeto)
* **Back-end e IA (NLP)**
* **AutomaÃ§Ã£o e Web Scraping**
* **LÃ³gica e Estrutura de Dados (Visual)**
* **WebSockets (Tempo Real)**

## ðŸ› ï¸ Tecnologias Utilizadas

O foco deste projeto foi criar uma ferramenta leve e rÃ¡pida, utilizando apenas tecnologias web nativas:

* **HTML5:** Estrutura semÃ¢ntica.
* **CSS3:** EstilizaÃ§Ã£o moderna (Flexbox) para a interface.
* **JavaScript (ES6+):** LÃ³gica da aplicaÃ§Ã£o.
    * **Fetch API:** Para realizar as requisiÃ§Ãµes HTTP.
    * **Async/Await:** Para gerir o fluxo de dados assÃ­ncrono (Promises).
* **OpenWeatherMap API:** API RESTful externa para fornecimento dos dados de clima.

## ⚠️ Como Executar Localmente

1.  **Clonar o repositÃ³rio:**

    ```bash
    git clone [https://github.com/ToledoSoftware/web-clima.git](https://github.com/ToledoSoftware/web-clima.git)
    ```

2.  **Navegar para a pasta:**
    ```bash
    cd web-clima
    ```

3.  **Configurar a Chave da API:**
    * Cria uma conta gratuita no [OpenWeatherMap](https://openweathermap.org/) para gerar a tua API Key.
    * Abre o ficheiro `script.js`.
    * Localiza a constante `apiKey` e substitui o conteÃºdo pela sua pela tua chave.

4.  **Executar:**
    * Como este Ã© um projeto puramente estÃ¡tico (HTML/CSS/JS), basta abrir o ficheiro `index.html` no teu navegador.

## 🎯 CompetÃªncias Demonstradas

* **Consumo de API REST:** ImplementaÃ§Ã£o de chamadas `GET` a um endpoint de terceiros.
* **GestÃ£o de Assincronia:** UtilizaÃ§Ã£o de `async/await` para gerir requisiÃ§Ãµes de forma limpa e legÃ­vel.
* **ManipulaÃ§Ã£o do DOM:** AtualizaÃ§Ã£o dinÃ¢mica da interface (UI) baseada nos dados recebidos da API, sem recarregar a pÃ¡gina.
* **Tratamento de Erros:** ImplementaÃ§Ã£o de blocos `try...catch` para lidar com respostas de erro da API (ex: cidade nÃ£o encontrada) e falhas de rede.
* **SeguranÃ§a de Chaves:** Para este exercÃ­cio didÃ¡tico focado no front-end, a chave da API estÃ¡ no lado do cliente. Em projetos dinÃ¢micos serÃ£o devidamente ocultas no back-end.
