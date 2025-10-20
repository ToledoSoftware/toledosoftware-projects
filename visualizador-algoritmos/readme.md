# Visualizador de Algoritmos (Dijkstra) 🗺️

Uma aplicaÃ§Ã£o web interativa que demonstra visualmente o funcionamento do Algoritmo de Dijkstra para encontrar o caminho mais curto (*pathfinding*). O usuÃ¡rio pode desenhar obstÃ¡culos (paredes) em uma grade e, em seguida, iniciar a animaÃ§Ã£o para ver o algoritmo explorar a grade e encontrar o caminho mais curto entre um ponto de inÃ­cio e um ponto de fim.

Demonstra competÃªncias prÃ¡ticas:

* **Front-end e Consumo de APIs** (Projeto 1)
* **Back-end, Proxy e IA** (Projeto 2)
* **AutomaÃ§Ã£o e Web Scraping** (Projeto 3)
* **LÃ³gica e Estrutura de Dados** (Este projeto)
* **WebSockets (Tempo Real)**

## 🎯 CompetÃªncias Demonstradas

Este projeto Ã© focado em lÃ³gica pura, estruturas de dados e manipulaÃ§Ã£o avanÃ§ada do DOM:

* **ImplementaÃ§Ã£o de Algoritmos:** Escrita da lÃ³gica do Algoritmo de Dijkstra do zero, incluindo o conceito de "distÃ¢ncias" e "nÃ³s anteriores".
* **Estruturas de Dados:** Uso de um Array 2D como modelo de dados principal para a grade.
* **ManipulaÃ§Ã£o DinÃ¢mica do DOM:** GeraÃ§Ã£o de uma grade de `divs` (NÃ³s) inteiramente via JavaScript, e atualizaÃ§Ã£o de suas classes (`.node-wall`, `.node-visited`) em tempo real.
* **GestÃ£o de Estado:** Controle do estado da aplicaÃ§Ã£o (ex: `isMouseDown`, `isRunning`) para gerenciar a interaÃ§Ã£o do usuÃ¡rio (desenhar paredes).
* **JavaScript AssÃ­ncrono (AnimaÃ§Ã£o):** Uso de `async/await`, `Promise` e `setTimeout` para criar animaÃ§Ãµes visuais que mostram a *ordem* em que o algoritmo visita os nÃ³s, tornando um conceito abstrato fÃ¡cil de entender.
* **CSS AvanÃ§ado:** Uso de CSS Grid para a estrutura da grade e `@keyframes` para as animaÃ§Ãµes de visitaÃ§Ã£o e de caminho.

## ðŸ› ï¸ Tecnologias Utilizadas

* **HTML5:** Estrutura da pÃ¡gina (grade e botÃµes).
* **CSS3:** EstilizaÃ§Ã£o da grade, dos estados dos nÃ³s (parede, inÃ­cio, fim) e das animaÃ§Ãµes (`@keyframes`).
* **JavaScript (ES6+):** LÃ³gica principal, incluindo:
    * GeraÃ§Ã£o da grade (DOM).
    * Manipuladores de eventos de mouse (mousedown, mouseenter, mouseup).
    * ImplementaÃ§Ã£o do algoritmo de Dijkstra.

## ⚠️ Como Executar

Este projeto Ã© 100% front-end e pode ser executado localmente sem a necessidade de um servidor.

1.  **Clonar o repositÃ³rio:**
    ```bash
    git clone [https://github.com/ToledoSoftware/visualizador-algoritmos.git](https://github.com/ToledoSoftware/visualizador-algoritmos.git)
    cd visualizador-algoritmos
    ```

2.  **Abrir a aplicaÃ§Ã£o:**
    * Abra o arquivo `index.html` diretamente no seu navegador de preferÃªncia.

3.  **Como usar:**
    * A grade serÃ¡ gerada com um ponto de InÃ­cio (verde) e Fim (vermelho).
    * Clique e arraste o mouse sobre as cÃ©lulas vazias para desenhar "paredes" (obstÃ¡culos).
    * Clique no botÃ£o **"Visualizar"** para iniciar a animaÃ§Ã£o.
    * Clique em **"Limpar Grade"** para resetar tudo (incluindo as paredes).
