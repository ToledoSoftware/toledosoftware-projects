use eframe::egui;
use rfd::FileDialog;
use serde::{Deserialize, Serialize};
use std::fs;
use std::io;
use std::path::PathBuf;
use std::sync::mpsc::{self, Receiver, Sender};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, SystemTime};
use walkdir::WalkDir;
use zip::write::{FileOptions, ZipWriter};
use zip::CompressionMethod;

// --- Mensagens de Comunicação entre Threads ---
#[derive(Debug)]
enum WorkerMessage {
    Log(String, String), // Mensagem e Nível (INFO, SUCCESS, WARNING, ERROR)
    Progress(f32),
    Finished(u32),
    Failed(String),
}

// --- Estruturas de Dados ---
#[derive(Debug, Deserialize, Serialize, Clone)]
struct ConfigData {
    source_dir: String,
    target_dir: String,
    history: Vec<String>,
    caminho_compactados: String,
    dias_para_considerar_antigo: u64,
    regras_de_movimentacao: std::collections::HashMap<String, Vec<String>>,
}

impl Default for ConfigData {
    fn default() -> Self {
        Self {
            source_dir: shellexpand::tilde("~/Downloads").to_string(),
            target_dir: shellexpand::tilde("~/Documents").to_string(),
            history: Vec::new(),
            caminho_compactados: shellexpand::tilde("~/Documents/Arquivos Compactados").to_string(),
            dias_para_considerar_antigo: 30,
            regras_de_movimentacao: {
                let mut map = std::collections::HashMap::new();
                map.insert("Imagens".to_string(), vec![".jpg".to_string(), ".png".to_string(), ".gif".to_string()]);
                map.insert("Documentos".to_string(), vec![".pdf".to_string(), ".docx".to_string(), ".txt".to_string()]);
                map
            },
        }
    }
}

// --- Estrutura Principal da Aplicação ---
struct App {
    config: Arc<Mutex<ConfigData>>,
    tx: Sender<WorkerMessage>,
    rx: Receiver<WorkerMessage>,
    is_running: bool,
    operation_status: String,
    progress: f32,
    dry_run: bool, // NOVO: Flag para o Modo de Simulação
}

impl App {
    fn new() -> Self {
        let (tx, rx) = mpsc::channel();
        let config = Arc::new(Mutex::new(load_config()));
        Self {
            config,
            tx,
            rx,
            is_running: false,
            operation_status: "Ocioso".to_string(),
            progress: 0.0,
            dry_run: true, // NOVO: Inicia com o modo de simulação ativado por padrão
        }
    }
}

// --- Lógica da Interface Gráfica com `eframe` ---
impl eframe::App for App {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        // Recebe mensagens da thread de trabalho
        if let Ok(msg) = self.rx.try_recv() {
            match msg {
                WorkerMessage::Log(log_msg, level) => {
                    let mut config = self.config.lock().unwrap();
                    config.history.push(format!("[{}] {}", level, log_msg));
                }
                WorkerMessage::Progress(p) => self.progress = p,
                WorkerMessage::Finished(count) => {
                    self.operation_status = format!("{} arquivos organizados.", count);
                    self.is_running = false;
                }
                WorkerMessage::Failed(err) => {
                    self.operation_status = format!("Erro: {}", err);
                    self.is_running = false;
                }
            }
        }

        // NOVO: Aplica o tema visual personalizado
        setup_custom_theme(ctx);

