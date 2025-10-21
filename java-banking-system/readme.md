# Sistema Bancário via Console (Java)

Este projeto é uma simples aplicação de console desenvolvida em Java como uma prova de conhecimento, demonstrando os princípios fundamentais da Programação Orientada a Objetos (OOP). O sistema simula as operações básicas de um caixa eletrônico, permitindo o gerenciamento de múltiplas contas bancárias em memória.

## ✨ Funcionalidades

- **Criação de Contas:** Permite criar novas contas com um nome de titular e um número de conta gerado sequencialmente.
- **Depósitos:** Adiciona fundos a uma conta existente.
- **Saques:** Retira fundos de uma conta, com validação de saldo insuficiente.
- **Consulta de Saldo:** Exibe as informações detalhadas de uma conta, incluindo saldo atual.

## 🛠️ Tecnologias Utilizadas

- **Java (JDK 8 ou superior)**

## 🚀 Como Executar

Para compilar e executar o projeto localmente, siga os passos abaixo:

1.  **Pré-requisitos:**
    - Ter o [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) instalado e configurado nas variáveis de ambiente.

2.  **Clone o repositório principal (se ainda não o tiver):**
    ```bash
    git clone [https://github.com/ToledoSoftware/toledosoftware-projects.git](https://github.com/ToledoSoftware/toledosoftware-projects.git)
    ```

3.  **Navegue até a pasta específica deste projeto:**
    ```bash
    cd toledosoftware-projects/java-banking-system
    ```

4.  **Compile os arquivos `.java`:**
    ```bash
    javac *.java
    ```
    Este comando irá gerar os arquivos `Account.class` e `BankingApp.class`.

5.  **Execute a aplicação:**
    ```bash
    java BankingApp
    ```

Após a execução, o menu interativo aparecerá no seu terminal.

## 📂 Estrutura do Projeto

-   `Account.java`: Classe que representa a entidade de uma conta bancária, contendo seus atributos (número, titular, saldo) e métodos (depositar, sacar).
-   `BankingApp.java`: Classe principal que contém o método `main`, o menu de interação com o usuário e a lógica para gerenciar as contas.