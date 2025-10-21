import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
import json
import os
import time
import logging
from threading import Thread, Event
from datetime import datetime, timedelta
import ttkbootstrap as ttk

# --- Configuração do Logging ---
logging.basicConfig(filename='monitor.log', level=logging.INFO,
                    format='%(asctime)s - %(message)s', datefmt='%d-%b-%y %H:%M:%S')

# --- GERENCIAMENTO DE IDIOMAS ---
LANGUAGES = {
    'en': {
        'window_title': "Downloads Organizer v3.2",
        'monitored_folder_label': "Folder to Watch:",
        'select_folder_button': "Select",
        'start_time_label': "Start at:",
        'shutdown_checkbox': "Shutdown PC when complete",
        'toggle_button_start': "Start Monitoring",
        'toggle_button_stop': "Stop Monitoring",
        'language_label': "Language:",
        'status_ready': "Ready.",
        'folder_changed_log': "Folder changed to: {}",
        'waiting_log': "Waiting until {} to start...",
        'scheduled_tomorrow_log': "Time set for tomorrow at {}.",
        'invalid_time_log': "ERROR: Invalid time. Starting immediately.",
        'monitoring_started_log': ">>> Monitoring started...",
        'monitoring_stopped_log': ">>> Monitoring stopped by user.",
        'loop_ended_log': "Monitoring loop ended.",
        'config_error_log': "ERROR: Could not load 'config.json'. {}",
        'folder_not_exist_log': "ERROR: Folder '{}' does not exist.",
        'moved_log': "Moved: '{}' -> to '{}' folder",
        'move_error_log': "ERROR moving '{}': {}",
        'inactivity_log': "No activity for {} minutes. Initiating shutdown...",
        'shutdown_cancelled_log': "Shutdown cancelled by user.",
        'shutdown_initiated_log': "Shutting down system now...",
        'shutdown_messagebox_title': "Scheduled Shutdown",
        'shutdown_messagebox_text': "The computer will shut down in {} seconds.\nDo you want to cancel the shutdown?",
    },
    'pt': {
        'window_title': "Organizador de Downloads v3.2",
        'monitored_folder_label': "Pasta a ser Observada:",
        'select_folder_button': "Selecionar",
        'start_time_label': "Iniciar às:",
        'shutdown_checkbox': "Desligar o PC ao concluir",
        'toggle_button_start': "Iniciar Monitoramento",
        'toggle_button_stop': "Parar Monitoramento",
        'language_label': "Idioma:",
        'status_ready': "Pronto.",
        'folder_changed_log': "Pasta alterada para: {}",
        'waiting_log': "Aguardando até as {} para iniciar...",
        'scheduled_tomorrow_log': "Horário definido para amanhã às {}.",
        'invalid_time_log': "ERRO: Horário inválido. Iniciando imediatamente.",
        'monitoring_started_log': ">>> Monitoramento iniciado...",
        'monitoring_stopped_log': ">>> Monitoramento parado pelo usuário.",
        'loop_ended_log': "Loop de monitoramento encerrado.",
        'config_error_log': "ERRO: Não foi possível carregar 'config.json'. {}",
        'folder_not_exist_log': "ERRO: A pasta '{}' não existe.",
        'moved_log': "Movido: '{}' -> para pasta '{}'",
        'move_error_log': "ERRO ao mover '{}': {}",
        'inactivity_log': "Nenhuma atividade por {} minutos. Iniciando desligamento...",
        'shutdown_cancelled_log': "Desligamento cancelado pelo usuário.",
        'shutdown_initiated_log': "Desligando o sistema agora...",
        'shutdown_messagebox_title': "Desligamento Agendado",
        'shutdown_messagebox_text': "O computador será desligado em {} segundos.\nDeseja cancelar o desligamento?",
    }
}

# Define o idioma inicial. O usuário poderá mudar isso na interface.
CURRENT_LANGUAGE = 'pt' 
STRINGS = LANGUAGES[CURRENT_LANGUAGE]


