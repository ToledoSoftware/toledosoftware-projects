// Aguarda o DOM (a pÃ¡gina) ser totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Substitua 'SUA_CHAVE_API_AQUI' pela sua chave gratuita da OpenWeatherMap
    const apiKey = 'b15b6ea6a82c5a30a50a3ef9c67d2e7d';

    // Precisamos referenciar os elementos HTML que vamos manipular
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherResultDiv = document.getElementById('weather-result');
    const errorMessageDiv = document.getElementById('error-message');
    
    // Elementos dentro do resultado
    const cityNameEl = document.getElementById('city-name');
    const temperatureEl = document.getElementById('temperature');
    const descriptionEl = document.getElementById('description');
    const humidityEl = document.getElementById('humidity');

    // Dizemos ao botÃ£o para executar a funÃ§Ã£o 'getWeather' quando for clicado
    searchBtn.addEventListener('click', getWeather);
    
    // Opcional: Permitir que o utilizador pressione "Enter" no input
    cityInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    });

    async function getWeather() {
        const city = cityInput.value;

        // ValidaÃ§Ã£o simples: nÃ£o fazer nada se o input estiver vazio
        if (city === '') {
            return;
        }

        // Esconder resultados antigos e erros antes de uma nova busca
        weatherResultDiv.classList.add('hidden');
        errorMessageDiv.classList.add('hidden');

        // Construir a URL da API
        // 'units=metric' para Celsius, 'lang=pt' para descriÃ§Ãµes em portuguÃªs
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;

        try {
            // 'await' pausa a funÃ§Ã£o atÃ© que a 'fetch' (busca) termine
            const response = await fetch(apiUrl);

            // Se a resposta nÃ£o for 'ok' (ex: erro 404), lanÃ§amos um erro
            if (!response.ok) {
                throw new Error('Cidade nÃ£o encontrada');
            }

            // 'await' pausa novamente para converter a resposta em JSON
            const data = await response.json();

            // Se tudo correu bem, exibimos os dados
            displayWeather(data);

        } catch (error) {
            // Se qualquer 'await' falhar (rede ou erro 404), caÃ­mos aqui
            console.error('Erro ao buscar dados:', error);
            displayError();
        }
    }

    function displayWeather(data) {
        // Atualizamos o texto de cada elemento HTML
        cityNameEl.textContent = data.name;
        temperatureEl.textContent = `${Math.round(data.main.temp)}Â°C`;
        descriptionEl.textContent = data.weather[0].description;
        humidityEl.textContent = `Humidade: ${data.main.humidity}%`;

        // Mostramos o 'card' de resultados
        weatherResultDiv.classList.remove('hidden');
    }

    function displayError() {
        // Mostramos a mensagem de erro
        errorMessageDiv.classList.remove('hidden');
    }
});
