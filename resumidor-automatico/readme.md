# ✅ Projeto: Resumidor AutomÃ¡tico (AI Writer)

Este Ã© um projeto de demonstraÃ§Ã£o Fullstack que exemplifica a integraÃ§Ã£o de serviÃ§os de InteligÃªncia Artificial com um Backend robusto e um Frontend moderno.

## ⚠️ Arquitetura

O projeto Ã© baseado em uma arquitetura Fullstack desacoplada:

1.  **Frontend (UI):** HTML, CSS, e JavaScript (ESM). Hospedado no Cloudflare Pages.
2.  **ServiÃ§o (API):** Python com Django (usando o app `ia_service`) para receber a requisiÃ§Ã£o, processar a lÃ³gica de resumo (simulada) e retornar o JSON. Hospedado no Render.com.

## ðŸ› ï¸ Tecnologias Principais

* **Frontend:** HTML5, CSS3, JavaScript.
* **Backend:** Python 3, Django, Django REST Framework (simulaÃ§Ã£o).
* **Deploy:** Cloudflare Pages (Frontend) e Render.com (Backend/API).
* **FunÃ§Ã£o de IA:** LÃ³gica de processamento de texto simulada em Python (preparada para integraÃ§Ã£o com OpenAI GPT ou Hugging Face).

## âœ¨ Funcionalidade

O usuÃ¡rio insere um texto longo na interface e o Frontend envia uma requisiÃ§Ã£o `POST` para o endpoint `/api/ia/summarize/` no Django. O Backend processa o texto e retorna um JSON com o resumo e mÃ©tricas.

**Este projeto demonstra:**
* Habilidade em criar e consumir APIs de serviÃ§o.
* Tratamento de requisiÃ§Ãµes assÃ­ncronas (Fetch API).
* ImplementaÃ§Ã£o de lÃ³gica de NegÃ³cio em um Backend Python.
