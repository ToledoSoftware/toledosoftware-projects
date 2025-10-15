// Previne a abertura de uma janela de console no Windows em modo de release.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::process::Command;
use std::sync::{Mutex, Arc}; 
use std::time::Duration; 
use regex::Regex;
use sysinfo::System; 
use winreg::enums::*;
use winreg::{RegKey, HKEY}; 
use tauri::{Manager, Emitter};

// GUIDs para o Timeout de Suspensão
const SUBGROUP_GUID_SLEEP: &str = "238c9fa8-0aad-41ed-83f4-97be242c8f20"; // Subgrupo Suspensão
const SETTING_GUID_SLEEP_AC: &str = "29f6c1db-86da-48c5-9fdb-f2b67b1f44da"; // Sleep Timeout (AC)

// --- STRUCTS DO SISTEMA ---
#[derive(serde::Serialize, Clone)]
struct SystemInfo {
    cpu_usage: f32,
    ram_usage_gb: f64,
    total_ram_gb: f64,
}

// Struct para Programas de Inicialização
#[derive(serde::Serialize, Clone)]
struct StartupProgram {
    name: String,
    value: String, 
    is_enabled: bool,
    key_path: String, 
}


// --- ESTADO GLOBAL ATUALIZADO ---
struct AppState {
    original_power_plan: Mutex<Option<String>>,
    // NOVO: Armazena o valor original do timeout de suspensão do sistema
    original_sleep_timeout: Mutex<Option<String>>, 
    sys: Arc<Mutex<System>>, 
}

// --- FUNÇÕES AUXILIARES DE ENERGIA ---

// Função auxiliar para obter o valor atual de um setting de powercfg
fn get_current_setting_value(setting_guid: &str) -> Result<String, String> {
    let output = Command::new("powercfg")
        .args(&["/Q", "CURRENT", setting_guid])
        .output()
        .map_err(|e| e.to_string())?;

    let output_str = String::from_utf8_lossy(&output.stdout);
    
    let re = Regex::new(r"Current AC Power Setting Index: 0x([0-9a-fA-F]+)").unwrap();
    
    if let Some(caps) = re.captures(&output_str) {
        // Retorna o valor em hexadecimal como string
        Ok(caps.get(1).map_or("".to_string(), |m| m.as_str().to_string()))
    } else {
        Err(format!("Falha ao ler o valor atual de {}", setting_guid))
    }
}


// --- GERENCIAMENTO DE INICIALIZAÇÃO ---

fn get_programs_from_key(hkey: HKEY, subkey_path: &str, current_key_path: &str) -> Result<Vec<StartupProgram>, String> {
    let mut programs = Vec::new();
    let hklm = RegKey::predef(hkey);
    
    let run_key = match hklm.open_subkey(subkey_path) {
        Ok(key) => key,
        Err(_) => return Ok(programs), 
    };

    let disable_key = match hklm.open_subkey_with_flags(
        &format!("{}\\Disabled", subkey_path), 
        KEY_READ | KEY_WRITE
    ) {
        Ok(key) => Some(key),
        Err(_) => None,
    };

    for entry in run_key.enum_values().filter_map(Result::ok) {
        let (name, reg_value) = entry;
        let value = reg_value.to_string();
        
        let is_enabled = match &disable_key {
            Some(key) => key.get_value::<String, &str>(&name).is_err(),
            None => true, 
        };

        programs.push(StartupProgram {
            name: name.clone(),
            value,
            is_enabled,
            key_path: current_key_path.to_string(),
        });
    }

    Ok(programs)
}

