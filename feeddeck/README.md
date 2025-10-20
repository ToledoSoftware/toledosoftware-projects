# Projeto 3 (Desktop): FeedDeck ðŸ“°

Um agregador de notÃ­cias/feeds RSS para desktop (Windows, macOS, Linux), construÃ­do com Tauri, Rust, React e TypeScript. O aplicativo permite que os usuÃ¡rios adicionem seus feeds favoritos, baixa artigos em segundo plano e os armazena localmente em um banco de dados **SQLite** para leitura 100% offline.

## 🎯 Arquitetura e CompetÃªncias

Este projeto Ã© um aplicativo desktop "nativo" que demonstra a arquitetura moderna do Tauri, separando a lÃ³gica de negÃ³cios pesada (Rust) da interface do usuÃ¡rio (React).

* **Tauri (Rust + React):** Utiliza o Tauri para empacotar uma interface web moderna (React/TS) em um executÃ¡vel nativo. O Rust Ã© usado para toda a lÃ³gica de back-end.
* **Banco de Dados Local (SQLite):** A lÃ³gica principal do app. Todas as feeds e artigos sÃ£o armazenados em um banco de dados SQLite local, gerenciado inteiramente pelo Rust usando a crate `rusqlite`.
* **Multithreading & Async (Tokio):** O back-end em Rust utiliza o `tokio` para criar tarefas assÃ­ncronas em segundo plano, permitindo que o app busque e analise mÃºltiplos feeds RSS simultaneamente sem travar a interface.
* **Comandos Rust AvanÃ§ados:** O front-end React se comunica com o back-end Rust atravÃ©s de comandos `async` (ex: `get_feeds`, `add_feed`, `mark_article_as_read`) expostos pelo Tauri.
* **Parsing de XML/RSS:** O back-end Rust lida com a requisiÃ§Ã£o (`reqwest`) e anÃ¡lise (`rss` crate) dos arquivos XML dos feeds.
* **UI Complexa:** O front-end em React usa `react-resizable-panels` para criar uma interface de usuÃ¡rio de 3 painÃ©is (Lista de Feeds | Lista de Artigos | Leitor de Artigo), comum em aplicaÃ§Ãµes desktop.

## ðŸ› ï¸ Tecnologias Utilizadas

### Front-end (UI)

* **React** (com TypeScript)
# FeedDeck

FeedDeck is a cross-platform desktop RSS/Atom feed reader built with Tauri (Rust backend) and React + Vite (frontend).

This repository contains the desktop application source and build tooling.

## Features

- Add and manage RSS/Atom feeds
- Background fetch and parsing of feeds
- Local storage of feeds and articles in SQLite
- Simple offline reader with read/unread tracking

## Quick start (development)

Requirements
- Node.js 16+
- Rust toolchain (stable)
- Recommended: Windows, macOS or Linux build toolchain for Tauri (see Tauri docs)

Install dependencies:

```powershell
npm install
```

Run in development mode:

```powershell
npm run tauri dev
```

The first run compiles Rust crates and may take several minutes.

## Build (production)

To build a production bundle:

```powershell
npm run tauri build
```

Produced artifacts are placed in the Tauri build output directories.

## Debugging

When a feed fails to parse the backend writes a raw response dump next to the running executable as `last_feed_response.bin`. Inspecting the start of this file helps identify HTML error pages, Cloudflare/challenge pages, or unexpected content types.

Development helper commands (invoke via the Tauri invoke API):
- `get_last_feed_response_snippet(maxBytes?: number)` â€“ returns the first N bytes of the last dump
- `get_feeds()` â€“ returns stored feeds
- `get_articles_for_feed(feedId: number)` â€“ returns articles for a feed
- `toggle_article_read_status(articleId: number)` â€“ toggles read/unread
- `set_article_read_status(articleId: number, isRead: boolean)` â€“ set explicit read state

## Project structure

- `src/` â€“ React frontend (TypeScript)
- `src-tauri/` â€“ Rust backend
  - `src/` â€“ Rust source files (`main.rs`, `database.rs`, `fetcher.rs`, `models.rs`)
