# Classificador de Imagens com TensorFlow.js

Este projeto é uma aplicação web de front-end que utiliza a biblioteca TensorFlow.js para classificar imagens em tempo real no navegador. É uma demonstração prática da integração de modelos de Machine Learning em aplicações JavaScript.

## ✨ Funcionalidades

-   Permite que o usuário faça o upload de qualquer arquivo de imagem.
-   Exibe uma pré-visualização da imagem selecionada.
-   Carrega o modelo de classificação de imagens pré-treinado **MobileNet**.
-   Analisa a imagem e exibe as 3 principais previsões, junto com a porcentagem de confiança de cada uma.

## 🛠️ Tecnologias Utilizadas

-   **HTML5**
-   **CSS3**
-   **JavaScript**
-   **TensorFlow.js** (via CDN)
-   **MobileNet Model** (via CDN)

## 🚀 Como Executar

Para executar o projeto, você precisa apenas de um navegador web moderno e uma conexão com a internet.

1.  **Clone o repositório principal:**
    ```bash
    git clone [https://github.com/ToledoSoftware/toledosoftware-projects.git](https://github.com/ToledoSoftware/toledosoftware-projects.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd toledosoftware-projects/js-image-classifier
    ```

3.  **Abra o arquivo `index.html`:**
    -   A maneira mais fácil é usando a extensão **Live Server** no VS Code (clique com o botão direito no arquivo e selecione "Open with Live Server").
    -   Alternativamente, você pode abrir o arquivo `index.html` diretamente no seu navegador.

**Nota:** A primeira classificação pode demorar um pouco, pois seu navegador precisa baixar o modelo de IA (cerca de 5MB). As classificações subsequentes serão instantâneas.