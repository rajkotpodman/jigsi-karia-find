// CyberDork OSINT Suite v7.0 - Core Application Architecture & Router

import { searchEngines, dorkCategories, dorksData } from './dorks.js';
import { extensionCategories } from './extensions.js';
import { sfx, runQuickOSINT } from './tools.js';
import {
    getCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    logSearchHistory,
    getSearchHistory,
    clearSearchHistory,
    exportHistoryJSON,
    exportHistoryCSV,
    safeStorage
} from './auth.js';

// Global Application State
const state = {
    activeTab: 'dashboard',
    selectedEngine: 'google',
    activeDorkCategory: 'all',
    favorites: JSON.parse(safeStorage.getItem('dorkFavorites') || '[]'),
    customDorks: JSON.parse(safeStorage.getItem('customDorks') || '[]'),
    targetInput: '9898048483',
    matrixSpeed: 35,
    matrixOpacity: 0.04
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
                registration.unregister();
            }
        }).catch(() => {});
    }
    initMatrixCanvas();
    initRouter();
    initEventListeners();
    updateUIAuthStatus();
    renderAllPages();
});

// Matrix Rain Canvas Effect
let matrixInterval = null;
function initMatrixCanvas() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    const cols = Math.floor(w / 18);
    const drops = Array(cols).fill(1);
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}[]|;:,.<>?";

    function draw() {
        ctx.fillStyle = `rgba(0,0,0,${state.matrixOpacity})`;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#00ff66';
        ctx.font = '16px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 18;
            const y = drops[i] * 18;
            ctx.fillText(text, x, y);

            if (y > h && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    if (matrixInterval) clearInterval(matrixInterval);
    matrixInterval = setInterval(draw, state.matrixSpeed);
}

// Router & Tab Switching
function initRouter() {
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sfx.playClick();
            const pageId = btn.getAttribute('data-page');
            switchTab(pageId);
        });
    });
}

export function switchTab(pageId) {
    state.activeTab = pageId;

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-page') === pageId);
    });

    document.querySelectorAll('.app-page').forEach(page => {
        page.classList.toggle('active', page.id === `page-${pageId}`);
    });

    if (pageId === 'auth') {
        renderAuthPage();
    }
}

// Event Listeners Registration
function initEventListeners() {
    // Global Target Input Listener
    const globalTarget = document.getElementById('globalTargetInput');
    if (globalTarget) {
        globalTarget.value = state.targetInput;
        globalTarget.addEventListener('input', (e) => {
            state.targetInput = e.target.value.trim();
            syncTargetInputs(state.targetInput);
        });
    }

    // Theme Toggle
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            sfx.playClick();
            document.body.classList.toggle('light-mode');
            themeBtn.textContent = document.body.classList.contains('light-mode') ? '🌙 DARK MODE' : '☀ LIGHT MODE';
        });
    }

    // SFX Mute Toggle
    const sfxBtn = document.getElementById('sfxToggleBtn');
    if (sfxBtn) {
        sfxBtn.addEventListener('click', () => {
            const isMuted = sfx.toggleMute();
            sfxBtn.textContent = isMuted ? '🔇 SFX OFF' : '🔊 SFX ON';
        });
    }

    // Matrix Speed Control
    const matrixSlider = document.getElementById('matrixSpeedSlider');
    if (matrixSlider) {
        matrixSlider.addEventListener('input', (e) => {
            state.matrixSpeed = 100 - parseInt(e.target.value);
            initMatrixCanvas();
        });
    }
}

function syncTargetInputs(val) {
    const inputs = document.querySelectorAll('.target-sync-input');
    inputs.forEach(input => {
        input.value = val;
    });
}

// Page Renderers
function renderAllPages() {
    renderDashboard();
    renderDorkEngine();
    renderExtensionHub();
    renderOSINTToolkit();
    renderTerminal();
    renderProHub();
    renderAuthPage();
}

