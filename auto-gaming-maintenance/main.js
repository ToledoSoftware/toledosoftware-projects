import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event"; 

// 1. Dicionário de Traduções
const translations = {
  pt: {
    windowTitle: "Auto Gaming Maintenance", appTitle: "Auto Gaming Maintenance",
    appSubtitle: "Otimize seu sistema para a melhor performance em jogos.",
    btnFocus: "Ativar Modo Foco", descFocus: "Fecha apps em segundo plano para liberar RAM.",
    btnCache: "Limpar Cache", descCache: "Remove arquivos temporários e de prefetch do Windows para agilizar o sistema.",
    btnPerformance: "Alto Desempenho", descPerformance: "Altera o plano de energia do Windows para performance máxima.",
    btnRestore: "Restaurar Padrões", descRestore: "Retorna o plano de energia para o modo que estava ativo antes da otimização.",
    btnNetwork: "Otimizar Rede", descNetwork: "Aplica ajustes no sistema para reduzir a latência (ping) em jogos online.",
    logStartingFocus: "Modo Foco: Encerrando aplicativos de fundo para liberar recursos...",
    logStartingCache: "Limpeza: Removendo arquivos temporários e de prefetch do sistema...",
    logStartingPerformance: "Energia: Ativando plano de Alto Desempenho para performance máxima...",
    logStartingRestore: "Energia: Restaurando plano de energia anterior...",
    logStartingNetwork: "Rede: Otimizando configurações de TCP e limpando cache DNS...",
    logError: "ERRO:",
    promptSettings: "Personalize a lista nas configurações ⚙️",
    modalTitle: "Configurar Modo Foco", modalDesc: "Marque os aplicativos que devem ser encerrados ao ativar o Modo Foco.",
    btnSave: "Salvar", btnClose: "Fechar",
    btnFullOptimize: "Otimização Total",
    descFullOptimize: "Executa as otimizações essenciais em sequência para a melhor performance.",
    logStartingFull: "Iniciando Otimização Total...",
    logStepCache: "Etapa 1/4: Limpando caches do sistema...",
    logStepNetwork: "Etapa 2/4: Otimizando configurações de rede...",
    logStepFocus: "Etapa 3/4: Ativando Modo Foco...",
    logStepPerformance: "Etapa 4/4: Ativando plano de Alto Desempenho...",
    logFullComplete: "Otimização Total concluída com sucesso!",
  },
  en: {
    windowTitle: "Auto Gaming Maintenance", appTitle: "Auto Gaming Maintenance",
    appSubtitle: "Optimize your system for the best gaming performance.",
    btnFocus: "Enable Focus Mode", descFocus: "Closes background apps (Discord, Chrome, etc.) to free up RAM.",
    btnCache: "Clear Cache", descCache: "Removes temporary and prefetch files from Windows to speed up the system.",
    btnPerformance: "High Performance", descPerformance: "Changes the Windows power plan for maximum performance.",
    btnRestore: "Restore Defaults", descRestore: "Returns the power plan to the mode that was active before optimization.",
    btnNetwork: "Optimize Network", descNetwork: "Applies system tweaks to reduce latency (ping) in online games.",
    logStartingFocus: "Focus Mode: Closing background apps to free up resources...",
    logStartingCache: "Cleanup: Removing temporary and prefetch system files...",
    logStartingPerformance: "Power: Enabling High Performance plan for maximum performance...",
    logStartingRestore: "Power: Restoring previous power plan...",
    logStartingNetwork: "Network: Optimizing TCP settings and flushing DNS cache...",
    logError: "ERROR:",
    promptSettings: "Customize the list in settings ⚙️",
    modalTitle: "Configure Focus Mode", modalDesc: "Check the applications to be closed when Focus Mode is activated.",
    btnSave: "Save", btnClose: "Close",
    btnFullOptimize: "Full Optimization",
    descFullOptimize: "Runs all essential optimizations in sequence for the best performance.",
    logStartingFull: "Starting Full Optimization...",
    logStepCache: "Step 1/4: Clearing system caches...",
    logStepNetwork: "Step 2/4: Optimizing network settings...",
    logStepFocus: "Step 3/4: Activating Focus Mode...",
    logStepPerformance: "Step 4/4: Activating High Performance plan...",
    logFullComplete: "Full Optimization completed successfully!",
  }
};


