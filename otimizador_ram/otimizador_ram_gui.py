import tkinter as tk
from tkinter import scrolledtext, messagebox
import ttkbootstrap as ttk
import psutil
import yaml
import ctypes
import os
import subprocess
from threading import Thread
import time
import shutil

# --- FUNÇÃO DE VERIFICAÇÃO DE ADMINISTRADOR ---
def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

# --- GERENCIAMENTO DE IDIOMAS ---
LANGUAGES = {
    'en': {
        'window_title': "RAM Optimizer & Power Modes v5.2 (Final)",
        'ram_before_label': "RAM Used (Before): {:.2f} GB",
        'ram_after_label': "RAM Used (After): {:.2f} GB",
        'ram_freed_label': "Freed: {:.0f} MB ✅",
        'ram_used_label': "Used: {:.0f} MB 🔄",
        'ram_current_label': "Current RAM Used: {:.2f} GB",
        'turbo_button': "🚀 Turbo Mode",
        'balanced_button': "⚖️ Balanced Mode",
        'restore_button': "🔄 Restore Processes",
        'log_label': "Action Log:",
        'language_label': "Language:",
        'task_running': "Working...",
        'task_finished': "Operation complete!",
        'log_turbo': "--- Activating Turbo Mode ---",
        'log_ram_scan': "Scanning for top RAM consumers...",
        'log_ram_top5': "Top 5 RAM consumers found:",
        'log_balanced': "--- Activating Balanced Mode ---",
        'log_restore': "--- Restoring Processes ---",
        'log_closing': "Looking for processes to close based on config...",
        'log_process_closed': "  - Process closed: {}",
        'log_process_fail': "  - Failed to close {}: {}",
        'log_timeout_process': "Warning: Process scan timed out after {} seconds.",
        'log_config_error': "ERROR reading config: {}",
        'log_power_plan': "Changing power plan to {}...",
        'log_power_plan_success': "✔ Power plan changed to {}.",
        'log_power_plan_fail': "ERROR finding power plan: {}",
        'log_dns': "Clearing DNS cache...",
        'log_dns_success': "✔ DNS cache cleared.",
        'log_reopening': "Attempting to reopen processes...",
        'log_process_started': "  - Started: {}",
        'log_process_not_found': "  - Warning: Could not find '{}'. Check if it's in PATH.",
        'log_process_start_fail': "  - ERROR starting '{}': {}",
        'admin_error_title': "Permission Error",
        'admin_error_message': "This program must be run as Administrator to function correctly.\n\nPlease right-click the .exe file and select 'Run as administrator'."
    },
    'pt': {
        'window_title': "Otimizador de RAM e Modos de Energia v5.2 (Final)",
        'ram_before_label': "RAM Usada (Antes): {:.2f} GB",
        'ram_after_label': "RAM Usada (Depois): {:.2f} GB",
        'ram_freed_label': "Liberado: {:.0f} MB ✅",
        'ram_used_label': "Gasto: {:.0f} MB 🔄",
        'ram_current_label': "RAM Usada Atual: {:.2f} GB",
        'turbo_button': "🚀 Modo Turbo",
        'balanced_button': "⚖️ Modo Equilibrado",
        'restore_button': "🔄 Restaurar Processos",
        'log_label': "Log de Ações:",
        'language_label': "Idioma:",
        'task_running': "Otimizando...",
        'task_finished': "Operação concluída!",
        'log_turbo': "--- Ativando Modo Turbo ---",
        'log_ram_scan': "Verificando os maiores consumidores de RAM...",
        'log_ram_top5': "Top 5 consumidores de RAM encontrados:",
        'log_balanced': "--- Ativando Modo Equilibrado ---",
        'log_restore': "--- Restaurando Processos ---",
        'log_closing': "Procurando processos para fechar (com base na config)...",
        'log_process_closed': "  - Processo fechado: {}",
        'log_process_fail': "  - Falha ao fechar {}: {}",
        'log_timeout_process': "Aviso: A varredura de processos excedeu o tempo limite de {} segundos.",
        'log_config_error': "ERRO ao ler config: {}",
        'log_power_plan': "Mudando plano de energia para {}...",
        'log_power_plan_success': "✔ Plano de energia alterado para {}.",
        'log_power_plan_fail': "ERRO ao encontrar plano de energia: {}",
        'log_dns': "Limpando cache de DNS...",
        'log_dns_success': "✔ Cache de DNS limpo.",
        'log_reopening': "Tentando reabrir processos...",
        'log_process_started': "  - Iniciado: {}",
        'log_process_not_found': "  - Aviso: Não foi possível encontrar '{}'. Verifique se está no PATH.",
        'log_process_start_fail': "  - ERRO ao iniciar '{}': {}",
        'admin_error_title': "Erro de Permissão",
        'admin_error_message': "Este programa precisa ser executado como Administrador para funcionar corretamente.\n\nPor favor, clique com o botão direito no arquivo .exe e selecione 'Executar como administrador'."
    }
}
STRINGS = LANGUAGES['pt']

