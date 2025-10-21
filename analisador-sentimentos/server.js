// --- 1. Importar Dependências ---
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// --- 2. Configuração Inicial ---
dotenv.config(); // Carrega as variáveis do .env (NOSSA CHAVE HF_API_TOKEN)
const app = express();
const port = 3000;

// --- 3. Configurar Middlewares ---
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// --- 4. Definir o Endpoint da nossa API ---
app.post('/analisar', async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).json({ error: 'O texto é obrigatório.' });
        }

        // --- CHAMADA À API DO HUGGING FACE ---
        // Usaremos um modelo multilíngue popular para análise de sentimento
        const HF_API_URL = "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment";
        const HF_API_TOKEN = process.env.HF_API_TOKEN;

        // O 'fetch' já é nativo no Node.js 18+
        const apiResponse = await fetch(
            HF_API_URL,
            {
                method: 'POST',
                headers: {
                    // Protegemos a chave aqui no back-end
                    'Authorization': `Bearer ${HF_API_TOKEN}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: texto }),
            }
        );

        if (!apiResponse.ok) {
            // Se a API do Hugging Face falhar
            throw new Error(`Erro da API externa: ${apiResponse.statusText}`);
        }

        const data = await apiResponse.json();
        
        // O Hugging Face retorna um array complexo, vamos processá-lo
        // Ex: [[{ "label": "3 stars", "score": 0.8 }, ...]]
        const sentimento = processarResposta(data);

        // Envia a resposta simples de volta para o front-end
        res.json({ sentimento: sentimento });

    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ error: 'Erro ao analisar o sentimento.' });
    }
});

// --- 5. Função Auxiliar para traduzir a resposta ---
function processarResposta(data) {
    if (!data || !data[0] || !data[0][0]) {
        return 'Neutro'; // Resposta padrão em caso de erro
    }

    // Pegamos o rótulo com a maior pontuação (score)
    // O modelo nos dá de "1 star" a "5 stars"
    const label = data[0][0].label;

    if (label === '5 stars' || label === '4 stars') {
        return 'Positivo';
    }
    if (label === '1 star' || label === '2 stars') {
        return 'Negativo';
    }
    // "3 stars"
    return 'Neutro';
}


// --- 6. Iniciar o Servidor ---
app.listen(port, () => {
    console.log(`Servidor (Hugging Face) rodando em http://localhost:${port}`);
    console.log('A chave da API foi carregada? ', process.env.HF_API_TOKEN ? 'Sim' : 'Não. Verifica o ficheiro .env');
});