#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use eframe::egui;
use rfd::FileDialog;
use serde::{Deserialize, Serialize};
use std::fs::{self, File};
use std::io::{self, Read, Write};
use std::path::PathBuf;
use std::sync::mpsc::{self, Receiver, Sender};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, SystemTime};
use walkdir::WalkDir;
use zip::write::{FileOptions, ZipWriter};
use zip::CompressionMethod;

#[derive(Debug)]
enum WorkerMessage {
    Log(String, String),
    Progress(f32),
    Finished(u32),
    Failed(String),
}

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
            caminho_compactados: shellexpand::tilde("~/Documents/Archived Files").to_string(),
            dias_para_considerar_antigo: 30,
            regras_de_movimentacao: {
                let mut map = std::collections::HashMap::new();
                map.insert("Images".to_string(), vec![".jpg".to_string(), ".png".to_string(), ".gif".to_string()]);
                map.insert("Documents".to_string(), vec![".pdf".to_string(), ".docx".to_string(), ".txt".to_string()]);
                map
            },
        }
    }
}

struct App {
    config: Arc<Mutex<ConfigData>>,
    tx: Sender<WorkerMessage>,
    rx: Receiver<WorkerMessage>,
    is_running: bool,
    operation_status: String,
    progress: f32,
    dry_run: bool,
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
            operation_status: "Idle".to_string(),
            progress: 0.0,
            dry_run: true,
        }
    }
}

impl eframe::App for App {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        if let Ok(msg) = self.rx.try_recv() {
            match msg {
                WorkerMessage::Log(log_msg, level) => {
                    let mut config = self.config.lock().unwrap();
                    config.history.push(format!("[{}] {}", level, log_msg));
                }
                WorkerMessage::Progress(p) => self.progress = p,
                WorkerMessage::Finished(count) => {
                    self.operation_status = format!("Operation finished. {} files affected.", count);
                    self.is_running = false;
                    self.progress = 0.0;
                }
                WorkerMessage::Failed(err) => {
                    self.operation_status = format!("Error: {}", err);
                    self.is_running = false;
                    self.progress = 0.0;
                }
            }
        }

        setup_custom_theme(ctx);

        egui::CentralPanel::default().show(ctx, |ui| {
            let mut config = self.config.lock().unwrap();
            
            ui.heading("Rust File Organizer");
            ui.separator();

            ui.horizontal(|ui| {
                if ui.button("Source Folder").clicked() {
                    if let Some(path) = FileDialog::new().pick_folder() {
                        config.source_dir = path.to_string_lossy().to_string();
                        save_config(&config);
                    }
                }
                ui.label(&config.source_dir);
            });
            
            ui.horizontal(|ui| {
                if ui.button("Target Folder").clicked() {
                    if let Some(path) = FileDialog::new().pick_folder() {
                        config.target_dir = path.to_string_lossy().to_string();
                        save_config(&config);
                    }
                }
                ui.label(&config.target_dir);
            });

             ui.horizontal(|ui| {
                if ui.button("Archive Folder").clicked() {
                    if let Some(path) = FileDialog::new().pick_folder() {
                        config.caminho_compactados = path.to_string_lossy().to_string();
                        save_config(&config);
                    }
                }
                ui.label(&config.caminho_compactados);
            });

            ui.separator();
            
            ui.horizontal(|ui| {
                let button_text = if self.dry_run { "🔍 Simulate Scan" } else { "🚀 Organize Now!" };
                if ui.button(button_text).clicked() && !self.is_running {
                    self.is_running = true;
                    self.progress = 0.0;
                    self.operation_status = if self.dry_run { "Simulating...".to_string() } else { "Organizing...".to_string() };
                    
                    config.history.clear(); 
                    config.history.push(format!("[INFO] Starting {}.", self.operation_status));
                    
                    let config_clone = Arc::clone(&self.config);
                    let tx_clone = self.tx.clone();
                    let dry_run_clone = self.dry_run;
                    
                    thread::spawn(move || {
                        let result = std::panic::catch_unwind(|| {
                            organize_and_compact(config_clone, tx_clone.clone(), dry_run_clone)
                        });

                        if let Err(panic) = result {
                            let err_msg = if let Some(s) = panic.downcast_ref::<String>() {
                                s.clone()
                            } else if let Some(s) = panic.downcast_ref::<&str>() {
                                s.to_string()
                            } else {
                                "Unknown error in worker thread".to_string()
                            };
                            tx_clone.send(WorkerMessage::Failed(err_msg)).unwrap();
                        }
                    });
                } else if self.is_running {
                    ui.add_enabled(false, egui::Button::new(&self.operation_status));
                }
                
                ui.checkbox(&mut self.dry_run, "Simulation Mode (Dry Run)");
            });

            if self.is_running && self.progress > 0.0 {
                ui.add(egui::ProgressBar::new(self.progress).show_percentage().animate(self.is_running));
            } else if self.is_running {
                 ui.spinner();
            }
            
            ui.separator();
            
            ui.heading("Action Log:");
            egui::ScrollArea::vertical().stick_to_bottom(true).show(ui, |ui| {
                ui.style_mut().override_text_style = Some(egui::TextStyle::Monospace);
                for entry in &config.history {
                    let parts: Vec<&str> = entry.splitn(2, ']').collect();
                    if parts.len() == 2 {
                        let level = parts[0].trim_start_matches('[');
                        let message = parts[1].trim();
                        let color = match level {
                            "SUCCESS" => egui::Color32::from_rgb(0, 255, 100),
                            "WARNING" => egui::Color32::from_rgb(255, 255, 0),
                            "ERROR"   => egui::Color32::from_rgb(255, 76, 76),
                            _         => ui.style().visuals.text_color(),
                        };
                        ui.colored_label(color, message);
                    } else {
                        ui.label(entry);
                    }
                }
            });
        });

