# 🚀 Auto Gaming Maintenance: Rust Edition

Uma aplicação de desktop nativa de alta performance, construída em **Rust** com a framework **Tauri**, focada em otimizar o sistema Windows para a melhor experiência em jogos.

O projeto migra a lógica de backend crítica para Rust, garantindo velocidade, segurança e interação direta com o sistema operacional (Registro do Windows, `powercfg`).

---

## ⚡ Funcionalidades Principais

- **Performance Otimizada:**  
    As rotinas de otimização de RAM, Registro e Planos de Energia são executadas pelo Rust Core, garantindo a máxima velocidade.

- **📊 Dashboard de Monitoramento em Tempo Real:**  
    Exibe o uso de CPU e RAM através de gráficos atualizados via eventos assíncronos (`tauri::AppHandle::emit`) a cada 2 segundos.  
    <sub>[Referências: `main.rs`, `main.js`]</sub>

- **🎯 Modo Foco Avançado:**  
    Encerra processos em segundo plano para liberar recursos (configuráveis via uma interface modal que salva em JSON nativamente).  
    <sub>[Referências: `index.html`, `main.js`]</sub>

- **🧹 Limpeza e Ajustes:**  
    Limpa o cache de DNS, remove arquivos temporários e ajusta o sleep timeout do sistema.  
    <sub>[Referência: `main.rs`]</sub>

- **🔌 Gerenciador de Inicialização:**  
    Interface para desabilitar programas que atrasam o boot do sistema (manipulação direta do Registro do Windows).

---

## 🛠️ Stack e Como Executar

Este projeto utiliza o ecossistema **Rust + Tauri + Frontend Web (HTML/JS/Chart.js)**.

### Pré-requisitos

- [Rust Toolchain](https://www.rust-lang.org/tools/install)
- [Node.js (LTS)](https://nodejs.org/)
- Dependências do Tauri (como MSVC Build Tools no Windows)

### Execução em Desenvolvimento

O Tauri gerencia a compilação do Rust e o servidor de frontend.

```bash
# Instale as dependências Node
npm install

# Execute em Desenvolvimento
npm run tauri dev
```

### Compilação de Produção

Para criar um instalador nativo (`.exe` no Windows):

```bash
npm run tauri build
```

---

## 🔑 Detalhes de Baixo Nível

A lógica de manipulação do Registro do Windows (`winreg`) e execução de comandos de sistema (`powercfg`, subprocess) é toda encapsulada no Rust, garantindo que as chamadas nativas sejam feitas com segurança e sem erros de runtime comuns em scripts.

---