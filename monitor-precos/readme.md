# 💰 Monitor de Preços (Web Scraper)

Um script em Python simples e eficiente para monitorar o preço de um produto específico em uma loja online (como Amazon) e alertar quando ele cair abaixo de um valor alvo.

Este projeto demonstra habilidades em Web Scraping e análise de dados HTML usando as bibliotecas padrão do Python.

## ✨ Funcionalidade

O script `monitor.py`:
1.  Faz uma requisição HTTP para a URL do produto, fingindo ser um navegador real para evitar bloqueios.
2.  Utiliza o Beautiful Soup para analisar o conteúdo HTML da página.
3.  Localiza o elemento de preço na página.
4.  Limpa e converte o texto do preço (ex: "R$ 476,10") em um número de ponto flutuante (ex: 476.10).
5.  Compara o preço atual com um `PRECO_ALVO` definido.
6.  Imprime uma mensagem de "SUCESSO" se o preço estiver abaixo ou igual ao alvo.

## 🛠️ Tecnologias Utilizadas

* **Python 3**
* **Requests:** Para fazer as requisições HTTP.
* **BeautifulSoup4:** Para a análise (parsing) do HTML e extração de dados.

## 🚀 Guia de Início Rápido

### 1. Pré-requisitos

Certifique-se de ter o Python 3 instalado em sua máquina.

### 2. Instalação das Dependências

Instale as bibliotecas necessárias listadas em `requirements.txt`:

```bash
pip install -r requirements.txt

### 3. Configuração (Obrigatória)

Antes de executar, você deve editar o arquivo `monitor.py` para configurar os detalhes da sua busca:

* **`URL`:** Altere para o link do produto que você deseja monitorar.
* **`PRECO_ALVO`:** Defina o valor máximo que você está disposto a pagar.
* **`HEADERS`:** **IMPORTANTE!** Sites como a Amazon bloqueiam scripts. Pesquise "my user agent" no Google e substitua o valor em `HEADERS` com o seu próprio User-Agent para simular um navegador real.

### 4. Execução

Execute o script a partir do seu terminal:

```bash
python monitor.py

O script irá imprimir o preço atual e informar se ele está dentro ou fora do seu alvo.