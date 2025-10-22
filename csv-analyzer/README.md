![Python](https://img.shields.io/badge/Python-3.x-blue.svg?style=for-the-badge&logo=python)
![Libraries](https://img.shields.io/badge/Libraries-Pandas%20%7C%20Matplotlib-orange.svg?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

# 📊 CSV Analyzer

Uma ferramenta de linha de comando interativa, criada com Python, para realizar análises exploratórias rápidas em arquivos CSV.

Este script utiliza as bibliotecas `Pandas` para manipulação de dados e `Matplotlib`/`Seaborn` para a geração de visualizações, demonstrando boas práticas de programação e estrutura de código.

---

## 🚀 Funcionalidades

* **Carregamento Robusto:** Carrega arquivos CSV e lida com erros comuns, como "arquivo não encontrado".
* **Resumo de Dados:** Exibe um "raio-x" do arquivo, mostrando dimensões, tipos de colunas e valores faltantes.
* **Estatísticas Descritivas:** Calcula automaticamente as principais métricas estatísticas (média, mediana, desvio padrão, etc.) para todas as colunas numéricas.
* **Visualizações Interativas:**
    * **Gráficos de Barras:** para visualizar a contagem de valores em colunas categóricas.
    * **Histogramas:** para entender a distribuição de valores em colunas numéricas.

---

## 🛠️ Como Usar

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/emmanuel-toledo-dev/csv-analyzer.git](https://github.com/emmanuel-toledo-dev/csv-analyzer.git)
    cd csv-analyzer
    ```

2.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Execute o script:**
    ```bash
    python analyzer.py
    ```

4.  **Siga as instruções:** O programa pedirá para você fornecer o caminho do arquivo CSV que deseja analisar. Um arquivo de exemplo (`sample_data.csv`) está incluído para testes.

---

Feito com 💜 por **Emmanuel Toledo**

[GitHub](https://github.com/emmanuel-toledo-dev/) | [LinkedIn](https://www.linkedin.com/in/emmanuel-toledo-163b561a0/?locale=pt)