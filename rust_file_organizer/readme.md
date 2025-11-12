![Rust](https://img.shields.io/badge/Rust-stable-orange.svg?style=for-the-badge&logo=rust)
![GUI](https://img.shields.io/badge/GUI-egui-blue.svg?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

# 🦀 Organizador de Arquivos em Rust com GUI

Uma aplicação de desktop multiplataforma, construída em **Rust**, que organiza arquivos de uma pasta de origem, movendo-os para diretórios específicos com base em regras e compactando arquivos antigos.

O projeto utiliza a biblioteca `egui` para uma interface gráfica reativa e leve, e implementa **multithreading** para garantir que a UI nunca congele durante as operações de arquivo.

---

## ✨ Funcionalidades

* **Interface Gráfica Reativa:** Construída com `egui`, a interface permite configurar e disparar as ações de forma intuitiva.
* **Tema Personalizado:** Apresenta um tema visual escuro e moderno, consistente em todas as plataformas.
* **Organização por Regras:** Move arquivos para pastas de destino com base em suas extensões, conforme definido em `config.yaml`.
* **Compactação de Arquivos Antigos:** Arquivos que não são movidos e são mais antigos que um tempo definido são compactados em um arquivo `.zip`.
* **Modo de Simulação (Dry Run):** Permite executar a lógica de organização sem mover ou apagar nenhum arquivo, exibindo no log quais ações *seriam* tomadas. Isso garante total segurança e controle para o usuário.
* **Operação em Segundo Plano:** Todas as operações de arquivo são executadas em uma **thread separada**, mantendo a interface 100% responsiva e exibindo o progresso em tempo real.
* **Persistência de Configuração:** Todas as configurações e o histórico de ações são salvos no arquivo `config.yaml`.

---

## 🛠️ Como Usar

### Pré-requisitos
* Ambiente de desenvolvimento Rust instalado ([rustup.rs](https://rustup.rs/)).

### Instalação e Execução
O Cargo gerencia todas as dependências automaticamente.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/rust_file_organizer.git](https://github.com/seu-usuario/rust_file_organizer.git)
    cd rust_file_organizer
    ```

2.  **Execute o projeto:**
    ```bash
    cargo run
    ```
    Na primeira vez, o Cargo fará o download e a compilação de todas as dependências. As execuções seguintes serão quase instantâneas.

3.  **Compile para Produção (Opcional):**
    ```bash
    cargo build --release
    ```
    O executável otimizado estará em `./target/release/`.


## 👨‍💻 Autor

Feito com 💜 por **Emmanuel Toledo**

[GitHub](https://github.com/ToledoSoftware/) | [LinkedIn](https://www.linkedin.com/in/emmanuellucastoledo)