// Page 1: Dashboard
function renderDashboard() {
    const visitCountEl = document.getElementById('dashboardVisitCount');
    let visits = parseInt(safeStorage.getItem('visit_count') || '0') + 1;
    safeStorage.setItem('visit_count', visits.toString());
    if (visitCountEl) visitCountEl.textContent = visits;

    const totalDorksEl = document.getElementById('statTotalDorks');
    if (totalDorksEl) totalDorksEl.textContent = dorksData.length + state.customDorks.length;

    // Attach OSINT Quick Search Buttons
    const radarContainer = document.getElementById('radarQuickGrid');
    if (radarContainer) {
        radarContainer.innerHTML = `
            <button class="ext-btn" onclick="runOSINT('google_phone')">📞 Google Phone Lookup</button>
            <button class="ext-btn" onclick="runOSINT('truecaller')">👤 Truecaller Search</button>
            <button class="ext-btn" onclick="runOSINT('virustotal')">🛡️ VirusTotal Intelligence</button>
            <button class="ext-btn" onclick="runOSINT('shodan')">🌐 Shodan IoT Lookup</button>
            <button class="ext-btn" onclick="runOSINT('securitytrails')">📡 SecurityTrails DNS</button>
            <button class="ext-btn" onclick="runOSINT('censys')">🔍 Censys Host Scan</button>
            <button class="ext-btn" onclick="runOSINT('wayback')">📜 Wayback Machine Archive</button>
            <button class="ext-btn" onclick="runOSINT('pastebin')">📋 Pastebin Leak Lookup</button>
        `;
    }
}

window.runOSINT = function(service) {
    const target = state.targetInput || '9898048483';
    logSearchHistory(target, service);
    runQuickOSINT(target, service);
};

// Page 2: CyberDork Engine
function renderDorkEngine() {
    renderDorkCategories();
    renderDorkGrid();
}

function renderDorkCategories() {
    const container = document.getElementById('dorkCategoryTabs');
    if (!container) return;

    container.innerHTML = dorkCategories.map(cat => `
        <button class="nav-tab-btn ${cat.id === state.activeDorkCategory ? 'active' : ''}" onclick="selectDorkCategory('${cat.id}')">
            ${cat.icon} ${cat.name}
        </button>
    `).join('');
}

window.selectDorkCategory = function(catId) {
    sfx.playClick();
    state.activeDorkCategory = catId;
    renderDorkCategories();
    renderDorkGrid();
};

