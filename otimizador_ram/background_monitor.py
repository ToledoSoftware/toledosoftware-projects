import time
import psutil
import yaml
import os
import subprocess
from plyer import notification

# --- CONFIGURAÇÕES ---
CONFIG_FILE = 'config_processos.yaml'
# Caminho para o executável principal. Assumimos que está na mesma pasta.
MAIN_APP_PATH = os.path.join(os.path.dirname(__file__), 'otimizador_ram_gui.exe')
CHECK_INTERVAL_SECONDS = 15 # Verifica os processos a cada 15 segundos

# --- LÓGICA DO MONITOR ---

def get_target_processes():
    """Lê a lista de processos a serem monitorados do arquivo YAML."""
    try:
        with open(CONFIG_FILE, 'r') as f:
            config = yaml.safe_load(f)
            # Converte para um set de minúsculas para checagem rápida
            return {p.lower() for p in config.get('processos_para_monitorar', [])}
    except FileNotFoundError:
        # Se o arquivo não existe, não há o que monitorar.
        return set()

def show_notification():
    """Exibe a notificação nativa do Windows."""
    try:
        notification.notify(
            title="Otimizador de RAM Detectou um Jogo!",
            message="Detectamos que um jogo foi iniciado. Clique aqui para abrir o otimizador e liberar memória RAM.",
            app_name="Otimizador de RAM",
            timeout=10, # A notificação some após 10 segundos
            # Ação ao clicar: abre o programa principal
            on_click=lambda: subprocess.Popen(MAIN_APP_PATH)
        )
    except Exception:
        # Se plyer falhar, simplesmente ignora.
        pass

def monitor_processes():
    """Loop principal que monitora os processos do sistema."""
    target_processes = get_target_processes()
    if not target_processes:
        # Se não há processos para monitorar na config, o script não faz nada.
        return

    detected_game_processes = set()

    while True:
        current_running_processes = {p.info['name'].lower() for p in psutil.process_iter(['name'])}
        
        # Verifica se um novo processo de jogo foi iniciado
        for process_name in target_processes:
            if process_name in current_running_processes and process_name not in detected_game_processes:
                print(f"Detectado: {process_name}. Mostrando notificação.")
                show_notification()
                detected_game_processes.add(process_name)
        
        # Limpa a lista de detectados se o jogo for fechado
        processes_to_remove = []
        for detected_proc in detected_game_processes:
            if detected_proc not in current_running_processes:
                print(f"{detected_proc} foi fechado. Removendo da lista de detectados.")
                processes_to_remove.append(detected_proc)
        
        for proc in processes_to_remove:
            detected_game_processes.remove(proc)

        time.sleep(CHECK_INTERVAL_SECONDS)

if __name__ == "__main__":
    monitor_processes()