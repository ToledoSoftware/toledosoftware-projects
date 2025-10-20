# Projeto 3: Monitor de PreÃ§os (Web Scraping com Python) 🐍

Um script de automaÃ§Ã£o que monitora o preÃ§o de um produto em um site de e-commerce (Amazon). O programa utiliza Python para realizar *web scraping*, extrair o preÃ§o atual e comparÃ¡-lo com um valor-alvo definido pelo usuÃ¡rio.

Este projeto demonstra competÃªncias prÃ¡ticas:

* **Front-end e Consumo de APIs** (Projeto 1)
* **Back-end, Proxy e IA** (Projeto 2)
* **AutomaÃ§Ã£o e Web Scraping** (Este projeto)
* **LÃ³gica e Estrutura de Dados (Visual)**
* **WebSockets (Tempo Real)**

## 🎯 CompetÃªncias Demonstradas

Este projeto foca em lÃ³gica de back-end e automaÃ§Ã£o, demonstrando:

* **Web Scraping:** UtilizaÃ§Ã£o das bibliotecas `requests` (para baixar o HTML) e `BeautifulSoup` (para "ler" e filtrar o HTML).
* **SimulaÃ§Ã£o de Navegador:** ImplementaÃ§Ã£o de `Headers` (como `User-Agent`) para evitar bloqueios de *bots* pelo servidor da Amazon.
* **Limpeza de Dados (Data Cleaning):** CriaÃ§Ã£o de uma funÃ§Ã£o (`limpar_preco`) para converter dados de texto "sujos" (ex: "R$ 476,10") em dados numÃ©ricos puros (ex: `476.10`) para possibilitar a lÃ³gica de programaÃ§Ã£o.
* **LÃ³gica de ProgramaÃ§Ã£o com Python:** ComparaÃ§Ã£o de valores e exibiÃ§Ã£o de resultados condicionais.
* **Gerenciamento de Pacotes Python:** Uso de `venv` (ambiente virtual) e `requirements.txt` para um gerenciamento de dependÃªncias limpo e replicÃ¡vel.

## âš ï¸ Aviso Importante sobre Web Scraping

Scripts de *web scraping* sÃ£o, por natureza, "frÃ¡geis". O funcionamento deste script depende **diretamente** da estrutura HTML do site da Amazon (ex: o `id="productTitle"` e a classe `class="a-offscreen"`).

Se a Amazon decidir alterar o design do seu site (o que acontece), este script pode "quebrar" e precisarÃ¡ de manutenÃ§Ã£o. Isso Ã© uma caracterÃ­stica fundamental de todos os projetos de scraping.

## ðŸ› ï¸ Tecnologias Utilizadas

* **Python 3**
* **Requests:** Para fazer as requisiÃ§Ãµes HTTP.
* **BeautifulSoup4 (bs4):** Para fazer o *parsing* (anÃ¡lise) do HTML.
* **venv:** Para gerenciamento do ambiente virtual.

## ⚠️ Como Executar Localmente

1.  **Clonar o repositÃ³rio:***
    ```bash
    git clone [https://github.com/ToledoSoftware/monitor-preÃ§os.git](https://github.com/ToledoSoftware/monitor-preÃ§os.git)
    cd NOME-DO-REPO
    ```

2.  **Criar e Ativar o Ambiente Virtual (venv):**
    ```bash
    # Criar o ambiente
    python -m venv venv
    
    # Ativar o ambiente (Windows)
    .\venv\Scripts\activate
    ```
    *(Seu terminal deve agora mostrar (venv) no inÃ­cio da linha)*

3.  **Instalar as DependÃªncias:**
    Este comando lÃª o `requirements.txt`.
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configurar o Script (Opcional):**
    * Abra o arquivo `monitor.py`.
    * VocÃª pode alterar a variÃ¡vel `URL` para qualquer outro produto da Amazon.
    * VocÃª pode alterar a variÃ¡vel `PRECO_ALVO` para o valor que desejar.

5.  **Executar o Script:**
    ```bash
    python monitor.py
    ```

## 🚀 PrÃ³ximos Passos (ExtensÃµes)

Este script serve como base para uma automaÃ§Ã£o completa. Ele pode ser estendido para:
* Enviar um e-mail (usando `smtplib`) ou uma notificaÃ§Ã£o (usando outra API) quando o preÃ§o baixar.
* Rodar automaticamente em um servidor (usando `cron jobs` ou o Agendador de Tarefas do Windows) para verificar o preÃ§o uma vez por dia.
