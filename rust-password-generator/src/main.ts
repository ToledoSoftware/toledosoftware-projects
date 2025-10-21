import { invoke } from "@tauri-apps/api/tauri";

// Estruturas de dados para configurações e resultado da senha
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

// Cores associadas aos níveis de força da senha
const strengthColors: { [key: string]: string } = {
    "Muito Fraca": "#ff0000",
    "Fraca": "#ff8c00",
    "Moderada": "#ffff00",
    "Forte": "#32cd32",
    "Muito Forte": "#00ff00"
};

// Referências para elementos da interface
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

// Salva as configurações atuais no backend Rust
function saveSettings() {
        const settings: AppSettings = {
                length: parseInt(lengthSlider.value),
                numbers: numbersCheck.checked,
                symbols: symbolsCheck.checked,
                no_ambiguous: ambiguousCheck.checked,
        };
        invoke("save_settings", { settings }).catch(e => console.error("Falha ao salvar configurações:", e));
}

// Carrega configurações do backend Rust e atualiza a interface
async function loadSettings() {
        try {
                const settings: AppSettings = await invoke("load_settings");
                lengthSlider.value = settings.length.toString();
                lengthValueDisplay.textContent = settings.length.toString();
                numbersCheck.checked = settings.numbers;
                symbolsCheck.checked = settings.symbols;
                ambiguousCheck.checked = settings.no_ambiguous;
        } catch (error) {
                console.warn("Nenhuma configuração salva encontrada, usando padrões.");
        }
}

// Atualiza a barra visual de força da senha
function updateStrengthIndicator(strength: string) {
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

// Gera uma nova senha e atualiza a interface
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
                saveSettings(); 
        } catch (error) {
                console.error("Erro ao gerar senha:", error);
                passwordDisplay.value = "Erro na geração";
                updateStrengthIndicator("Muito Fraca");
        }
}

// Copia a senha gerada para a área de transferência
function copyPassword() {
        if (passwordDisplay.value) {
                navigator.clipboard.writeText(passwordDisplay.value);
                copyButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                setTimeout(() => {
                        copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
                }, 1500);
        }
}

// Inicializa referências, carrega configurações e define eventos
window.addEventListener("DOMContentLoaded", () => {
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

        loadSettings().then(() => {
                generatePassword(); 
        });

        lengthSlider.addEventListener("input", () => {
                lengthValueDisplay.textContent = lengthSlider.value;
                saveSettings();
        });
        
        numbersCheck.addEventListener("change", saveSettings);
        symbolsCheck.addEventListener("change", saveSettings);
        ambiguousCheck.addEventListener("change", saveSettings);

        generateButton.addEventListener("click", generatePassword);
        copyButton.addEventListener("click", copyPassword);
});
