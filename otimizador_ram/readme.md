![Python](https://img.shields.io/badge/Python-3.x-blue.svg?style=for-the-badge&logo=python)
![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6.svg?style=for-the-badge&logo=windows)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

# 🚀 Otimizador de RAM e Modos de Energia (100% Python)

Uma aplicação de desktop para Windows, construída com **Python**, que serve como uma central de controle para otimizar o sistema para performance, especialmente antes de sessões de jogos.

A aplicação é **totalmente autônoma**, utilizando bibliotecas Python como `psutil` e `subprocess` para interagir diretamente com o sistema operacional, sem a necessidade de scripts externos.

![GUI Screenshot](https://i.imgur.com/pPyKKJS.png)

---

## ✨ Funcionalidades

A aplicação oferece três modos de operação principais:

- **🚀 Modo Turbo:**
    - Fecha processos que consomem muita RAM, definidos no arquivo `config_processos.yaml`.
    - Muda o plano de energia do Windows para "Alto Desempenho" via `powercfg`.
    - Limpa o cache de DNS do sistema via `ipconfig`.

- **⚖️ Modo Equilibrado:**
    - Restaura o plano de energia do Windows para o modo "Equilibrado".

- **🔄 Restaurar Processos:**
    - Reinicia os processos comuns de segundo plano (definidos em `config_processos.yaml`) que foram fechados pelo Modo Turbo.

### Interface Gráfica

- Exibe o uso de RAM **antes** e **depois** de cada operação.
- Mostra a **quantidade de memória liberada** (ou gasta, no caso de restauração).
- Apresenta um **log em tempo real** de todas as ações.
- Executa as operações em threads separadas para **não congelar a interface**.

---

## 🛠️ Como Usar

1. **Requisitos:** Garanta que todos os arquivos (`.py`, `.yaml`, etc.) estejam na mesma pasta.
2. **Instale as dependências:**
     ```bash
     pip install -r requirements.txt
     ```
3. **Personalize os Processos:**
     - Abra o arquivo `config_processos.yaml` e edite as listas `processos_a_fechar` e `processos_a_restaurar`.
4. **Execute a aplicação:**
     - **Importante:** O script precisa ser executado com **privilégios de Administrador**.
     - Clique com o botão direito no arquivo `.py` e selecione "Executar como administrador" ou abra um terminal como administrador e execute:
         ```bash
         python otimizador_ram_gui.py
         ```

---

## 💡 Monitoramento Automático (Proativo)

Além da interface principal, o projeto inclui um monitor silencioso que roda em segundo plano (`background_monitor.pyw`).

- **O que ele faz?** Observa os processos do sistema. Quando detecta que um aplicativo de jogo (como `steam.exe`, configurado no `config_processos.yaml`) foi iniciado, exibe uma **notificação nativa do Windows** sugerindo a otimização.
- **Como funciona?** Ao clicar na notificação, a aplicação principal do Otimizador de RAM é aberta, permitindo que você execute o "Modo Turbo" com um clique.

Para ativar este recurso, basta executar o `background_monitor.pyw` uma vez. Ele continuará rodando de forma invisível. Para que ele inicie com o Windows, você pode criar um atalho para ele na pasta de inicialização do sistema (`shell:startup`).

---

Feito com 💜 por **Emmanuel Toledo**

[GitHub](https://github.com/emmanuel-toledo-dev/) | [LinkedIn](https://www.linkedin.com/in/emmanuel-toledo-163b561a0/?locale=pt)