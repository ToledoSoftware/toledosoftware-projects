# Estágio 1: Build da Aplicação
# Usamos a imagem oficial do .NET SDK para compilar nosso projeto
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copia o arquivo .csproj e restaura as dependências (se houver)
COPY *.csproj ./
RUN dotnet restore

# Copia todo o resto do código-fonte
COPY . ./
# Compila a aplicação em modo de Release, otimizado para produção
RUN dotnet publish -c Release -o out

# Estágio 2: Imagem Final
# Usamos uma imagem muito menor, que contém apenas o necessário para rodar a API, não para compilar
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
# Copia apenas os arquivos compilados do estágio de build
COPY --from=build-env /app/out .

# Expõe a porta 8080 do container para o mundo exterior
EXPOSE 8080

# Define o comando para iniciar a nossa API quando o container for executado
ENTRYPOINT ["dotnet", "CSharpInventoryAPI.dll"]