![PowerShell](https://img.shields.io/badge/PowerShell-5.1%2B-blue.svg?style=for-the-badge&logo=powershell)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Platform: Windows](https://img.shields.io/badge/Platform-Windows-0078D6.svg?style=for-the-badge&logo=windows)

# 💾 Monitor de Downloads e Organização Automática (Python GUI)

Aplicação de desktop com interface gráfica (GUI), desenvolvida em Python utilizando TtkBootstrap, para monitorar, organizar e gerenciar automaticamente a pasta de Downloads.

O projeto utiliza threading para monitoramento em tempo real e demonstra manipulação de sistema (`os`, `psutil`) para organização de arquivos e controle de energia.

---

## ⚡ Funcionalidades

- **Organização de Arquivos:**  
    Classifica e move arquivos recém-baixados (ex: PDFs, ZIPs, Imagens) para subpastas na pasta Downloads.

- **Controle de Inatividade:**  
    Implementa lógica de desligamento automático (shutdown programado) baseado na inatividade do usuário, perfeito para downloads longos.

- **Monitoramento em Segundo Plano:**  
    Utiliza threading para manter o monitoramento ativo sem congelar a interface (GUI).

- **Interface Moderna:**  
    Construído com `ttkbootstrap` para um visual moderno e profissional.

- **Logging:**  
    Registra todas as ações e eventos importantes no arquivo `monitor.log`.

---

## 🛠️ Como Iniciar o Projeto Localmente

### 🔧 Pré-requisitos

- Python (versão 3.x)
- Sistema Operacional: **Windows**  
    (O comando de shutdown `os.system('shutdown...')` é específico para este SO)

---

### 1️⃣ Clonar o Repositório e Instalar as Dependências

```sh
# Navegue para o diretório raiz do monorepo
cd toledosoftware-projects/

# Instale as dependências (ttkbootstrap, psutil)
pip install -r monitor-downloads/requirements.txt
```

---

### 2️⃣ Executar a Aplicação

```sh
python monitor-downloads/monitor_download_gui.py
```

---

### Dependências Principais

- `psutil`
- `ttkbootstrap`

---

## ⚠️ Nota de Build

O arquivo `monitor_download_gui.spec` está incluído apenas para referência de como a aplicação pode ser convertida em um executável (.exe) usando PyInstaller.