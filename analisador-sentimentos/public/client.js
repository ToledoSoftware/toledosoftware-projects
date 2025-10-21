document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Selecionar Elementos ---
    const textInput = document.getElementById('text-input');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
    const errorMessage = document.getElementById('error-message');

    // --- 2. Adicionar "Ouvinte" de Evento ---
    analyzeBtn.addEventListener('click', analisarSentimento);

    // --- 3. Função Principal (Fetch) ---
    async function analisarSentimento() {
        const textoParaAnalisar = textInput.value;

        // Validação
        if (textoParaAnalisar.trim() === '') {
            return;
        }

        // Mostrar feedback de carregamento (opcional, mas bom para UX)
        analyzeBtn.textContent = 'A analisar...';
        analyzeBtn.disabled = true;
        resultContainer.classList.add('hidden');
        errorMessage.classList.add('hidden');

        try {
            // --- CHAMADA AO NOSSO BACK-END ---
            // Não chamamos a Google, chamamos o nosso próprio servidor
            const response = await fetch('http://localhost:3000/analisar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: textoParaAnalisar }),
            });

            if (!response.ok) {
                throw new Error('A resposta do servidor não foi OK');
            }

            const data = await response.json();

            // Exibir o resultado
            displayResult(data.sentimento);

        } catch (error) {
            console.error('Erro ao chamar o back-end:', error);
            errorMessage.classList.remove('hidden');
        } finally {
            // Restaurar o botão, quer dê certo ou errado
            analyzeBtn.textContent = 'Analisar';
            analyzeBtn.disabled = false;
        }
    }

    // --- 4. Função para Exibir o Resultado ---
    function displayResult(sentimento) {
        resultText.textContent = sentimento;
        
        // Limpa classes de cor antigas e adiciona a nova
        resultText.className = ''; // Limpa tudo
        resultText.classList.add(`sentiment-${sentimento}`); // Adiciona a classe (ex: 'sentiment-Positivo')

        resultContainer.classList.remove('hidden');
    }
});