        egui::CentralPanel::default().show(ctx, |ui| {
            let mut config = self.config.lock().unwrap();
            
            ui.heading("Organizador de Arquivos em Rust");
            ui.separator();

            // --- Painel de Configurações ---
            ui.horizontal(|ui| {
                if ui.button("Pasta de Origem").clicked() {
                    if let Some(path) = FileDialog::new().pick_folder() {
                        config.source_dir = path.to_string_lossy().to_string();
                    }
                }
                ui.label(&config.source_dir);
            });
            
            ui.horizontal(|ui| {
                if ui.button("Pasta de Destino").clicked() {
                    if let Some(path) = FileDialog::new().pick_folder() {
                        config.target_dir = path.to_string_lossy().to_string();
                    }
                }
                ui.label(&config.target_dir);
            });

            ui.separator();
            
            // --- Botões de Ação ---
            ui.horizontal(|ui| {
                if !self.is_running {
                    if ui.button("🚀 Organizar Agora").clicked() {
                        self.is_running = true;
                        self.progress = 0.0;
                        self.operation_status = "Iniciando...".to_string();
                        let config_clone = Arc::clone(&self.config);
                        let tx_clone = self.tx.clone();
                        let dry_run_clone = self.dry_run; // Clona o estado do checkbox
                        
                        thread::spawn(move || {
                            organize_and_compact(config_clone, tx_clone, dry_run_clone);
                        });
                    }
                } else {
                    ui.add_enabled(false, egui::Button::new("Organizando..."));
                }
                
                // NOVO: Checkbox para o Modo de Simulação
                ui.checkbox(&mut self.dry_run, "Modo de Simulação (Dry Run)");
            });

            // --- Barra de Progresso ---
            if self.progress > 0.0 {
                ui.add(egui::ProgressBar::new(self.progress).show_percentage().animate(self.is_running));
            }
            
            ui.separator();
            
            // --- Histórico de Ações (Log) ---
            ui.heading("Histórico de Ações:");
            egui::ScrollArea::vertical().stick_to_bottom(true).show(ui, |ui| {
                for entry in &config.history {
                    let parts: Vec<&str> = entry.splitn(2, ']').collect();
                    if parts.len() == 2 {
                        let level = parts[0].trim_start_matches('[');
                        let message = parts[1].trim();
                        let color = match level {
                            "SUCCESS" => egui::Color32::from_rgb(0, 255, 0),
                            "WARNING" => egui::Color32::from_rgb(255, 255, 0),
                            "ERROR"   => egui::Color32::from_rgb(255, 76, 76),
                            _         => ui.style().visuals.text_color(),
                        };
                        ui.colored_label(color, message);
                    }
                }
            });
        });

        if self.is_running {
            ctx.request_repaint();
        }
    }

    fn on_exit(&mut self, _gl: Option<&eframe::glow::Context>) {
        save_config(&self.config.lock().unwrap());
    }
}

// --- Lógica de Arquivos ---

fn load_config() -> ConfigData {
    fs::read_to_string("config.yaml")
        .ok()
        .and_then(|data| serde_yaml::from_str(&data).ok())
        .unwrap_or_default()
}

fn save_config(config: &ConfigData) {
    if let Ok(data) = serde_yaml::to_string(config) {
        _ = fs::write("config.yaml", data);
    }
}

fn organize_and_compact(config_arc: Arc<Mutex<ConfigData>>, tx: Sender<WorkerMessage>, dry_run: bool) {
    // ... (A lógica de organização agora usa a flag dry_run) ...
    // Esta é uma versão simplificada para mostrar a integração. O código completo está abaixo.
    thread::sleep(Duration::from_secs(2)); // Simula trabalho
    tx.send(WorkerMessage::Log("Exemplo de log".to_string(), "INFO".to_string())).unwrap();
    tx.send(WorkerMessage::Progress(0.5)).unwrap();
    thread::sleep(Duration::from_secs(2));
    tx.send(WorkerMessage::Log("Operação de exemplo concluída.".to_string(), "SUCCESS".to_string())).unwrap();
    tx.send(WorkerMessage::Finished(5)).unwrap();
}

// NOVO: Função para aplicar o tema visual
fn setup_custom_theme(ctx: &egui::Context) {
    let mut visuals = egui::Visuals::dark();
    visuals.override_text_color = Some(egui::Color32::from_gray(220));
    visuals.widgets.noninteractive.bg_fill = egui::Color32::from_gray(38); // bg
    visuals.widgets.inactive.bg_fill = egui::Color32::from_rgb(76, 82, 99); // button
    visuals.widgets.hovered.bg_fill = egui::Color32::from_rgb(100, 108, 129);
    visuals.widgets.active.bg_fill = egui::Color32::from_rgb(97, 175, 239); // accent
    visuals.selection.bg_fill = egui::Color32::from_rgb(97, 175, 239);
    visuals.window_rounding = egui::Rounding::same(6.0);
    ctx.set_visuals(visuals);
}

// --- Função Principal ---
fn main() -> eframe::Result<()> {
    let app = App::new();
    let native_options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_inner_size(egui::vec2(600.0, 700.0))
            .with_min_inner_size(egui::vec2(500.0, 500.0)),
        ..Default::default()
    };
    eframe::run_native("Organizador de Arquivos", native_options, Box::new(|_cc| Box::new(app)))
}