class DownloadMonitorGUI:
    def __init__(self, root):
        self.root = root
        self.is_monitoring = False
        
        self.monitor_thread = None
        self.stop_event = Event()
        self.monitoring_path = tk.StringVar(value=os.path.join(os.path.expanduser('~'), 'Downloads'))
        self.shutdown_var = tk.BooleanVar(value=False)
        self.start_hour_var = tk.StringVar(value=datetime.now().strftime("%H"))
        self.start_minute_var = tk.StringVar(value=(datetime.now() + timedelta(minutes=1)).strftime("%M"))
        self.language_var = tk.StringVar(value='Português' if CURRENT_LANGUAGE == 'pt' else 'English')

        self.create_widgets()
        self.update_ui_language()

    def create_widgets(self):
        config_frame = ttk.Frame(self.root, padding=10)
        config_frame.pack(fill='x', padx=10)

        # Linha 0: Pasta
        self.folder_label = ttk.Label(config_frame)
        self.folder_label.grid(row=0, column=0, sticky='w')
        path_entry = ttk.Entry(config_frame, textvariable=self.monitoring_path, width=40, state='readonly')
        path_entry.grid(row=0, column=1, padx=5, sticky='ew')
        self.select_button = ttk.Button(config_frame, command=self.select_folder, bootstyle="outline")
        self.select_button.grid(row=0, column=2)
        
        # Linha 1: Horário e Desligamento
        self.start_label = ttk.Label(config_frame)
        self.start_label.grid(row=1, column=0, sticky='w', pady=10)
        time_frame = ttk.Frame(config_frame)
        time_frame.grid(row=1, column=1, sticky='w', padx=5)
        ttk.Spinbox(time_frame, from_=0, to=23, textvariable=self.start_hour_var, wrap=True, width=3).pack(side='left')
        ttk.Label(time_frame, text=":").pack(side='left', padx=2)
        ttk.Spinbox(time_frame, from_=0, to=59, textvariable=self.start_minute_var, wrap=True, width=3).pack(side='left')
        self.shutdown_check = ttk.Checkbutton(config_frame, variable=self.shutdown_var, bootstyle="round-toggle")
        self.shutdown_check.grid(row=1, column=2, sticky='w', padx=10)

        # Linha 2: Idioma
        self.language_label = ttk.Label(config_frame)
        self.language_label.grid(row=2, column=0, sticky='w')
        self.language_selector = ttk.Combobox(config_frame, textvariable=self.language_var, values=['Português', 'English'], state="readonly", width=10)
        self.language_selector.grid(row=2, column=1, sticky='w', padx=5)
        self.language_selector.bind('<<ComboboxSelected>>', self.change_language)
        
        config_frame.grid_columnconfigure(1, weight=1)

        # Log Box e Botão de Ação
        self.log_box = scrolledtext.ScrolledText(self.root, height=10, bg="#1E1E1E", fg="#D3D3D3", state='disabled', relief="solid", bd=1)
        self.log_box.pack(padx=10, pady=5, fill='both', expand=True)
        self.toggle_button = ttk.Button(self.root, command=self.toggle_monitoring)
        self.toggle_button.pack(fill='x', expand=True, padx=15, pady=(5, 15))

    def update_ui_language(self):
        """Atualiza todos os textos da interface para o idioma selecionado."""
        self.root.title(STRINGS['window_title'])
        self.folder_label.config(text=STRINGS['monitored_folder_label'])
        self.select_button.config(text=STRINGS['select_folder_button'])
        self.start_label.config(text=STRINGS['start_time_label'])
        self.shutdown_check.config(text=STRINGS['shutdown_checkbox'])
        self.language_label.config(text=STRINGS['language_label'])
        if self.is_monitoring:
            self.toggle_button.config(text=STRINGS['toggle_button_stop'])
        else:
            self.toggle_button.config(text=STRINGS['toggle_button_start'])

    def change_language(self, event=None):
        """Chamado quando o usuário muda o idioma no ComboBox."""
        global STRINGS
        selected_lang = self.language_var.get()
        lang_code = 'pt' if selected_lang == 'Português' else 'en'
        STRINGS = LANGUAGES[lang_code]
        self.update_ui_language()

    def log_to_gui(self, message):
        self.root.after(0, self._log_to_gui_thread_safe, message)

    def _log_to_gui_thread_safe(self, message):
        self.log_box.config(state='normal')
        self.log_box.insert(tk.END, f"{datetime.now().strftime('%H:%M:%S')} - {message}\n")
        self.log_box.see(tk.END)
        self.log_box.config(state='disabled')
        logging.info(message)
    
    def toggle_monitoring(self):
        """Função única que Inicia ou Para o monitoramento."""
        if self.is_monitoring:
            self.stop_monitoring()
        else:
            self.start_monitoring()

    def start_monitoring(self):
        self.is_monitoring = True
        self.toggle_button.config(text=STRINGS['toggle_button_stop'], bootstyle="danger")
        self.stop_event.clear()
        self.monitor_thread = Thread(target=self.schedule_and_monitor, daemon=True)
        self.monitor_thread.start()

    def stop_monitoring(self):
        self.is_monitoring = False
        self.stop_event.set()
        self.log_to_gui(STRINGS['monitoring_stopped_log'])
        self.toggle_button.config(text=STRINGS['toggle_button_start'], bootstyle="success")

    # O resto das funções (schedule_and_monitor, monitor_folder_logic, etc.)
    # permanece o mesmo, mas usando STRINGS[] para todas as mensagens.
    # Abaixo, a versão completa e correta de todas as funções.
    def select_folder(self):
        folder_selected = filedialog.askdirectory()
        if folder_selected:
            self.monitoring_path.set(folder_selected)
            self.log_to_gui(STRINGS['folder_changed_log'].format(folder_selected))

    def schedule_and_monitor(self):
        try:
            hour, minute = int(self.start_hour_var.get()), int(self.start_minute_var.get())
            now = datetime.now()
            start_time = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
            if start_time < now:
                start_time += timedelta(days=1)
                self.log_to_gui(STRINGS['scheduled_tomorrow_log'].format(start_time.strftime('%H:%M')))
            else:
                self.log_to_gui(STRINGS['waiting_log'].format(start_time.strftime('%H:%M')))
            if self.stop_event.wait(timeout=(start_time - now).total_seconds()): return
        except ValueError: self.log_to_gui(STRINGS['invalid_time_log'])
        self.log_to_gui(STRINGS['monitoring_started_log'])
        self.monitor_folder_logic()

    def monitor_folder_logic(self):
        try:
            with open('config.json', 'r') as f: config = json.load(f)
        except Exception as e:
            self.log_to_gui(STRINGS['config_error_log'].format(e)); self.stop_monitoring(); return
        path_to_watch = self.monitoring_path.get()
        if not os.path.isdir(path_to_watch):
            self.log_to_gui(STRINGS['folder_not_exist_log'].format(path_to_watch)); self.stop_monitoring(); return
        last_activity_time = time.time()
        SHUTDOWN_TIMEOUT = 300
        while not self.stop_event.is_set():
            moved_file = False
            for filename in os.listdir(path_to_watch):
                source_path = os.path.join(path_to_watch, filename)
                if os.path.isdir(source_path): continue
                file_extension = os.path.splitext(filename)[1].lower()
                destination_folder = next((folder for folder, exts in config.items() if file_extension in exts), None)
                if destination_folder:
                    dest_dir_path = os.path.join(path_to_watch, destination_folder)
                    os.makedirs(dest_dir_path, exist_ok=True)
                    destination_path = os.path.join(dest_dir_path, filename)
                    try:
                        os.rename(source_path, destination_path)
                        self.log_to_gui(STRINGS['moved_log'].format(filename, destination_folder)); moved_file = True
                    except Exception as e: self.log_to_gui(STRINGS['move_error_log'].format(filename, e))
            if moved_file: last_activity_time = time.time()
            if self.shutdown_var.get() and (time.time() - last_activity_time > SHUTDOWN_TIMEOUT):
                self.log_to_gui(STRINGS['inactivity_log'].format(int(SHUTDOWN_TIMEOUT/60))); self.initiate_shutdown(); return
            time.sleep(5)
        self.log_to_gui(STRINGS['loop_ended_log'])
    
    def initiate_shutdown(self):
        for i in range(10, 0, -1):
            if self.stop_event.is_set(): return
            cancel = messagebox.askyesno(STRINGS['shutdown_messagebox_title'], STRINGS['shutdown_messagebox_text'].format(i), default='no')
            if cancel:
                self.log_to_gui(STRINGS['shutdown_cancelled_log']); self.stop_monitoring(); return
            time.sleep(1)
        if not self.stop_event.is_set():
            self.log_to_gui(STRINGS['shutdown_initiated_log']); os.system("shutdown /s /t 1")

if __name__ == "__main__":
    root = ttk.Window(themename="darkly")
    app = DownloadMonitorGUI(root)
    root.mainloop()