#[tauri::command]
fn get_startup_programs() -> Result<Vec<StartupProgram>, String> {
    let mut all_programs = Vec::new();

    let keys_hklm = [
        (HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", "HKLM\\Run"),
        (HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce", "HKLM\\RunOnce"),
    ];

    let keys_hkcu = [
        (HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", "HKCU\\Run"),
        (HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce", "HKCU\\RunOnce"),
    ];

    for (hkey, subkey, path) in keys_hklm.iter().chain(keys_hkcu.iter()) {
        if let Ok(mut programs) = get_programs_from_key(*hkey, subkey, path) {
            all_programs.append(&mut programs);
        }
    }

    Ok(all_programs)
}

#[tauri::command]
fn set_startup_program_enabled(program_name: String, key_path: String, enable: bool) -> Result<String, String> {
    let parts: Vec<&str> = key_path.split('\\').collect();
    if parts.len() < 2 { return Err("Caminho de Registro inválido.".to_string()); }

    let hkey = match parts[0] {
        "HKLM" => HKEY_LOCAL_MACHINE,
        "HKCU" => HKEY_CURRENT_USER,
        _ => return Err("Chave base de Registro inválida.".to_string()),
    };

    let subkey = parts[1..].join("\\");
    
    let root_key = RegKey::predef(hkey);
    let run_key = root_key.open_subkey_with_flags(&subkey, KEY_READ).map_err(|e| format!("Falha ao abrir chave RUN: {}", e))?;
    
    let original_value = run_key.get_value::<String, &str>(&program_name)
        .map_err(|e| format!("Programa não encontrado na chave RUN: {}", e))?;
    
    let run_key_write = root_key.open_subkey_with_flags(&subkey, KEY_READ | KEY_WRITE).map_err(|e| format!("Falha ao abrir chave RUN para escrita: {}", e))?;

    let disabled_path = format!("{}\\Disabled", subkey);
    let (disabled_key, _) = root_key.create_subkey_with_flags(&disabled_path, KEY_READ | KEY_WRITE).map_err(|e| format!("Falha ao criar/abrir chave DISABLED: {}", e))?;

    if enable {
        if disabled_key.delete_value(&program_name).is_ok() {
             run_key_write.set_value(&program_name, &original_value).map_err(|e| format!("Falha ao reabilitar programa: {}", e))?;
        }
        Ok(format!("Programa '{}' habilitado na inicialização.", program_name))
    } else {
        run_key_write.delete_value(&program_name).map_err(|e| format!("Falha ao desabilitar programa (deletar RUN): {}", e))?;
        disabled_key.set_value(&program_name, &original_value).map_err(|e| format!("Falha ao desabilitar programa (setar DISABLED): {}", e))?;
        Ok(format!("Programa '{}' desabilitado na inicialização.", program_name))
    }
}


// --- COMANDOS DE OTIMIZAÇÃO (ATUALIZADOS) ---

#[derive(serde::Deserialize, serde::Serialize)]
struct FocusConfig { processes_to_kill: Vec<String> }
fn get_config_path() -> std::path::PathBuf {
    let mut path = std::env::current_dir().expect("Failed to get current directory");
    path.push("focus_config.json");
    path
}
#[tauri::command]
fn load_focus_mode_config() -> Result<Vec<String>, String> {
    let config_path = get_config_path();
    if !config_path.exists() { return Ok(Vec::new()); }
    let data = fs::read_to_string(config_path).map_err(|e| e.to_string())?;
    let config: FocusConfig = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(config.processes_to_kill)
}
#[tauri::command]
fn save_focus_mode_config(processes: Vec<String>) -> Result<(), String> {
    let config = FocusConfig { processes_to_kill: processes };
    let data = serde_json::to_string_pretty(&config).map_err(|e| e.to_string())?;
    fs::write(get_config_path(), data).map_err(|e| e.to_string())?;
    Ok(())
}
fn get_friendly_process_name(name: &str) -> String {
    match name.to_lowercase().as_str() {
        "msedge.exe" => "Microsoft Edge", "chrome.exe" => "Google Chrome", "firefox.exe" => "Mozilla Firefox",
        "discord.exe" => "Discord", "spotify.exe" => "Spotify", "steam.exe" => "Steam",
        "epicgameslauncher.exe" => "Epic Games Launcher", "onedrive.exe" => "Microsoft OneDrive",
        "teams.exe" => "Microsoft Teams", "slack.exe" => "Slack", "code.exe" => "Visual Studio Code",
        "explorer.exe" => "Windows Explorer", _ => name,
    }.to_string()
}
#[tauri::command]
fn get_running_processes() -> Vec<String> {
    let mut s = System::new_all(); s.refresh_processes(); let mut process_names = Vec::new();
    for process in s.processes().values() { process_names.push(get_friendly_process_name(process.name())); }
    process_names.sort_by(|a, b| a.to_lowercase().cmp(&b.to_lowercase())); process_names.dedup();
    process_names
}
fn get_executable_name(friendly_name: &str) -> String {
    match friendly_name {
        "Microsoft Edge" => "msedge.exe", "Google Chrome" => "chrome.exe", "Mozilla Firefox" => "firefox.exe",
        "Discord" => "discord.exe", "Spotify" => "spotify.exe", "Steam" => "steam.exe",
        "Epic Games Launcher" => "epicgameslauncher.exe", "Microsoft OneDrive" => "onedrive.exe",
        "Microsoft Teams" => "teams.exe", "Slack" => "slack.exe", "Visual Studio Code" => "code.exe",
        "Windows Explorer" => "explorer.exe", _ => friendly_name,
    }.to_string()
}
#[tauri::command]
fn enter_focus_mode() -> Result<String, String> {
    let friendly_names_to_kill = load_focus_mode_config().unwrap_or_else(|_| Vec::new());
    if friendly_names_to_kill.is_empty() { return Ok("Modo Foco: Nenhum aplicativo configurado.".to_string()); }
    let processes_to_kill: Vec<String> = friendly_names_to_kill.iter().map(|name| get_executable_name(name)).collect();
    let mut s = System::new(); s.refresh_processes(); let mut killed_count = 0;
    for proc_name in processes_to_kill {
        for process in s.processes_by_name(&proc_name) { if process.kill() { killed_count += 1; } }
    }
    Ok(format!("Modo Foco: {} processos encerrados.", killed_count))
}
#[tauri::command]
fn clear_system_cache() -> Result<String, String> {
    let temp_dir = std::env::temp_dir();
    let prefetch_dir = std::path::Path::new("C:\\Windows\\Prefetch"); let mut cleared_count = 0;
    if let Ok(entries) = fs::read_dir(temp_dir) {
        for entry in entries.flatten() {
            if fs::remove_dir_all(entry.path()).is_ok() || fs::remove_file(entry.path()).is_ok() { cleared_count += 1; }
        }
    }
    if let Ok(entries) = fs::read_dir(prefetch_dir) {
        for entry in entries.flatten() {
            if fs::remove_dir_all(entry.path()).is_ok() || fs::remove_file(entry.path()).is_ok() { cleared_count += 1; }
        }
    }
    Ok(format!("Limpeza de Cache: {} itens removidos.", cleared_count))
}
#[tauri::command]
fn set_high_performance_plan(state: tauri::State<AppState>) -> Result<String, String> {
    // --- 1. GERENCIAMENTO DO PLANO DE ENERGIA ---
    let get_active_output = Command::new("powercfg").args(["/getactivescheme"]).output().map_err(|e| e.to_string())?;
    let active_scheme_str = String::from_utf8_lossy(&get_active_output.stdout);
    let re = Regex::new(r"GUID: ([\w-]+)").unwrap();
    if let Some(caps) = re.captures(&active_scheme_str) {
        if let Some(guid) = caps.get(1) {
            let mut original_guid = state.original_power_plan.lock().unwrap();
            *original_guid = Some(guid.as_str().to_string());
        }
    }
    const HIGH_PERFORMANCE_GUID: &str = "8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c";
    Command::new("powercfg").args(["/S", HIGH_PERFORMANCE_GUID]).output().map_err(|e| e.to_string())?;

    // --- 2. GERENCIAMENTO DA SUSPENSÃO (NOVO) ---
    match get_current_setting_value(SETTING_GUID_SLEEP_AC) {
        Ok(original_value) => {
            let mut original_sleep = state.original_sleep_timeout.lock().unwrap();
            *original_sleep = Some(original_value);
        },
        Err(e) => eprintln!("Erro ao salvar timeout de suspensão: {}", e), 
    }

    // Define o timeout de suspensão (AC) para ZERO (desabilita/Never)
    if Command::new("powercfg").args(&["/SETACVALUEINDEX", HIGH_PERFORMANCE_GUID, SUBGROUP_GUID_SLEEP, SETTING_GUID_SLEEP_AC, "0"]).output().is_err() {
        return Err("Falha ao desativar a suspensão do sistema.".to_string());
    }

    Ok("Plano de energia 'Alto Desempenho' ativado e suspensão desativada.".to_string())
}

#[tauri::command]
fn restore_default_plan(state: tauri::State<AppState>) -> Result<String, String> {
    let balanced_guid = "381b4222-f694-41f0-9685-ff5bb260df2e";
    let mut guid_to_restore = balanced_guid.to_string();
    let mut original_guid = state.original_power_plan.lock().unwrap();
    if let Some(saved_guid) = original_guid.take() { guid_to_restore = saved_guid; }
    Command::new("powercfg").args(["/S", &guid_to_restore]).output().map_err(|e| e.to_string())?;

    let mut restore_msg = "Plano de energia anterior restaurado.".to_string();

    // --- RESTAURAÇÃO DA SUSPENSÃO (NOVO) ---
    let mut original_sleep = state.original_sleep_timeout.lock().unwrap();
    if let Some(saved_sleep_hex) = original_sleep.take() {
        // Restaura o valor hexadecimal original para o plano restaurado
        if Command::new("powercfg").args(&["/SETACVALUEINDEX", &guid_to_restore, SUBGROUP_GUID_SLEEP, SETTING_GUID_SLEEP_AC, &saved_sleep_hex]).output().is_ok() {
            restore_msg = "Plano de energia e timeout de suspensão restaurados.".to_string();
        } else {
            restore_msg = "Plano de energia restaurado, mas falha ao restaurar timeout de suspensão.".to_string();
        }
    }

    Ok(restore_msg)
}
#[tauri::command]
fn optimize_network() -> Result<String, String> {
    let flush_dns = Command::new("ipconfig").arg("/flushdns").output();
    if flush_dns.is_err() { return Err("Falha ao limpar o cache DNS.".to_string()); }
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
    let interfaces_path = r"SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces";
    let interfaces_key = hklm.open_subkey(interfaces_path).map_err(|_| "Falha ao acessar interfaces de rede.".to_string())?;
    let mut changes_made = 0;
    for interface_name in interfaces_key.enum_keys().filter_map(Result::ok) {
        let interface_path = format!(r"{}\{}", interfaces_path, interface_name);
        if let Ok(interface_key) = hklm.open_subkey_with_flags(&interface_path, KEY_WRITE) {
            if interface_key.set_value("TcpAckFrequency", &1u32).is_ok() { changes_made += 1; }
        }
    }
    if changes_made > 0 { Ok(format!("Rede otimizada ({} interfaces ajustadas) e cache DNS limpo.", changes_made)) }
    else { Ok("Cache DNS limpo. Nenhuma outra otimização de rede foi necessária.".to_string()) }
}

fn main() {
    let sys_state = Arc::new(Mutex::new(System::new_all()));

    tauri::Builder::default()
        .manage(AppState {
            original_power_plan: Mutex::new(None),
            // NOVO: Inicializa o Mutex de sleep timeout
            original_sleep_timeout: Mutex::new(None), 
            sys: sys_state.clone(),
        })
        .setup(|app| {
            let app_handle = app.handle().clone();
            let sys_monitor_arc = app_handle.state::<AppState>().inner().sys.clone();

            std::thread::spawn(move || {
                let mut sys_monitor = sys_monitor_arc.lock().unwrap();
                loop {
                    sys_monitor.refresh_cpu();
                    sys_monitor.refresh_memory();

                    let total_ram_gb = sys_monitor.total_memory() as f64 / 1024.0 / 1024.0 / 1024.0;
                    let used_ram_gb = sys_monitor.used_memory() as f64 / 1024.0 / 1024.0 / 1024.0;

                    let stats = SystemInfo {
                        cpu_usage: sys_monitor.global_cpu_info().cpu_usage(), 
                        ram_usage_gb: used_ram_gb,
                        total_ram_gb,
                    };

                    if let Err(e) = app_handle.emit("system-stats", stats) {
                        eprintln!("Failed to emit system stats event: {:?}", e);
                    }

                    std::thread::sleep(Duration::from_secs(2));
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            enter_focus_mode,
            clear_system_cache,
            set_high_performance_plan,
            restore_default_plan,
            get_running_processes,
            save_focus_mode_config,
            load_focus_mode_config,
            optimize_network,
            get_startup_programs, 
            set_startup_program_enabled 
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}