        if self.is_running {
            ctx.request_repaint_after(Duration::from_millis(100));
        }
    }

    fn on_exit(&mut self, _gl: Option<&eframe::glow::Context>) {
        save_config(&self.config.lock().unwrap());
    }
}

fn get_config_path() -> io::Result<PathBuf> {
    match dirs::config_dir() {
        Some(mut path) => {
            path.push("RustFileOrganizer");
            if !path.exists() {
                fs::create_dir_all(&path)?;
            }
            path.push("config.yaml");
            Ok(path)
        }
        None => Err(io::Error::new(io::ErrorKind::NotFound, "Could not find configuration directory")),
    }
}

fn load_config() -> ConfigData {
    match get_config_path() {
        Ok(path) => fs::read_to_string(path)
            .ok()
            .and_then(|data| serde_yaml::from_str(&data).ok())
            .unwrap_or_default(),
        Err(_) => ConfigData::default(),
    }
}

fn save_config(config: &ConfigData) {
    if let (Ok(path), Ok(data)) = (get_config_path(), serde_yaml::to_string(config)) {
        _ = fs::write(path, data);
    }
}

fn organize_and_compact(config_arc: Arc<Mutex<ConfigData>>, tx: Sender<WorkerMessage>, dry_run: bool) -> Result<(), String> {
    let config = config_arc.lock().unwrap().clone();
    let tx_log = |msg: String, level: &str| {
        tx.send(WorkerMessage::Log(msg, level.to_string())).unwrap();
    };

    let source_dir = PathBuf::from(&config.source_dir);
    let target_dir = PathBuf::from(&config.target_dir);
    let compact_dir = PathBuf::from(&config.caminho_compactados);

    if !source_dir.exists() || !source_dir.is_dir() {
        return Err("Source folder not found or invalid.".to_string());
    }

    if !dry_run {
        if let Err(e) = fs::create_dir_all(&target_dir) {
            return Err(format!("Failed to create target folder: {}", e));
        }
        if let Err(e) = fs::create_dir_all(&compact_dir) {
            return Err(format!("Failed to create archive folder: {}", e));
        }
    }

    let files_to_scan: Vec<_> = WalkDir::new(&source_dir)
        .min_depth(1)
        .max_depth(1)
        .into_iter()
        .filter_map(Result::ok)
        .filter(|e| e.file_type().is_file())
        .collect();

    if files_to_scan.is_empty() {
        tx_log("No files found in source folder.".to_string(), "INFO");
        tx.send(WorkerMessage::Finished(0)).unwrap();
        return Ok(());
    }

    let total_files = files_to_scan.len() as f32;
    let mut files_to_zip = Vec::new();
    let mut processed_count = 0;
    let mut affected_count = 0;

    let time_limit = SystemTime::now() - Duration::from_secs(config.dias_para_considerar_antigo * 24 * 60 * 60);

    for entry in files_to_scan {
        processed_count += 1;
        tx.send(WorkerMessage::Progress(processed_count as f32 / total_files)).unwrap();

        let path = entry.path();
        let extension = path.extension().and_then(|s| s.to_str()).unwrap_or("").to_lowercase();
        let extension_with_dot = format!(".{}", extension);

        let mut moved = false;
        for (dir_name, extensions) in &config.regras_de_movimentacao {
            if extensions.contains(&extension_with_dot) {
                let dest_folder = target_dir.join(dir_name);
                let dest_path = dest_folder.join(entry.file_name());
                
                tx_log(format!("Moving: {} -> {}", path.display(), dest_path.display()), "INFO");

                if !dry_run {
                    if let Err(e) = fs::create_dir_all(&dest_folder) {
                         tx_log(format!("Failed to create subfolder {}: {}", dest_folder.display(), e), "ERROR");
                         continue;
                    }
                    if let Err(e) = fs::rename(path, &dest_path) {
                        tx_log(format!("Failed to move {}: {}", path.display(), e), "ERROR");
                    } else {
                        affected_count += 1;
                    }
                } else {
                    affected_count += 1;
                }
                moved = true;
                break;
            }
        }

        if !moved {
            if let Ok(metadata) = fs::metadata(path) {
                if let Ok(modified) = metadata.modified() {
                    if modified < time_limit {
                        tx_log(format!("Marked for archive (old): {}", path.display()), "WARNING");
                        files_to_zip.push(path.to_path_buf());
                    }
                }
            }
        }
    }

    if !files_to_zip.is_empty() {
        let timestamp = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
        let zip_filename = compact_dir.join(format!("Archived_Files_{}.zip", timestamp));
        tx_log(format!("Creating archive at: {}", zip_filename.display()), "INFO");
        
        if !dry_run {
            match File::create(&zip_filename) {
                Ok(file) => {
                    let mut zip = ZipWriter::new(file);
                    let options = FileOptions::default().compression_method(CompressionMethod::Deflated);
                    
                    for file_path in files_to_zip {
                        tx_log(format!("Archiving: {}", file_path.display()), "INFO");
                        if let Err(e) = zip.start_file(file_path.file_name().unwrap().to_str().unwrap(), options) {
                             tx_log(format!("Error adding {} to zip: {}", file_path.display(), e), "ERROR");
                             continue;
                        }
                        if let Ok(mut f) = File::open(&file_path) {
                            let mut buffer = Vec::new();
                            f.read_to_end(&mut buffer).unwrap();
                            zip.write_all(&buffer).unwrap();
                        }
                        
                        if let Err(e) = fs::remove_file(&file_path) {
                            tx_log(format!("Error removing original file {}: {}", file_path.display(), e), "ERROR");
                        } else {
                             affected_count += 1;
                        }
                    }
                    zip.finish().unwrap();
                    tx_log("Archive complete.".to_string(), "SUCCESS");
                }
                Err(e) => tx_log(format!("Failed to create {}: {}", zip_filename.display(), e), "ERROR"),
            }
        } else {
            affected_count += files_to_zip.len() as u32;
        }
    }

    tx.send(WorkerMessage::Finished(affected_count)).unwrap();
    Ok(())
}

fn setup_custom_theme(ctx: &egui::Context) {
    let mut visuals = egui::Visuals::dark();
    visuals.override_text_color = Some(egui::Color32::from_gray(220));
    visuals.widgets.noninteractive.bg_fill = egui::Color32::from_gray(38);
    visuals.widgets.inactive.bg_fill = egui::Color32::from_rgb(76, 82, 99);
    visuals.widgets.hovered.bg_fill = egui::Color32::from_rgb(100, 108, 129);
    visuals.widgets.active.bg_fill = egui::Color32::from_rgb(97, 175, 239);
    visuals.selection.bg_fill = egui::Color32::from_rgb(97, 175, 239);
    visuals.window_rounding = egui::Rounding::same(6.0);
    ctx.set_visuals(visuals);
}

fn main() -> eframe::Result<()> {
    let app = App::new();
    let native_options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default()
            .with_inner_size(egui::vec2(600.0, 700.0))
            .with_min_inner_size(egui::vec2(500.0, 500.0)),
        ..Default::default()
    };
    eframe::run_native("File Organizer", native_options, Box::new(|_cc| Box::new(app)))
}