// 2. Elementos da UI
const allActionButtons = document.querySelectorAll(".button-grid button, #btn-full-optimize");
const settingsBtn = document.querySelector("#settings-btn");
const langToggleButton = document.querySelector("#lang-toggle");
const logContent = document.querySelector("#log-content");
const progressContainer = document.querySelector("#progress-container");
const progressBar = document.querySelector("#progress-bar");
const progressStepText = document.querySelector("#progress-step-text");
const themeToggleButton = document.querySelector("#theme-toggle-btn");
const processFilter = document.querySelector("#process-filter"); 
const startupFilter = document.querySelector("#startup-filter"); 

// Elementos do Modal
const modalTabs = document.querySelectorAll(".modal-tab");
const modalContents = document.querySelectorAll(".modal-content-tab");
const startupListDiv = document.querySelector("#startup-list");
const modalCloseBtn = document.querySelector("#modal-close");
const modalSaveBtn = document.querySelector("#modal-save");
const processListDiv = document.querySelector("#process-list");
const settingsModal = document.querySelector("#settings-modal");

// Variáveis do Gráfico
let cpuChart, ramChart;
const MAX_DATA_POINTS = 30; // 60 segundos de histórico (2s por ponto)

let currentLanguage = 'pt';

// 3. Lógica de Log
function logMessage(message, type = 'info') {
  const logEntry = document.createElement('span');
  logEntry.className = `log-entry ${type}`;
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}\n`;
  logContent.appendChild(logEntry);
  logContent.parentElement.scrollTop = logContent.parentElement.scrollHeight;
}

// 4. Lógica de Internacionalização
function updateTexts() {
  const langPack = translations[currentLanguage];
  document.title = langPack.windowTitle;
  langToggleButton.textContent = currentLanguage === 'pt' ? 'EN' : 'PT';
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    if (key === 'btnFullOptimize') {
      element.lastChild.textContent = langPack[key];
    } else if (langPack[key]) { 
      element.textContent = langPack[key]; 
    }
  });
}
langToggleButton.addEventListener("click", () => {
  currentLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
  updateTexts();
});

// 5. Funções de Controle da Barra de Progresso
function startProgress(stepText = "") {
  allActionButtons.forEach(btn => btn.disabled = true);
  langToggleButton.disabled = true;
  settingsBtn.disabled = true;
  themeToggleButton.disabled = true; 
  progressBar.style.width = '0%';
  progressStepText.textContent = stepText;
  progressContainer.style.display = 'block';
  void progressContainer.offsetWidth;
  progressContainer.style.opacity = '1';
}

function completeProgress() {
  setTimeout(() => {
    progressContainer.style.opacity = '0';
    setTimeout(() => {
      progressContainer.style.display = 'none';
      progressStepText.textContent = "";
      allActionButtons.forEach(btn => btn.disabled = false);
      langToggleButton.disabled = false;
      settingsBtn.disabled = false;
      themeToggleButton.disabled = false; 
    }, 500);
  }, 1000);
}

function updateProgress(percentage, stepText = "") {
  progressBar.style.width = `${percentage}%`;
  progressStepText.textContent = stepText;
}

// Função auxiliar para simular progresso contínuo
function smoothProgress(startPercent, endPercent, durationMs) {
    const stepTime = 50; 
    const totalSteps = durationMs / stepTime;
    const progressPerStep = (endPercent - startPercent) / totalSteps;
    let currentPercent = startPercent;

    return new Promise(resolve => {
        const interval = setInterval(() => {
            currentPercent += progressPerStep;
            if (currentPercent >= endPercent) {
                clearInterval(interval);
                updateProgress(endPercent);
                resolve();
            } else {
                updateProgress(Math.round(currentPercent));
            }
        }, stepTime);
    });
}

// 6. Conexão dos Botões com o Backend
async function handleInvoke(command, startLogKey) {
  startProgress();
  logMessage(translations[currentLanguage][startLogKey]);
  try {
    const response = await invoke(command);
    logMessage(response, 'success');
  } catch (error) {
    logMessage(`${translations[currentLanguage]['logError']} ${error}`, 'error');
  } finally {
    updateProgress(100);
    completeProgress();
  }
}

// 7. Função de Otimização Total (ATUALIZADA)
async function runFullOptimization() {
  startProgress(translations[currentLanguage].logStartingFull);
  logMessage(translations[currentLanguage].logStartingFull);
  
  let currentStepProgress = 0; 
  const stepIncrement = 25;    

  // Desabilita o botão Total no início da função
  document.querySelector("#btn-full-optimize").disabled = true; 

  try {
    // Etapa 1: Limpeza de Cache (0% -> 25%)
    currentStepProgress = 0;
    logMessage(translations[currentLanguage].logStepCache);
    updateProgress(currentStepProgress, translations[currentLanguage].logStepCache);

    const progressPromise1 = smoothProgress(currentStepProgress, currentStepProgress + 10, 1500);
    let response = await invoke("clear_system_cache");
    await progressPromise1; 
    logMessage(response, 'success');
    
    currentStepProgress += stepIncrement;
    await smoothProgress(currentStepProgress - 5, currentStepProgress, 500);

    // Etapa 2: Otimizar Rede (25% -> 50%)
    logMessage(translations[currentLanguage].logStepNetwork);
    updateProgress(currentStepProgress, translations[currentLanguage].logStepNetwork);
    
    const progressPromise2 = smoothProgress(currentStepProgress, currentStepProgress + 10, 1500);
    response = await invoke("optimize_network");
    await progressPromise2; 
    logMessage(response, 'success');

    currentStepProgress += stepIncrement;
    await smoothProgress(currentStepProgress - 5, currentStepProgress, 500);

    // Etapa 3: Modo Foco (50% -> 75%)
    logMessage(translations[currentLanguage].logStepFocus);
    updateProgress(currentStepProgress, translations[currentLanguage].logStepFocus);
    
    const progressPromise3 = smoothProgress(currentStepProgress, currentStepProgress + 10, 1500);
    response = await invoke("enter_focus_mode");
    await progressPromise3; 
    logMessage(response, 'success');
    
    currentStepProgress += stepIncrement;
    await smoothProgress(currentStepProgress - 5, currentStepProgress, 500);

    // Etapa 4: Alto Desempenho (75% -> 100%)
    logMessage(translations[currentLanguage].logStepPerformance);
    updateProgress(currentStepProgress, translations[currentLanguage].logStepPerformance);
    
    const progressPromise4 = smoothProgress(currentStepProgress, currentStepProgress + 10, 1500);
    response = await invoke("set_high_performance_plan");
    await progressPromise4; 
    logMessage(response, 'success');

    currentStepProgress += stepIncrement;
    updateProgress(100, translations[currentLanguage].logFullComplete);
    logMessage(translations[currentLanguage].logFullComplete, 'success');

  } catch (error) {
    // Ação de ERRO: Define o progresso para zero antes de limpar.
    updateProgress(0, "Otimização falhou. Verifique o log.");
    logMessage(`${translations[currentLanguage]['logError']} ${error}`, 'error');
  } finally {
    // Reabilita o botão Total no final
    document.querySelector("#btn-full-optimize").disabled = false; 
    completeProgress();
  }
}

// 8. Associa os eventos aos botões
document.querySelector("#btn-full-optimize").addEventListener("click", runFullOptimization);
document.querySelector("#btn-focus-mode").addEventListener("click", () => handleInvoke("enter_focus_mode", "logStartingFocus"));
document.querySelector("#btn-clean-cache").addEventListener("click", () => handleInvoke("clear_system_cache", "logStartingCache"));
document.querySelector("#btn-optimize-network").addEventListener("click", () => handleInvoke("optimize_network", "logStartingNetwork"));
document.querySelector("#btn-high-performance").addEventListener("click", () => handleInvoke("set_high_performance_plan", "logStartingPerformance"));
document.querySelector("#btn-restore").addEventListener("click", () => handleInvoke("restore_default_plan", "logStartingRestore"));

// --- 9. Lógica do Modal de Configurações ---

// Função de troca de abas
function switchTab(tabId) {
    modalTabs.forEach(tab => {
        tab.classList.toggle('active', tab.id === tabId);
    });
    modalContents.forEach(content => {
        content.classList.toggle('active', content.id === `content-${tabId.replace('tab-', '')}`);
    });

    if (tabId === 'tab-startup') {
        populateStartupList();
    }
}

modalTabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.id));
});

settingsBtn.addEventListener("click", async () => {
  settingsModal.style.display = "flex";
  void settingsModal.offsetWidth; 
  settingsModal.style.opacity = '1';
  settingsModal.querySelector('.modal-content').style.transform = 'scale(1)';

  // Carrega lista de foco por padrão e anexa listeners
  populateProcessList();
  processFilter.addEventListener('input', filterProcessList);
  
  // Limpa e anexa listener para Inicialização
  startupFilter.value = '';
  startupListDiv.innerHTML = `<p>Carregando programas de inicialização...</p>`;
  startupFilter.addEventListener('input', filterStartupList);
  
  // Garante que a aba Modo Foco esteja ativa ao abrir o modal
  switchTab('tab-focus-mode');
});

function closeModal() {
  settingsModal.style.opacity = '0';
  settingsModal.querySelector('.modal-content').style.transform = 'scale(0.95)';
  setTimeout(() => { settingsModal.style.display = "none"; }, 300);
  
  processFilter.removeEventListener('input', filterProcessList);
  startupFilter.removeEventListener('input', filterStartupList);
}
modalCloseBtn.addEventListener("click", closeModal);
settingsModal.addEventListener("click", (event) => { if (event.target === settingsModal) { closeModal(); } });

async function populateProcessList() {
  processListDiv.innerHTML = `<p>${translations[currentLanguage].modalDesc.includes('Marque') ? 'Carregando processos...' : 'Loading processes...'}</p>`;
  try {
    const runningProcesses = await invoke("get_running_processes");
    const savedConfig = await invoke("load_focus_mode_config");
    let html = "";
    for (const processName of runningProcesses) {
      const isChecked = savedConfig.includes(processName) ? "checked" : "";
      html += `
        <div class="process-item" data-name="${processName.toLowerCase()}">
          <input type="checkbox" id="proc-${processName.replace(/\s/g, '-')}" value="${processName}" ${isChecked}>
          <label for="proc-${processName.replace(/\s/g, '-')}">${processName}</label>
        </div>
      `;
    }
    processListDiv.innerHTML = html;
    filterProcessList();
  } catch (error) {
    processListDiv.innerHTML = `<p style="color: var(--log-error);">Erro ao carregar processos: ${error}</p>`;
  }
}

// Popula e gerencia a lista de inicialização
async function populateStartupList() {
    startupListDiv.innerHTML = `<p>Carregando programas de inicialização...</p>`;
    try {
        const startupPrograms = await invoke("get_startup_programs");
        let html = "";
        
        startupPrograms.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        for (const program of startupPrograms) {
            const isChecked = program.is_enabled ? "checked" : "";
            
            html += `
                <div class="startup-item" data-name="${program.name.toLowerCase()}" data-key="${program.key_path}" data-progname="${program.name}">
                    <label class="startup-label" title="${program.value}">
                        ${program.name}
                    </label>
                    <label class="switch">
                        <input type="checkbox" class="startup-toggle" data-key="${program.key_path}" data-progname="${program.name}" ${isChecked}>
                        <span class="slider round"></span>
                    </label>
                </div>
            `;
        }
        startupListDiv.innerHTML = html;
        
        document.querySelectorAll('.startup-toggle').forEach(toggle => {
            toggle.addEventListener('change', handleStartupToggle);
        });

    } catch (error) {
        startupListDiv.innerHTML = `<p style="color: var(--log-error);">Erro ao carregar programas de inicialização: ${error}</p>`;
    }
}

// Handler para o toggle de inicialização
async function handleStartupToggle(event) {
    const toggle = event.target;
    const name = toggle.getAttribute('data-progname');
    const keyPath = toggle.getAttribute('data-key');
    const enable = toggle.checked;
    
    toggle.disabled = true;

    try {
        const response = await invoke("set_startup_program_enabled", { 
            programName: name, 
            keyPath: keyPath, 
            enable: enable 
        });
        logMessage(response, 'success');
    } catch (error) {
        logMessage(`ERRO ao alterar inicialização de ${name}: ${error}`, 'error');
        toggle.checked = !enable; 
    } finally {
        toggle.disabled = false;
        populateStartupList();
    }
}

// Filtro Modo Foco
function filterProcessList() {
    const filterText = processFilter.value.toLowerCase();
    const items = document.querySelectorAll('#process-list .process-item');
    items.forEach(item => {
        const processName = item.getAttribute('data-name');
        item.style.display = processName.includes(filterText) ? 'flex' : 'none';
    });
}

// Filtro Inicialização
function filterStartupList() {
    const filterText = startupFilter.value.toLowerCase();
    const items = document.querySelectorAll('#startup-list .startup-item');
    items.forEach(item => {
        const programName = item.getAttribute('data-name');
        item.style.display = programName.includes(filterText) ? 'flex' : 'none';
    });
}

modalSaveBtn.addEventListener("click", async () => {
  const activeTab = document.querySelector('.modal-tab.active').id;

  if (activeTab === 'tab-focus-mode') {
    const selectedProcesses = [];
    const checkboxes = processListDiv.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(cb => { selectedProcesses.push(cb.value); });
    try {
      await invoke("save_focus_mode_config", { processes: selectedProcesses });
      logMessage("Configuração do Modo Foco salva com sucesso!", "success");
    } catch (error) {
      logMessage(`Erro ao salvar configuração: ${error}`, "error");
    }
  } else if (activeTab === 'tab-startup') {
      logMessage("As alterações de inicialização são salvas em tempo real.", 'info');
  }
  closeModal();
});

// 10. Lógica do Dashboard
const cpuUsageEl = document.querySelector("#cpu-usage");
const ramUsageEl = document.querySelector("#ram-usage");

// Função de inicialização dos gráficos
function initializeCharts() {
    const commonChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        scales: {
            y: { min: 0, max: 100, display: false }, 
            x: { display: false }
        },
        elements: { point: { radius: 0 } }
    };

    // Gráfico de CPU
    cpuChart = new Chart(document.getElementById('cpu-chart'), {
        type: 'line',
        data: {
            labels: Array(MAX_DATA_POINTS).fill(''),
            datasets: [{
                label: 'CPU Usage',
                data: Array(MAX_DATA_POINTS).fill(0),
                borderColor: 'var(--primary-color)',
                backgroundColor: 'rgba(167, 139, 250, 0.1)',
                fill: true,
                tension: 0.4 
            }]
        },
        options: commonChartOptions
    });

    // Gráfico de RAM
    ramChart = new Chart(document.getElementById('ram-chart'), {
        type: 'line',
        data: {
            labels: Array(MAX_DATA_POINTS).fill(''),
            datasets: [{
                label: 'RAM Usage',
                data: Array(MAX_DATA_POINTS).fill(0),
                borderColor: '#22D3EE', 
                backgroundColor: 'rgba(34, 211, 238, 0.1)',
                fill: true,
                tension: 0.4 
            }]
        },
        options: commonChartOptions
    });
}

// Função para atualizar a UI e os gráficos com os dados recebidos
function updateDashboardUI(stats) {
    // 1. Atualiza os números
    cpuUsageEl.textContent = `${Math.round(stats.cpu_usage)} %`;
    const ramUsed = stats.ram_usage_gb.toFixed(1);
    const ramTotal = stats.total_ram_gb.toFixed(1);
    ramUsageEl.textContent = `${ramUsed} / ${ramTotal} GB`;

    // 2. Atualiza os gráficos
    const currentCpu = Math.round(stats.cpu_usage);
    const currentRamPercent = (stats.ram_usage_gb / stats.total_ram_gb) * 100;

    // Remove o ponto mais antigo e adiciona o novo
    cpuChart.data.datasets[0].data.shift();
    ramChart.data.datasets[0].data.shift();
    
    cpuChart.data.datasets[0].data.push(currentCpu);
    ramChart.data.datasets[0].data.push(currentRamPercent);

    // Atualiza os gráficos
    cpuChart.update();
    ramChart.update();
}


// 11. Lógica de Tema
const bodyEl = document.body;
const iconSun = document.querySelector("#icon-sun");
const iconMoon = document.querySelector("#icon-moon");

function applyTheme(theme) {
  if (theme === 'light') {
    bodyEl.classList.add('light-theme');
  } else {
    bodyEl.classList.remove('light-theme');
  }
}

themeToggleButton.addEventListener('click', () => {
  const isLight = bodyEl.classList.contains('light-theme');
  const newTheme = isLight ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

// 12. Inicialização
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  updateTexts();
  
  initializeCharts(); 
  
  listen('system-stats', (event) => {
    updateDashboardUI(event.payload);
  });
});