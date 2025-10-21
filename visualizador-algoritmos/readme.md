# Visualizador de Algoritmos (Dijkstra) 🗺️

Uma aplicação web interativa que demonstra visualmente o funcionamento do Algoritmo de Dijkstra para encontrar o caminho mais curto (*pathfinding*). O usuário pode desenhar obstáculos (paredes) em uma grade e, em seguida, iniciar a animação para ver o algoritmo explorar a grade e encontrar o caminho mais curto entre um ponto de início e um ponto de fim.

Demonstra competências práticas:

* **Front-end e Consumo de APIs** (Projeto 1)
* **Back-end, Proxy e IA** (Projeto 2)
* **Automação e Web Scraping** (Projeto 3)
* **Lógica e Estrutura de Dados** (Este projeto)
* **WebSockets (Tempo Real)**

## 🎯 Competências Demonstradas

Este projeto é focado em lógica pura, estruturas de dados e manipulação avançada do DOM:

* **Implementação de Algoritmos:** Escrita da lógica do Algoritmo de Dijkstra do zero, incluindo o conceito de "distâncias" e "nós anteriores".
* **Estruturas de Dados:** Uso de um Array 2D como modelo de dados principal para a grade.
* **Manipulação Dinâmica do DOM:** Geração de uma grade de `divs` (Nós) inteiramente via JavaScript, e atualização de suas classes (`.node-wall`, `.node-visited`) em tempo real.
* **Gestão de Estado:** Controle do estado da aplicação (ex: `isMouseDown`, `isRunning`) para gerenciar a interação do usuário (desenhar paredes).
* **JavaScript Assíncrono (Animação):** Uso de `async/await`, `Promise` e `setTimeout` para criar animações visuais que mostram a *ordem* em que o algoritmo visita os nós, tornando um conceito abstrato fácil de entender.
* **CSS Avançado:** Uso de CSS Grid para a estrutura da grade e `@keyframes` para as animações de visitação e de caminho.

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura da página (grade e botões).
* **CSS3:** Estilização da grade, dos estados dos nós (parede, início, fim) e das animações (`@keyframes`).
* **JavaScript (ES6+):** Lógica principal, incluindo:
    * Geração da grade (DOM).
    * Manipuladores de eventos de mouse (mousedown, mouseenter, mouseup).
    * Implementação do algoritmo de Dijkstra.

## ⚠️ Como Executar

Este projeto é 100% front-end e pode ser executado localmente sem a necessidade de um servidor.

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/ToledoSoftware/visualizador-algoritmos.git](https://github.com/ToledoSoftware/visualizador-algoritmos.git)
    cd visualizador-algoritmos
    ```

2.  **Abrir a aplicação:**
    * Abra o arquivo `index.html` diretamente no seu navegador de preferência.

3.  **Como usar:**
    * A grade será gerada com um ponto de Início (verde) e Fim (vermelho).
    * Clique e arraste o mouse sobre as células vazias para desenhar "paredes" (obstáculos).
    * Clique no botão **"Visualizar"** para iniciar a animação.
    * Clique em **"Limpar Grade"** para resetar tudo (incluindo as paredes).