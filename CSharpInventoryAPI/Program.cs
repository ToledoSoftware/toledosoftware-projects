// Cria a aplicação web
var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao contêiner. O Swagger é para gerar a documentação da API.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configura o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Habilita a interface visual do Swagger
}

app.UseHttpsRedirection();

// --- NOSSO BANCO DE DADOS EM MEMÓRIA ---
// Usamos uma lista estática para que os dados persistam entre as requisições.
var products = new List<Product>
{
    new Product { Id = 1, Name = "Parafuso Sextavado", Quantity = 150, Price = 0.50m },
    new Product { Id = 2, Name = "Porca", Quantity = 300, Price = 0.25m },
    new Product { Id = 3, Name = "Arruela", Quantity = 500, Price = 0.10m }
};
var nextId = 4; // Para gerar o ID dos próximos produtos


// --- DEFINIÇÃO DOS ENDPOINTS DA API ---

// Endpoint 1: GET /products -> Retorna todos os produtos
app.MapGet("/products", () => {
    return Results.Ok(products);
});

// Endpoint 2: GET /products/{id} -> Retorna um produto específico pelo seu ID
app.MapGet("/products/{id}", (int id) => {
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product == null)
    {
        return Results.NotFound($"Produto com ID {id} não encontrado.");
    }
    return Results.Ok(product);
});

// Endpoint 3: POST /products -> Cria um novo produto
app.MapPost("/products", (Product newProduct) => {
    newProduct.Id = nextId++; // Atribui o próximo ID disponível
    products.Add(newProduct);
    // Retorna o produto criado e o status 201 (Created)
    return Results.Created($"/products/{newProduct.Id}", newProduct);
});

// Endpoint 4: PUT /products/{id} -> Atualiza um produto existente
app.MapPut("/products/{id}", (int id, Product updatedProduct) => {
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product == null)
    {
        return Results.NotFound($"Produto com ID {id} não encontrado.");
    }

    product.Name = updatedProduct.Name;
    product.Quantity = updatedProduct.Quantity;
    product.Price = updatedProduct.Price;

    return Results.Ok(product); // Retorna o produto atualizado
});

// Endpoint 5: DELETE /products/{id} -> Deleta um produto
app.MapDelete("/products/{id}", (int id) => {
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product == null)
    {
        return Results.NotFound($"Produto com ID {id} não encontrado.");
    }

    products.Remove(product);
    return Results.NoContent(); // Retorna o status 204 (No Content) para sucesso
});


// Inicia o servidor
app.Run();