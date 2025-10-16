var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseHttpsRedirection();

// --- NOSSO BANCO DE DADOS EM MEMÓRIA ---
var products = new List<Product>
{
    new Product { Id = 1, Name = "Parafuso Sextavado", Quantity = 150, Price = 0.50m },
    new Product { Id = 2, Name = "Porca", Quantity = 300, Price = 0.25m },
    new Product { Id = 3, Name = "Arruela", Quantity = 500, Price = 0.10m }
};
var nextId = 4;

// --- ENDPOINTS DA API ---

app.MapGet("/products", () => Results.Ok(products));

app.MapGet("/products/{id}", (int id) => {
    var product = products.FirstOrDefault(p => p.Id == id);
    return product is not null ? Results.Ok(product) : Results.NotFound();
});

app.MapPost("/products", (Product newProduct) => {
    newProduct.Id = nextId++;
    products.Add(newProduct);
    return Results.Created($"/products/{newProduct.Id}", newProduct);
});

app.MapPut("/products/{id}", (int id, Product updatedProduct) => {
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product is null) return Results.NotFound();
    product.Name = updatedProduct.Name;
    product.Quantity = updatedProduct.Quantity;
    product.Price = updatedProduct.Price;
    return Results.Ok(product);
});

app.MapDelete("/products/{id}", (int id) => {
    var product = products.FirstOrDefault(p => p.Id == id);
    if (product is not null) {
        products.Remove(product);
        return Results.NoContent();
    }
    return Results.NotFound();
});

app.Run();