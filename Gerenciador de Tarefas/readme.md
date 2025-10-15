![Python](https://img.shields.io/badge/Python-3.x-blue.svg?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-2.x-black.svg?style=for-the-badge&logo=flask)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

# 📝 API RESTful com Flask

Uma API RESTful simples, mas completa, para gerenciamento de tarefas (To-Do list). Este projeto foi construído com Flask e utiliza um arquivo JSON como um banco de dados simples para persistência de dados.

Ele implementa todas as operações **CRUD** (Create, Read, Update, Delete) para tarefas.

---

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/flask-api.git](https://github.com/seu-usuario/flask-api.git)
    cd flask-api
    ```

2.  **Crie um ambiente virtual (recomendado):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # No Windows: venv\Scripts\activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Execute a aplicação:**
    ```bash
    python app.py
    ```
    A API estará rodando em `http://127.0.0.1:5000`.

---

## Endpoints da API

A seguir, a documentação de todos os endpoints disponíveis.

| Método | URL                 | Corpo da Requisição (Exemplo)                           | Descrição                                         |
| :----- | :------------------ | :------------------------------------------------------ | :------------------------------------------------ |
| `GET`    | `/tasks`            | N/A                                                     | Retorna a lista de todas as tarefas.              |
| `GET`    | `/tasks/<task_id>`  | N/A                                                     | Retorna uma única tarefa pelo seu ID.             |
| `POST`   | `/tasks`            | `{ "title": "Criar documentação" }`                     | Cria uma nova tarefa. O título é obrigatório.     |
| `PUT`    | `/tasks/<task_id>`  | `{ "title": "Atualizar doc.", "completed": true }` | Atualiza o título e/ou o status de uma tarefa. |
| `DELETE` | `/tasks/<task_id>`  | N/A                                                     | Deleta uma tarefa pelo seu ID.                    |

---

Feito com 💜 por **Emmanuel Toledo**

[GitHub](https://github.com/emmanuel-toledo-dev/) | [LinkedIn](https://www.linkedin.com/in/emmanuel-toledo-163b561a0/?locale=pt)