class RamOptimizerApp:
    def __init__(self, root):
        self.root = root
        self.root.geometry("550x450")
        self.GUID_HIGH_PERFORMANCE = "8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c"
        self.GUID_BALANCED = "381b4222-f694-41f0-9685-ff5bb260df2e"
        self.ram_before_var = tk.StringVar()
        self.ram_after_var = tk.StringVar()
        self.ram_freed_var = tk.StringVar()
        self.language_var = tk.StringVar(value='Português')
        self.create_widgets()
        self.update_ram_info()

    def create_widgets(self):
        info_frame = ttk.Frame(self.root, padding=10)
        info_frame.pack(fill='x', padx=10, pady=10)
        info_font = ("Consolas", 12, "bold")
        ttk.Label(info_frame, textvariable=self.ram_before_var, font=info_font).pack(side='left', expand=True, anchor='center')
        ttk.Label(info_frame, textvariable=self.ram_after_var, font=info_font).pack(side='left', expand=True, anchor='center')
        self.ram_freed_label = ttk.Label(info_frame, textvariable=self.ram_freed_var, font=info_font)
        self.ram_freed_label.pack(side='left', expand=True, anchor='center')

        action_frame = ttk.Frame(self.root, padding=10)
        action_frame.pack(fill='x', padx=10, pady=5)
        self.turbo_button = ttk.Button(action_frame, command=lambda: self.start_task(self.activate_turbo_mode), bootstyle="primary")
        self.turbo_button.pack(fill='x', pady=4)
        self.balanced_button = ttk.Button(action_frame, command=lambda: self.start_task(self.activate_balanced_mode), bootstyle="info")
        self.balanced_button.pack(fill='x', pady=4)
        self.restore_button = ttk.Button(action_frame, command=lambda: self.start_task(self.restore_processes), bootstyle="danger")
        self.restore_button.pack(fill='x', pady=4)

        lang_frame = ttk.Frame(self.root, padding=(15, 0))
        lang_frame.pack(fill='x', pady=5)
        self.language_label = ttk.Label(lang_frame)
        self.language_label.pack(side='left')
        self.language_selector = ttk.Combobox(lang_frame, textvariable=self.language_var, values=['Português', 'English'], state="readonly", width=10)
        self.language_selector.pack(side='left', padx=5)
        self.language_selector.bind('<<ComboboxSelected>>', self.change_language)

        self.log_label = ttk.Label(self.root, padding=(15, 5, 0, 0))
        self.log_label.pack(fill='x')
        self.log_box = scrolledtext.ScrolledText(self.root, height=10, bg="#1a1a1a", fg="#D3D3D3", state='disabled', relief="solid", bd=1)
        self.log_box.pack(padx=15, pady=(0, 15), fill='both', expand=True)
        self.log_box.tag_config('SUCCESS', foreground='#00FF00'); self.log_box.tag_config('WARNING', foreground='#FFFF00'); self.log_box.tag_config('ERROR', foreground='#FF4C4C'); self.log_box.tag_config('INFO', foreground='#FFFFFF'); self.log_box.tag_config('HEADER', foreground='#00FFFF', font=('Segoe UI', 9, 'bold'))
        self.update_ui_language()

    def update_ui_language(self):
        self.root.title(STRINGS['window_title'])
        self.update_ram_info()
        self.turbo_button.config(text=STRINGS['turbo_button'])
        self.balanced_button.config(text=STRINGS['balanced_button'])
        self.restore_button.config(text=STRINGS['restore_button'])
        self.language_label.config(text=STRINGS['language_label'])
        self.log_label.config(text=STRINGS['log_label'])
    def change_language(self, event=None):
        global STRINGS; lang_code = 'pt' if self.language_var.get() == 'Português' else 'en'; STRINGS = LANGUAGES[lang_code]; self.update_ui_language()
    def log_message(self, message, level='INFO'):
        self.root.after(0, self._log_message_safe, message, level.upper())
    def _log_message_safe(self, message, tag):
        self.log_box.config(state='normal'); self.log_box.insert(tk.END, message + '\n', tag); self.log_box.see(tk.END); self.log_box.config(state='disabled')
    def update_ram_info(self):
        ram_used_gb = psutil.virtual_memory().used / (1024**3)
        self.ram_before_var.set(STRINGS['ram_current_label'].format(ram_used_gb))
        self.ram_after_var.set(""); self.ram_freed_var.set("")
    def start_task(self, task_function):
        thread = Thread(target=self.run_task_wrapper, args=(task_function,), daemon=True); thread.start()
    def run_task_wrapper(self, task_function):
        self.root.after(0, self.toggle_buttons, 'disabled', STRINGS['task_running'])
        ram_before_gb = psutil.virtual_memory().used / (1024**3)
        self.root.after(0, lambda: self.ram_before_var.set(STRINGS['ram_before_label'].format(ram_before_gb)))
        self.root.after(0, lambda: self.ram_after_var.set(STRINGS['task_running']))
        self.root.after(0, lambda: self.ram_freed_var.set(""))
        task_function()
        time.sleep(1)
        ram_after_gb = psutil.virtual_memory().used / (1024**3)
        ram_freed_mb = (ram_before_gb - ram_after_gb) * 1024
        self.root.after(0, lambda: self.ram_after_var.set(STRINGS['ram_after_label'].format(ram_after_gb)))
        if ram_freed_mb >= 0:
            self.root.after(0, lambda: self.ram_freed_var.set(STRINGS['ram_freed_label'].format(ram_freed_mb)))
            self.root.after(0, lambda: self.ram_freed_label.config(bootstyle="success"))
        else:
            self.root.after(0, lambda: self.ram_freed_var.set(STRINGS['ram_used_label'].format(abs(ram_freed_mb))))
            self.root.after(0, lambda: self.ram_freed_label.config(bootstyle="danger"))
        self.root.after(0, self.log_message, f"--- {STRINGS['task_finished']} ---", 'HEADER')
        self.root.after(0, self.toggle_buttons, 'normal')
    def toggle_buttons(self, state, text=None):
        self.turbo_button.config(state=state); self.balanced_button.config(state=state); self.restore_button.config(state=state)
        if text:
            self.turbo_button.config(text=text); self.balanced_button.config(text=text); self.restore_button.config(text=text)
        else:
            self.update_ui_language()

    def set_power_plan(self, guid, plan_name_key):
        plan_name = STRINGS.get(plan_name_key, plan_name_key)
        self.log_message(STRINGS['log_power_plan'].format(plan_name), 'INFO')
        try:
            subprocess.run(["powercfg", "-setactive", guid], check=True, creationflags=subprocess.CREATE_NO_WINDOW)
            self.log_message(STRINGS['log_power_plan_success'].format(plan_name), 'SUCCESS')
        except Exception as e:
            self.log_message(STRINGS['log_power_plan_fail'].format(e), 'ERROR')
            
    def activate_turbo_mode(self):
        self.log_message(STRINGS['log_turbo'], 'HEADER')
        self.log_message(STRINGS['log_ram_scan'], 'INFO')
        processes_with_mem = []
        for proc in psutil.process_iter(['name', 'memory_info']):
            try:
                mem_in_mb = proc.info['memory_info'].rss / (1024 * 1024)
                if mem_in_mb > 1: processes_with_mem.append((proc.info['name'], mem_in_mb))
            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess): pass
        sorted_processes = sorted(processes_with_mem, key=lambda item: item[1], reverse=True)
        self.log_message(STRINGS['log_ram_top5'], 'INFO')
        for name, mem in sorted_processes[:5]: self.log_message(f"  - {name} ({mem:.0f} MB)", 'INFO')
        try:
            with open('config_processos.yaml', 'r') as file:
                config = yaml.safe_load(file)
                processos_a_fechar = config.get('processos_a_fechar', [])
            self.log_message(STRINGS['log_closing'], 'INFO')
            start_time = time.time(); TIMEOUT_SECONDS = 15; processos_set = {p.lower() for p in processos_a_fechar}
            for proc in psutil.process_iter(['pid', 'name']):
                if time.time() - start_time > TIMEOUT_SECONDS:
                    self.log_message(STRINGS['log_timeout_process'].format(TIMEOUT_SECONDS), 'WARNING'); break
                if proc.info['name'].lower() in processos_set:
                    try:
                        p = psutil.Process(proc.info['pid']); p.kill(); self.log_message(STRINGS['log_process_closed'].format(proc.info['name']), 'SUCCESS')
                    except (psutil.NoSuchProcess, psutil.AccessDenied) as e:
                        self.log_message(STRINGS['log_process_fail'].format(proc.info['name'], e), 'WARNING')
        except Exception as e:
            self.log_message(STRINGS['log_config_error'].format(e), 'ERROR')
        self.set_power_plan(self.GUID_HIGH_PERFORMANCE, "turbo_button")
        self.log_message(STRINGS['log_dns'], 'INFO'); subprocess.run(["ipconfig", "/flushdns"], creationflags=subprocess.CREATE_NO_WINDOW); self.log_message(STRINGS['log_dns_success'], 'SUCCESS')

    def activate_balanced_mode(self):
        self.log_message(STRINGS['log_balanced'], 'HEADER'); self.set_power_plan(self.GUID_BALANCED, "balanced_button")

    def restore_processes(self):
        self.log_message(STRINGS['log_restore'], 'HEADER')
        try:
            with open('config_processos.yaml', 'r') as file:
                config = yaml.safe_load(file)
                processos_a_restaurar = config.get('processos_a_restaurar', [])
            self.log_message(STRINGS['log_reopening'], 'INFO')
            for process_name in processos_a_restaurar:
                if shutil.which(process_name):
                    try:
                        subprocess.Popen(process_name)
                        self.log_message(STRINGS['log_process_started'].format(process_name), 'SUCCESS')
                    except Exception as e:
                        self.log_message(STRINGS['log_process_start_fail'].format(process_name, e), 'ERROR')
                else:
                    self.log_message(STRINGS['log_process_not_found'].format(process_name), 'WARNING')
        except Exception as e:
            self.log_message(STRINGS['log_config_error'].format(e), 'ERROR')

if __name__ == "__main__":
    if not is_admin():
        messagebox.showerror(LANGUAGES['pt']['admin_error_title'], LANGUAGES['pt']['admin_error_message'])
    else:
        root = ttk.Window(themename="cyborg")
        app = RamOptimizerApp(root)
        root.mainloop()