# API de Inventário em C# com ASP.NET Core

Este projeto é uma API RESTful simples desenvolvida em C# e ASP.NET Core. Ele serve como uma prova de conhecimento, demonstrando a habilidade de construir um backend funcional e seguindo os princípios REST no ecossistema .NET.

A API gerencia uma lista de produtos em memória, expondo endpoints para operações CRUD (Criar, Ler, Atualizar, Deletar).

## ✨ Funcionalidades (Endpoints)

- `GET /products`: Retorna a lista completa de todos os produtos.
- `GET /products/{id}`: Retorna um produto específico pelo seu ID.
- `POST /products`: Cria um novo produto a partir de um corpo JSON.
- `PUT /products/{id}`: Atualiza um produto existente.
- `DELETE /products/{id}`: Remove um produto da lista.

## 🛠️ Tecnologias Utilizadas

- **C#**
- **ASP.NET Core 8.0**

## 🚀 Como Executar

Para compilar e executar o projeto localmente, siga os passos abaixo:

1.  **Pré-requisitos:**
    - Ter o **[.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)** ou superior instalado.

2.  **Clone o repositório principal:**
    ```bash
    git clone [https://github.com/ToledoSoftware/toledosoftware-projects.git](https://github.com/ToledoSoftware/toledosoftware-projects.git)
    ```

3.  **Navegue até a pasta específica deste projeto:**
    ```bash
    cd toledosoftware-projects/CSharpInventoryAPI
    ```

4.  **Execute a aplicação:**
    ```bash
    dotnet run
    ```
    O terminal indicará que o servidor está rodando e escutando em uma porta local (ex: `https://localhost:7100`).

## 🧪 Como Testar

Como esta versão não inclui o Swagger, você pode testar os endpoints da seguinte forma:

-   **Para `GET`:**
    - Abra seu navegador e acesse `https://localhost:XXXX/products` (substitua `XXXX` pela porta correta) para ver a lista de todos os produtos.
    - Acesse `https://localhost:XXXX/products/1` para ver o primeiro produto.

-   **Para `POST`, `PUT` e `DELETE`:**
    - É necessário usar uma ferramenta de cliente REST, como o **[Postman](https://www.postman.com/)** ou a extensão **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)** para o VS Code.