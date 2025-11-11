# NextCommerce | Tech Edition 🚀

![Project Banner](https://via.placeholder.com/1200x600/0A0A0A/A78BFA?text=NextCommerce+Tech+Edition)

> Um template de e-commerce de alta performance com identidade visual futurista ("Tech Neon"), construído com as tecnologias mais modernas do ecossistema React.

**NextCommerce** não é apenas um rostinho bonito; é uma aplicação web robusta que demonstra domínio sobre o **Next.js 14+ (App Router)**, gerenciamento de estado complexo no cliente e padrões de UI/UX modernos.

---

## ✨ Funcionalidades Principais

### 🛒 Experiência de Compra Fluida
- **Carrinho Lateral (Drawer):** Adição de produtos sem sair da página, com atualização em tempo real de quantidades e subtotal.
- **Estado Persistente:** O carrinho sobrevive a recarregamentos de página (F5) usando `zustand/middleware/persist` com `localStorage`.
- **Variações de Produto:** Seleção interativa de **Cor** e **Tamanho** na página de detalhes (PDP). A imagem principal muda instantaneamente ao selecionar uma cor diferente.

### 🌐 Internacionalização (i18n) Instantânea
- **Troca de Idioma sem Reload:** Alternância imediata entre **Português (PT)** e **Inglês (EN)** gerenciada via estado global, sem necessidade de recarregar a página.
- **Conteúdo Dinâmico:** Todos os textos, incluindo moedas (BRL/USD simulated) e pluralizações, são reativos à escolha do idioma.

### 🎨 UI/UX "Tech Neon"
- **Tema Dark Mode Nativo:** Identidade visual baseada em tons escuros profundos (`#0A0A0A`) com acentos em Roxo Neon (`#A78BFA`).
- **Micro-interações:** Feedbacks visuais em hovers, botões e ícones.
- **Notificações Elegantes:** Substituição de alertas nativos por *Toasts* animados (via `sonner`).
- **Busca Instantânea:** Overlay de pesquisa estilo "Command Palette" com filtragem em tempo real.

### ⚡ Performance & Tecnologia
- **Next.js App Router:** Uso de Server Components para a estrutura inicial e Client Components apenas onde a interatividade é necessária.
- **Imagens Otimizadas:** Uso do componente `<Image />` do Next.js para carregamento responsivo, lazy loading e prevenção de layout shifts (CLS).
- **Fontes Otimizadas:** Integração direta com `next/font` (Inter, Poppins, Fira Code) sem requisições extras.

---

## 🛠️ Tech Stack

| Categoria | Tecnologias |
| :--- | :--- |
| **Core** | React 18, Next.js 14+ (App Router), TypeScript |
| **Estilização** | Tailwind CSS v3, PostCSS |
| **Estado** | Zustand (com persistência local) |
| **UI Components** | FontAwesome (ícones), Sonner (toasts) |
| **Outros** | Canvas Confetti (efeito visual) |

---

## 🚀 Como Rodar Localmente

Certifique-se de ter o **Node.js** (v18+) instalado.

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/ToledoSoftware/nextcommerce.git](https://github.com/ToledoSoftware/nextcommerce.git)
   cd nextcommerce