![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust)
![Tauri](https://img.shields.io/badge/Tauri-61DAFB?style=for-the-badge&logo=tauri)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6.svg?style=for-the-badge&logo=windows)

# 🚀 Auto Gaming Maintenance: Rust Edition

Uma aplicação de desktop nativa e de alta performance, construída em **Rust** com interface **Tauri**, focada em otimizar o sistema Windows para a melhor experiência em jogos.
 
---

## ⚡ Funcionalidades e Otimizações

Este projeto oferece funcionalidades avançadas e otimizações de baixo nível:

* **🎮 Otimização Total (Progressiva):** Executa em sequência as quatro otimizações essenciais com um visual de barra de progresso suave e contínua.
* **📊 Monitoramento Dinâmico:** Dashboard com gráficos em tempo real (atualizados via eventos assíncronos do Rust) do uso de CPU e RAM.
* **🎯 Modo Foco Avançado:** Encerra processos em segundo plano configuráveis pelo usuário (navegadores, Discord, etc.) para liberar RAM.
* **🧹 Limpeza de Cache:** Remove arquivos temporários e de prefetch do Windows.
* **🔌 Gerenciador de Inicialização:** Ferramenta para desabilitar programas que atrasam o boot do sistema (acesso direto ao Registro do Windows).
* **🚀 Alto Desempenho:** Ativa planos de energia para performance máxima.

---

## 🛠️ Como Compilar e Usar

Este projeto utiliza o framework Tauri, combinando o backend Rust com o frontend Web (HTML/CSS/JS).

### Pré-requisitos

1.  **Rust:** Instale o Rust Toolchain.
2.  **Node.js:** Versão LTS.
3.  **Dependências do Tauri:** (Como MSVC Build Tools no Windows).

### 1. Clonar o Repositório

Navegue até a pasta onde deseja o projeto e clone o repositório principal:
```bash
git clone [https://github.com/ToledoSoftware/toledosoftware-projects.git](https://github.com/ToledoSoftware/toledosoftware-projects.git)
cd toledosoftware-projects/auto-gaming-maintenance