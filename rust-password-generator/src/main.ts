import { invoke } from "@tauri-apps/api/tauri";

// --- ESTRUTURAS DE DADOS (Deve corresponder ao AppSettings no Rust) ---
interface AppSettings {
  length: number;
  numbers: boolean;
  symbols: boolean;
  no_ambiguous: boolean;
}

interface PasswordResult {
  password: string;
  strength: string;
}

// --- CONSTANTES ---
const strengthColors: { [key: string]: string } = {
  "Muito Fraca": "#ff0000",
  "Fraca": "#ff8c00",
  "Moderada": "#ffff00",
  "Forte": "#32cd32",
  "Muito Forte": "#00ff00"
};

// --- REFERÊNCIAS GLOBAIS ---
let lengthSlider: HTMLInputElement;
let lengthValueDisplay: HTMLSpanElement;
let numbersCheck: HTMLInputElement;
let symbolsCheck: HTMLInputElement;
let ambiguousCheck: HTMLInputElement;
let generateButton: HTMLButtonElement;
let passwordDisplay: HTMLInputElement;
let strengthIndicator: HTMLDivElement;
let strengthText: HTMLSpanElement;
let copyButton: HTMLButtonElement;

// --- FUNÇÕES DE PERSISTÊNCIA ---

/** Salva as configurações atuais no Rust Store. */
function saveSettings() {
    const settings: AppSettings = {
        length: parseInt(lengthSlider.value),
        numbers: numbersCheck.checked,
        symbols: symbolsCheck.checked,
        no_ambiguous: ambiguousCheck.checked,
    };
    // Chamamos o comando Rust sem aguardar (fire-and-forget)
    invoke("save_settings", { settings }).catch(e => console.error("Falha ao salvar configurações:", e));
}

/** Carrega as configurações do Rust Store e atualiza a UI. */
async function loadSettings() {
    try {
        const settings: AppSettings = await invoke("load_settings");

        // Atualiza a UI com os dados carregados
        lengthSlider.value = settings.length.toString();
        lengthValueDisplay.textContent = settings.length.toString();
        numbersCheck.checked = settings.numbers;
        symbolsCheck.checked = settings.symbols;
        ambiguousCheck.checked = settings.no_ambiguous;
    } catch (error) {
        console.warn("Nenhuma configuração salva encontrada, usando padrões.");
        // Se falhar (ex: primeira execução), o Rust já retorna os padrões
    }
}


// --- LÓGICA DO FRONTEND ---

/** Atualiza a barra de força visual (igual a antes). */
function updateStrengthIndicator(strength: string) {
    // ... (Sua lógica de UI permanece a mesma)
    const color = strengthColors[strength] || "#444";
    const bars = strengthIndicator.querySelectorAll('.bar') as NodeListOf<HTMLDivElement>;
    let level = 0;

    if (strength === "Muito Forte") level = 4;
    else if (strength === "Forte") level = 3;
    else if (strength === "Moderada") level = 2;
    else if (strength === "Fraca") level = 1;
    else level = 0;

    bars.forEach((bar, index) => {
        if (index < level) {
            bar.style.backgroundColor = color;
            bar.style.width = '100%';
        } else {
            bar.style.width = '0%';
        }
    });
    
    strengthText.textContent = `Força: ${strength}`;
    strengthText.style.color = color;
}

/** Chamada principal para gerar senha (igual a antes). */
async function generatePassword() {
    const options: AppSettings = {
        length: parseInt(lengthSlider.value),
        numbers: numbersCheck.checked,
        symbols: symbolsCheck.checked,
        no_ambiguous: ambiguousCheck.checked,
    };

    try {
        const result: PasswordResult = await invoke("generate_password", { options });
        
        passwordDisplay.value = result.password;
        updateStrengthIndicator(result.strength);
        
        // Sempre salve as configurações após a geração
        saveSettings(); 
        
    } catch (error) {
        console.error("Erro ao gerar senha:", error);
        passwordDisplay.value = "Erro na geração";
        updateStrengthIndicator("Muito Fraca");
    }
}

/** Função de cópia (igual a antes). */
function copyPassword() {
    if (passwordDisplay.value) {
        navigator.clipboard.writeText(passwordDisplay.value);
        copyButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
            copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 1500);
    }
}


window.addEventListener("DOMContentLoaded", () => {
    // 1. Obter referências
    lengthSlider = document.getElementById("length-slider") as HTMLInputElement;
    lengthValueDisplay = document.getElementById("length-value") as HTMLSpanElement;
    generateButton = document.getElementById("generate-button") as HTMLButtonElement;
    passwordDisplay = document.getElementById("password-display") as HTMLInputElement;
    strengthIndicator = document.getElementById("strength-indicator") as HTMLDivElement;
    strengthText = document.getElementById("strength-text") as HTMLSpanElement;
    copyButton = document.getElementById("copy-button") as HTMLButtonElement;
    numbersCheck = document.getElementById("numbers-check") as HTMLInputElement;
    symbolsCheck = document.getElementById("symbols-check") as HTMLInputElement;
    ambiguousCheck = document.getElementById("ambiguous-check") as HTMLInputElement;


    // 2. Carregar e Inicializar
    loadSettings().then(() => {
        // Gera senha inicial após carregar as configurações salvas
        generatePassword(); 
    });


    // 3. Event Listeners
    lengthSlider.addEventListener("input", () => {
        lengthValueDisplay.textContent = lengthSlider.value;
        saveSettings(); // Salva ao mover o slider
    });
    
    numbersCheck.addEventListener("change", saveSettings);
    symbolsCheck.addEventListener("change", saveSettings);
    ambiguousCheck.addEventListener("change", saveSettings);

    generateButton.addEventListener("click", generatePassword);
    copyButton.addEventListener("click", copyPassword);
});