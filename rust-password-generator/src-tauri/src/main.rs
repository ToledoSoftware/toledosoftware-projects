#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rand::Rng;
use serde_json;
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

// --- Estruturas de Dados ---

#[derive(serde::Deserialize)]
struct PasswordOptions {
    length: usize,
    numbers: bool,
    symbols: bool,
    no_ambiguous: bool,
}

#[derive(Debug, Clone, serde::Serialize, serde::Deserialize)]
struct AppSettings {
    length: usize,
    numbers: bool,
    symbols: bool,
    no_ambiguous: bool,
}

#[derive(serde::Serialize)]
struct PasswordResult {
    password: String,
    strength: String,
}

// --- Lógica de Geração de Senha ---

fn calculate_strength(password: &str, has_numbers: bool, has_symbols: bool) -> String {
    let len = password.len();
    let mut score = 0;

    if len >= 16 { score += 2; } 
    else if len >= 12 { score += 1; }
    if has_numbers { score += 1; }
    if has_symbols { score += 1; }

    let strength_str = match score {
        0..=1 => "Muito Fraca",
        2 => "Fraca",
        3 => "Moderada",
        4 => "Forte",
        _ => "Muito Forte",
    };
    strength_str.to_string()
}

#[tauri::command]
fn generate_password(options: PasswordOptions) -> PasswordResult {
    // Monta o conjunto de caracteres conforme as opções
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789"; 
    let symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let mut final_letters = String::from(letters);
    let final_numbers = String::from(numbers);
    let final_symbols = String::from(symbols);

    if options.no_ambiguous {
        final_letters = String::from("abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ");
    }

    let mut charset = final_letters;
    if options.numbers {
        charset.push_str(&final_numbers);
    }
    if options.symbols {
        charset.push_str(&final_symbols);
    }

    // Gera a senha aleatória
    let mut rng = rand::thread_rng();
    let password: String = (0..options.length)
        .map(|_| {
            let idx = rng.gen_range(0..charset.len());
            charset.chars().nth(idx).unwrap()
        })
        .collect();

    let strength = calculate_strength(&password, options.numbers, options.symbols);

    PasswordResult { password, strength }
}

// --- Persistência de Configurações ---

// Retorna o caminho do arquivo de configurações do app
fn get_config_path(app_handle: &tauri::AppHandle) -> Result<PathBuf, String> {
    let app_dir = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or_else(|| "Não foi possível encontrar o diretório de dados do aplicativo.".to_string())?;

    if !app_dir.exists() {
        fs::create_dir_all(&app_dir)
            .map_err(|e| format!("Falha ao criar diretório: {}", e))?;
    }
    
    Ok(app_dir.join("settings.json"))
}

// Carrega as configurações do arquivo ou retorna padrão
#[tauri::command]
async fn load_settings(app_handle: tauri::AppHandle) -> Result<AppSettings, String> {
    let path = get_config_path(&app_handle)?;
    match fs::read_to_string(&path) {
        Ok(data) => {
            serde_json::from_str(&data).map_err(|e| format!("Falha ao desserializar configurações: {}", e))
        }
        Err(e) if e.kind() == std::io::ErrorKind::NotFound => {
            Ok(AppSettings {
                length: 16,
                numbers: true,
                symbols: true,
                no_ambiguous: false,
            })
        }
        Err(e) => Err(format!("Falha ao ler o arquivo de configurações: {}", e)),
    }
}

// Salva as configurações no arquivo
#[tauri::command]
async fn save_settings(app_handle: tauri::AppHandle, settings: AppSettings) -> Result<(), String> {
    let path = get_config_path(&app_handle)?;
    let json_data = serde_json::to_string_pretty(&settings)
        .map_err(|e| format!("Falha ao serializar configurações: {}", e))?;

    fs::write(&path, json_data)
        .map_err(|e| format!("Falha ao salvar configurações no disco: {}", e))?;

    Ok(())
}

// --- Função Principal ---

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            generate_password, 
            load_settings, 
            save_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
