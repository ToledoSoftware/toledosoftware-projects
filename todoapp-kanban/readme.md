![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)
![Platform: Web](https://img.shields.io/badge/Platform-Web-4285F4.svg?style=for-the-badge&logo=googlechrome)

# 🧑‍💻 Kanban Colaborativo (TodoApp)

Aplicação **Kanban Fullstack em tempo real**, desenvolvida em **React**, para gerenciamento de tarefas pessoais e em equipe. 
O projeto demonstra proficiência em **React Hooks**, **Context API** para gerenciamento de estado e **integração com Cloud Firestore** para persistência e sincronização de dados.

---

## ⚡ Destaques Técnicos

* **Frontend:** **React** (Hooks e Context API)
* **Estilização:** **Tailwind CSS** para design responsivo e ágil
* **Persistência de Dados:** **Firebase Cloud Firestore** (NoSQL em tempo real)
* **Autenticação:** **Firebase Authentication** com **login anônimo (`signInAnonymously`)**
* **UX/Interação:** Drag & Drop fluido com **`@dnd-kit`**
* **Build Tool:** **Vite** para desenvolvimento e build otimizado

---

## 🛠️ Como Iniciar o Projeto Localmente

Este projeto utiliza o ecossistema **React + Firebase + Vite**, permitindo um fluxo de desenvolvimento rápido e sincronização em tempo real.

### 🔧 Pré-requisitos

1.  **Node.js** (versão 18+)
2.  **Conta no Firebase** com **Firestore** e **Authentication Anônima** habilitados

---

### 1️⃣ Clone o Repositório e Instale as Dependências

```bash
git clone [https://github.com/ToledoSoftware/todoapp-kanban](https://github.com/ToledoSoftware/todoapp)
cd todoapp
npm install


### 2️⃣ Configuração do Firebase

É essencial inserir as chaves do seu projeto Firebase no arquivo `index.html`.

No Console do Firebase, acesse Configurações do Projeto → Suas Apps → Configuração e copie o objeto JavaScript.

Substitua os valores no `<script>` do `index.html`:

```html
<script>
  window.__firebase_config = JSON.stringify({
    apiKey: "SEU_API_KEY_REAL",
    authDomain: "SEU_AUTH_DOMAIN_REAL",
    // ...
  });
  window.__app_id = 'kanban-emmanuel-toledo';
</script>

### 3️⃣ Executar em Desenvolvimento ou Produção

**Modo Desenvolvimento (Hot Reload):**

```bash
npm run dev


Build de Produção (otimizado):

npm run build
npm run preview

### 4️⃣ Regras de Segurança (Firestore)

Após configurar o projeto via Firebase CLI, publique suas regras para permitir leitura e escrita de usuários anônimos:

```bash
firebase deploy --only firestore:rules

### 5️⃣ Configuração do Build (Vite)

Se houver problemas no build, certifique-se de que o arquivo `vite.config.js` está na raiz do projeto:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});

## 📁 Estrutura de Pastas (Exemplo)

todoapp/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   └── Task.jsx
│   ├── context/
│   │   └── KanbanContext.jsx
│   ├── hooks/
│   │   └── useFirestore.js
│   ├── App.jsx
│   └── main.jsx
├── vite.config.js
├── package.json
└── README.md

## 🧾 Arquivo .gitignore

Inclua o .gitignore básico para projetos Node.js/React:

node_modules
dist
.env
firebase-debug.log


## 📜 Licença

Distribuído sob a licença MIT.

Sinta-se livre para usar, modificar e compartilhar.

Feito com 💜 por **Emmanuel Toledo**

[GitHub](https://github.com/ToledoSoftware) | [LinkedIn](https://www.linkedin.com/in/emmanuel-toledo-163b561a0/?locale=pt)