# 🔑 Gerador de Senhas Seguras (Tauri)

Uma aplicação de desktop nativa construída com o framework Tauri, utilizando Rust para a lógica de backend e TypeScript para a interface de usuário.

O projeto demonstra proficiência em desenvolvimento Fullstack Desktop e persistência de dados nativa.

## ✨ Destaques Técnicos

- **Core Lógico (Backend):** Implementado em Rust, utilizando a biblioteca `rand` para garantir a entropia e segurança das senhas.
- **Persistência Nativa:** Configurações do usuário (comprimento, inclusão de símbolos) são salvas no sistema de arquivos do usuário (`$APPDATA/config`), usando Rust e `serde_json`.
- **Comunicação Bidirecional:** Utiliza `tauri::invoke` para comunicação assíncrona entre o Frontend (TypeScript) e o Backend (Rust).
- **Força da Senha:** Algoritmo para exibir a força da senha gerada em tempo real.
- **Interface:** Frontend leve em HTML, CSS e TypeScript.

## 🛠️ Como Usar

### Pré-requisitos

- Rust Toolchain
- Node.js e npm
- Dependências do Tauri (ex: VS Build Tools no Windows)

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/ToledoSoftware/toledosoftware-projects.git
cd toledosoftware-projects/password-generator
```

### 2️⃣ Executar em Modo de Desenvolvimento

```bash
npm install
npm run tauri dev
```

O Tauri compilará o Rust e iniciará o Frontend em uma janela nativa.

### 3️⃣ Compilar para Produção

Para gerar um instalador nativo (.exe, .dmg, .deb):

```bash
npm run tauri build
```

O binário final estará na pasta `src-tauri/target/release/`.

## Opções da Interface

| Opção                      | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| Comprimento (Slider)       | Define o tamanho da senha (8 a 64 caracteres).                            |
| Incluir Números/Símbolos   | Adiciona complexidade à geração da senha.                                 |
| Evitar Caracteres Ambíguos | Exclui caracteres como l, 1, O, 0 para evitar erros de digitação.         |

## Licença

Este projeto está licenciado sob a licença MIT.