function renderDorkGrid() {
    const grid = document.getElementById('dorksGridContainer');
    if (!grid) return;

    const filterQuery = (document.getElementById('dorkSearchQuery')?.value || '').toLowerCase().trim();
    let allItems = [...dorksData, ...state.customDorks];

    let filtered = allItems;

    if (state.activeDorkCategory === 'fav') {
        filtered = allItems.filter(item => state.favorites.includes(item.title));
    } else if (state.activeDorkCategory !== 'all') {
        filtered = allItems.filter(item => item.category === state.activeDorkCategory);
    }

    if (filterQuery) {
        filtered = filtered.filter(item =>
            item.title.toLowerCase().includes(filterQuery) ||
            item.dork.toLowerCase().includes(filterQuery)
        );
    }

    const statsEl = document.getElementById('dorkCounterStats');
    if (statsEl) {
        statsEl.textContent = `Showing: ${filtered.length} Dorks (Total: ${allItems.length})`;
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No dorks found for this criteria.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(item => {
        const isFav = state.favorites.includes(item.title);
        const encodedDork = encodeURIComponent(item.dork);

        return `
            <div class="dork-card">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <span class="dork-title">${item.title}</span>
                        <span onclick="toggleDorkFavorite('${item.title}')" style="cursor: pointer; font-size: 1.1rem;">${isFav ? '⭐️' : '☆'}</span>
                    </div>
                    <div class="dork-string">${item.dork}</div>
                </div>
                <div class="dork-actions">
                    <button class="btn-action-run" onclick="executeDork('${encodedDork}')">Run Search</button>
                    <button class="btn-action-multi" title="Launch Multi-Engine" onclick="executeMultiEngineDork('${encodedDork}')">🚀 Multi</button>
                </div>
            </div>
        `;
    }).join('');
}

window.executeDork = function(encodedDork) {
    sfx.playLaunch();
    const dork = decodeURIComponent(encodedDork);
    const target = state.targetInput || '9898048483';
    logSearchHistory(`${target} | ${dork}`, 'dork_search');

    const engineObj = searchEngines[state.selectedEngine] || searchEngines.google;
    const finalQuery = target ? `"${target}" ${dork}` : dork;
    window.open(engineObj.url + encodeURIComponent(finalQuery), '_blank');
};

window.executeMultiEngineDork = function(encodedDork) {
    sfx.playLaunch();
    const dork = decodeURIComponent(encodedDork);
    const target = state.targetInput || '9898048483';
    logSearchHistory(`${target} | Multi: ${dork}`, 'multi_dork');

    const finalQuery = target ? `"${target}" ${dork}` : dork;
    const q = encodeURIComponent(finalQuery);

    window.open(searchEngines.google.url + q, '_blank');
    window.open(searchEngines.bing.url + q, '_blank');
    window.open(searchEngines.duckduckgo.url + q, '_blank');
    window.open(searchEngines.yandex.url + q, '_blank');
    window.open(searchEngines.shodan.url + q, '_blank');
};

window.toggleDorkFavorite = function(title) {
    if (state.favorites.includes(title)) {
        state.favorites = state.favorites.filter(t => t !== title);
    } else {
        state.favorites.push(title);
    }
    safeStorage.setItem('dorkFavorites', JSON.stringify(state.favorites));
    renderDorkGrid();
};

// Page 3: 700+ Extension Hub
function renderExtensionHub() {
    const container = document.getElementById('extensionCategoriesContainer');
    if (!container) return;

    let count = 0;
    container.innerHTML = Object.entries(extensionCategories).map(([catTitle, extList]) => {
        count += extList.length;
        return `
            <div class="ext-category-block">
                <div class="ext-category-title">${catTitle} (${extList.length})</div>
                <div class="ext-buttons-flex">
                    ${extList.map(ext => `
                        <button class="ext-btn" data-ext="${ext}" onclick="searchExtension('${ext}')">.${ext}</button>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');

    const extCountEl = document.getElementById('statTotalExtensions');
    if (extCountEl) extCountEl.textContent = count + '+';
}

window.searchExtension = function(ext) {
    sfx.playLaunch();
    const target = state.targetInput || '9898048483';
    logSearchHistory(`${target} ext:${ext}`, 'ext_search');

    const query = `"${target}" filetype:${ext}`;
    window.open(searchEngines.google.url + encodeURIComponent(query), '_blank');
};

window.filterExtensionsGrid = function() {
    const input = (document.getElementById('extFilterInput')?.value || '').toLowerCase().trim();
    const btns = document.querySelectorAll('.ext-btn');
    btns.forEach(btn => {
        const ext = btn.getAttribute('data-ext') || '';
        btn.style.display = ext.toLowerCase().includes(input) ? 'inline-block' : 'none';
    });
};

// Page 4: Advanced OSINT Toolkit & Builder
function renderOSINTToolkit() {
    const buildBtn = document.getElementById('btnAssembleDork');
    if (buildBtn) {
        buildBtn.onclick = assembleCustomDork;
    }

    const hashBtn = document.getElementById('btnIdentifyHash');
    if (hashBtn) {
        hashBtn.onclick = identifyHash;
    }
}

function assembleCustomDork() {
    sfx.playClick();
    const site = document.getElementById('builderSite')?.value.trim();
    const filetype = document.getElementById('builderFiletype')?.value.trim();
    const inurl = document.getElementById('builderInurl')?.value.trim();
    const intitle = document.getElementById('builderIntitle')?.value.trim();
    const keyword = state.targetInput || '9898048483';

    let parts = [`"${keyword}"`];
    if (site) parts.push(`site:${site}`);
    if (filetype) parts.push(`filetype:${filetype}`);
    if (inurl) parts.push(`inurl:${inurl}`);
    if (intitle) parts.push(`intitle:"${intitle}"`);

    const assembled = parts.join(' ');
    const previewEl = document.getElementById('builderDorkPreview');
    if (previewEl) previewEl.value = assembled;
}

window.runAssembledDork = function() {
    const assembled = document.getElementById('builderDorkPreview')?.value;
    if (!assembled) return;
    sfx.playLaunch();
    logSearchHistory(assembled, 'custom_builder');
    window.open(searchEngines.google.url + encodeURIComponent(assembled), '_blank');
};

function identifyHash() {
    const val = document.getElementById('hashInputVal')?.value.trim();
    const outputEl = document.getElementById('hashOutputResult');
    if (!val || !outputEl) return;

    let res = 'Unknown pattern';
    if (/^[a-fA-F0-9]{32}$/.test(val)) res = 'MD5 Hash Detected';
    else if (/^[a-fA-F0-9]{40}$/.test(val)) res = 'SHA-1 Hash Detected';
    else if (/^[a-fA-F0-9]{64}$/.test(val)) res = 'SHA-256 Hash Detected';
    else if (/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(val) && val.length % 4 === 0) res = 'Possible Base64 Encoding';

    outputEl.textContent = `Analysis Result: ${res}`;
}

// Page 5: Cyber Terminal CLI
function renderTerminal() {
    const termInput = document.getElementById('terminalCommandInput');
    if (!termInput) return;

    termInput.onkeydown = (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim();
            if (cmd) {
                executeTerminalCommand(cmd);
                termInput.value = '';
            }
        }
    };
}

function executeTerminalCommand(cmdStr) {
    appendTerminalLine(`cyberdork@osint:~$ ${cmdStr}`, 'cmd');
    const args = cmdStr.split(' ');
    const mainCmd = args[0].toLowerCase();

    switch (mainCmd) {
        case 'help':
            appendTerminalLine('Available Commands:', 'out');
            appendTerminalLine('  dork --target <val> --type <cloud|docs|security>', 'out');
            appendTerminalLine('  ext --type <pdf|apk|env> --search <keyword>', 'out');
            appendTerminalLine('  multi --query <keyword>', 'out');
            appendTerminalLine('  matrix --speed <fast|slow>', 'out');
            appendTerminalLine('  stats, clear, theme, history', 'out');
            break;
        case 'clear':
            const logs = document.getElementById('terminalLogs');
            if (logs) logs.innerHTML = '';
            break;
        case 'dork':
            appendTerminalLine(`Executing dork query for target: ${state.targetInput}...`, 'out');
            executeDork(encodeURIComponent('site:drive.google.com/file/d/'));
            break;
        case 'ext':
            appendTerminalLine(`Searching filetype extensions for ${state.targetInput}...`, 'out');
            searchExtension('pdf');
            break;
        case 'multi':
            executeMultiEngineDork(encodeURIComponent('intitle:"index.of"'));
            break;
        case 'stats':
            appendTerminalLine(`Total Dorks: ${dorksData.length} | Extensions: 700+ | Engine: Active`, 'out');
            break;
        case 'history':
            const history = getSearchHistory();
            appendTerminalLine(`Recent History (${history.length} items):`, 'out');
            history.forEach(h => appendTerminalLine(` - [${h.type}] ${h.target}`, 'out'));
            break;
        default:
            appendTerminalLine(`Command not recognized: '${mainCmd}'. Type 'help' for guidance.`, 'err');
    }
}

function appendTerminalLine(text, type) {
    const logs = document.getElementById('terminalLogs');
    if (!logs) return;
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    logs.appendChild(line);
    logs.scrollTop = logs.scrollHeight;
}

// Page 6: Pro Hub
function renderProHub() {
    // Event listeners bound via inline onclick in index.html
}

// Page 7: Auth & Session Manager
function renderAuthPage() {
    const user = getCurrentUser();
    const statusEl = document.getElementById('authStatusBanner');
    if (statusEl) {
        statusEl.textContent = user ? `Logged in as: ${user}` : 'Guest Session (Not Logged In)';
    }

    renderHistoryLogs();
}

function renderHistoryLogs() {
    const container = document.getElementById('historyLogsList');
    if (!container) return;

    const history = getSearchHistory();
    if (history.length === 0) {
        container.innerHTML = '<div style="color: var(--text-muted); padding: 15px;">No search history logged yet.</div>';
        return;
    }

    container.innerHTML = history.map(item => `
        <div style="padding: 8px 12px; border-bottom: 1px solid rgba(0,255,0,0.1); display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span><b style="color: var(--electric-blue);">[${item.type}]</b> ${item.target}</span>
            <span style="color: var(--text-muted);">${item.timestamp}</span>
        </div>
    `).join('');
}

window.handleUserLoginSubmit = function() {
    const u = document.getElementById('loginUsernameInput')?.value;
    const p = document.getElementById('loginPasswordInput')?.value;
    const res = loginUser(u, p);
    if (res.success) {
        alert('Login successful!');
        updateUIAuthStatus();
        renderAuthPage();
    } else {
        alert(res.msg);
    }
};

window.handleUserRegisterSubmit = function() {
    const u = document.getElementById('regUsernameInput')?.value;
    const p = document.getElementById('regPasswordInput')?.value;
    const res = registerUser(u, p);
    alert(res.msg);
};

window.handleUserLogout = function() {
    logoutUser();
    updateUIAuthStatus();
    renderAuthPage();
};

window.triggerClearHistory = function() {
    clearSearchHistory();
    renderHistoryLogs();
};

window.triggerExportJSON = function() {
    exportHistoryJSON();
};

window.triggerExportCSV = function() {
    exportHistoryCSV();
};

function updateUIAuthStatus() {
    const user = getCurrentUser();
    const displayEl = document.getElementById('currentUserDisplay');
    if (displayEl) {
        displayEl.textContent = user ? `[${user}]` : '[GUEST]';
    }
}
