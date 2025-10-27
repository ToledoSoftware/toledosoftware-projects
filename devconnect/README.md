# 🌐 DevConnect — Template de Rede Social

Um **template de frontend moderno** para uma aplicação de rede social (inspirado no **Twitter** e **LinkedIn**), construído com **Nuxt 3**, **Vue 3**, **TypeScript** e **Tailwind CSS**.

---

## ✨ Principais Funcionalidades

- **📱 Layout Responsivo:**  
  Layout clássico de **3 colunas** (Menu Lateral, Feed Principal, Widgets Laterais) em desktop, que se adapta para **coluna única com navegação inferior** em dispositivos móveis.

- **🌗 Temas Claro e Escuro:**  
  Suporte completo a **modos light e dark**, com alternância via botão.

- **🌍 Internacionalização (i18n):**  
  Estrutura pronta para múltiplos idiomas (**Português e Inglês** implementados como exemplo), com alternância via botão.  
  URLs são prefixadas — ex: `/en/profile`.

- **🧩 Componentes Reutilizáveis:**  
  Componentização completa — `PostItem`, `NotificationItem`, `SuggestionItem`, etc.

- **📝 Modal de Novo Post:**  
  Janela modal elegante para criação de posts.

- **🎞️ Animações e Transições:**  
  Transições suaves entre páginas e microinterações (ex: botão curtir).

- **⏳ Skeletons de Carregamento:**  
  Simulação visual de carregamento de posts no feed.

- **🔠 Efeito Scramble:**  
  Animação de texto estilizada no título da página de login.

- **⭐ Ícones:**  
  Integração com **FontAwesome**.

- **🔒 TypeScript:**  
  Código totalmente tipado para maior robustez e manutenibilidade.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Descrição |
|-------------|------------|
| [Nuxt 3](https://nuxt.com) | Framework fullstack baseado em Vue 3 |
| [Vue 3](https://vuejs.org/) | Framework reativo para UI (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática e suporte avançado a IDEs |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária moderna e responsiva |
| [@nuxtjs/i18n](https://i18n.nuxtjs.org/) | Suporte multilíngue e gerenciamento de traduções |
| [@nuxtjs/color-mode](https://color-mode.nuxtjs.org/) | Alternância entre temas claro/escuro |
| [FontAwesome](https://fontawesome.com/) | Biblioteca de ícones (via `@fortawesome/vue-fontawesome`) |

---

## ⚙️ Setup

Certifique-se de instalar as dependências:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
🛠️ Servidor de Desenvolvimento
Inicie o servidor de desenvolvimento em http://localhost:3000:

bash
Copiar código
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
🚀 Build de Produção
Compile a aplicação para produção:

bash
Copiar código
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
Visualize localmente a build de produção:

bash
Copiar código
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
📚 Confira a documentação oficial do Nuxt para mais detalhes sobre deployment.

📁 Estrutura de Pastas (Visão Geral)
graphql
Copiar código
├── app.vue              # Ponto de entrada principal
├── components/          # Componentes Vue reutilizáveis (Botões, Cards, Itens de Lista, etc.)
├── composables/         # Funções reutilizáveis (ex: useScramble, usePostModal)
├── layouts/             # Layouts da aplicação (ex: default.vue, auth.vue)
├── i18n/locales/        # Arquivos JSON com traduções (dentro de i18n/)
├── pages/               # Páginas e rotas geradas automaticamente pelo Nuxt
├── plugins/             # Plugins do Nuxt (ex: fontawesome.ts)
├── public/              # Arquivos estáticos (imagens, favicons, etc.)
├── types/               # Definições de tipos TypeScript (ex: interface Post)
└── nuxt.config.ts       # Arquivo principal de configuração do Nuxt

🧠 Sobre o Projeto

DevConnect é ideal como ponto de partida para desenvolvedores que desejam construir uma rede social moderna e escalável, com foco em experiência de usuário, design limpo e arquitetura bem estruturada.