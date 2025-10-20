// js/resumidor.js

document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultCard = document.getElementById('resultCard');
    const errorCard = document.getElementById('errorCard');
    const summaryText = document.getElementById('summaryText');
    const originalLength = document.getElementById('originalLength');

    // IMPORTANTE: Use a URL correta do seu Backend no Render
    // Esta URL DEVE ser a mesma que vocÃª cadastrar no Admin do Django!
    const API_URL = 'https://toledosoftware-backend.onrender.com/api/ia/summarize/';

    // Oculta todos os cards de resultado/erro no inÃ­cio
    resultCard.style.display = 'none';
    errorCard.style.display = 'none';

    inputText.addEventListener('input', () => {
        summarizeBtn.disabled = inputText.value.trim().length < 10; 
    });

    summarizeBtn.addEventListener('click', async () => {
        const textToSummarize = inputText.value.trim();
        
        if (textToSummarize.length < 10) return;

        // Esconde resultados anteriores e mostra o loading
        resultCard.style.display = 'none';
        errorCard.style.display = 'none';
        loadingIndicator.style.display = 'block';
        summarizeBtn.disabled = true;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Envia o texto como JSON no corpo da requisiÃ§Ã£o
                body: JSON.stringify({ text: textToSummarize }),
            });

            const data = await response.json();
            
            if (response.ok && data.status === 'success') {
                // Sucesso
                summaryText.textContent = data.summary;
                originalLength.textContent = data.original_length;
                resultCard.style.display = 'block';
            } else {
                // Erro da API
                const errorMsg = data.error || 'Erro desconhecido ao processar o resumo.';
                document.getElementById('errorMessage').textContent = errorMsg;
                errorCard.style.display = 'block';
            }

        } catch (error) {
            // Erro de rede (CORS, Servidor Offline)
            console.error('Network or Parse Error:', error);
            document.getElementById('errorMessage').textContent = 'Falha ao conectar com o serviÃ§o de API. Verifique a URL do Backend (Render).';
            errorCard.style.display = 'block';
        } finally {
            // Finaliza o loading e reabilita o botÃ£o
            loadingIndicator.style.display = 'none';
            summarizeBtn.disabled = false;
        }
    });
});
