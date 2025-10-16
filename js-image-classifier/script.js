// script.js
document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const resultsDiv = document.getElementById('results');

    imageInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        // 1. Mostra a imagem na tela
        const reader = new FileReader();
        reader.onload = async (e) => {
            imagePreview.src = e.target.result;
            
            // Garante que a imagem esteja carregada no DOM antes de classificar
            imagePreview.onload = async () => {
                resultsDiv.innerHTML = '<p>Carregando modelo de IA... (pode levar um momento)</p>';

                try {
                    // 2. Carrega o modelo MobileNet pré-treinado
                    const model = await mobilenet.load();
                    
                    resultsDiv.innerHTML = '<p>Analisando imagem...</p>';

                    // 3. Classifica a imagem
                    const predictions = await model.classify(imagePreview);

                    // 4. Exibe os resultados
                    displayPredictions(predictions);

                } catch (error) {
                    console.error("Erro no TensorFlow.js: ", error);
                    resultsDiv.innerHTML = '<p style="color:red;">Ocorreu um erro ao processar a imagem.</p>';
                }
            };
        };
        reader.readAsDataURL(file);
    });

    function displayPredictions(predictions) {
        if (!predictions || predictions.length === 0) {
            resultsDiv.innerHTML = '<p>Não foi possível identificar a imagem.</p>';
            return;
        }

        let html = '<h3>Previsões:</h3><ul>';
        predictions.forEach(prediction => {
            const probability = (prediction.probability * 100).toFixed(2);
            html += `<li><strong>${prediction.className}</strong>: ${probability}% de confiança</li>`;
        });
        html += '</ul>';

        resultsDiv.innerHTML = html;
    }
});