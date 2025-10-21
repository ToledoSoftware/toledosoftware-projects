# ZenHabit: Rastreador de Hábitos (Mobile) 🧘‍♀️✨

ZenHabit é um aplicativo mobile multiplataforma (iOS, Android, Web) construído com **React Native/Expo** para rastreamento de hábitos e aumento de produtividade.

O foco principal do projeto é demonstrar a arquitetura de um aplicativo mobile moderno, incluindo o gerenciamento de tema, navegação complexa, persistência de estado e a utilização de APIs nativas, como Notificações e AsyncStorage.

## 🌟 Funcionalidades e Telas

* **Rastreamento Diário:** Marque hábitos como concluídos e acompanhe o status de hoje na tela principal (`index.tsx`).
* **Criação de Hábitos:** Adicione novos hábitos através de um modal (`modal.tsx`), definindo o título e, opcionalmente, um lembrete diário em um horário específico.
* **Estatísticas (Streaks):** Visualize métricas de progresso, incluindo a **Sequência Atual (Current Streak)** e o **Recorde (Longest Streak)** de cada hábito (`stats.tsx`).
* **Tema Dinâmico:** Alternância entre os temas Claro, Escuro e o tema do Sistema Operacional (iOS/Android).
* **Notificações Agendadas:** Receba lembretes diários no horário configurado para manter a consistência.

## 🎯 Competências Técnicas Demonstradas

Este projeto fullstack mobile exemplifica um conjunto avançado de habilidades em React Native:

* **Arquitetura Mobile Moderna:** Utilização de **Expo** e **Expo Router** para navegação tipada e estrutura de projeto mobile robusta.
* **Gerenciamento de Tema (Theme Context):**
    * Criação de um Contexto (`ThemeContext.tsx`) para gerenciar a preferência do usuário (`light` / `dark` / `system`) e persistir a escolha via **AsyncStorage**.
    * Criação de componentes temáticos (`Themed.tsx`) que consomem o contexto para aplicar automaticamente as cores corretas de fundo e texto.
    * Implementação de um **Toggle Animado** (`ThemeToggle.tsx`) para troca de tema.
* **Notificações Nativas:** Configuração e agendamento de notificações diárias recorrentes (`@expo/notifications`), incluindo a criação de um **Canal de Notificação (Channel)** para Android.
* **Manipulação de Dados Complexos:** Lógica de manipulação de *streaks* e integração de serviços de dados (simulados por `habitService` e `streakUtils`).
* **UI/UX Mobile:** Uso de `FlatList`, componentes específicos (ex: `DateTimePicker`) e layout responsivo com `StyleSheet`.

## ⚙️ Tecnologias Utilizadas

* **Framework:** [Expo](https://expo.dev/) (SDK 50+)
* **Linguagem/Biblioteca:** React Native, TypeScript.
* **Roteamento:** Expo Router.
* **Persistência:** `@react-native-async-storage/async-storage` (para preferência de tema).
* **APIs Nativas:** `@expo/notifications`, `@react-native-community/datetimepicker`.

## 🚀 Como Executar Localmente

### Pré-requisitos

* Node.js (LTS recomendado).
* Conta Expo e o aplicativo **Expo Go** instalado no seu telefone (para testes em dispositivo).

### Passos de Instalação e Execução

1.  **Clonar o repositório:**
    ```bash
    git clone [https://github.com/ToledoSoftware/ZenHabit.git](https://github.com/ToledoSoftware/ZenHabit.git)
    cd ZenHabit
    ```

2.  **Instalar dependências:**
    ```bash
    npm install # ou yarn install
    ```

3.  **Iniciar o Servidor de Desenvolvimento:**
    ```bash
    npm start # ou expo start
    ```
    Isso abrirá uma janela no seu navegador. Você pode escanear o QR code com o app **Expo Go** no seu dispositivo ou rodar nos simuladores/emuladores.

---