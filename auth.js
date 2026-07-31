// CyberDork OSINT Suite v7.0 - Authentication & History Manager

const _memStore = {};

export const safeStorage = {
    getItem(k) {
        try { return localStorage.getItem(k); } catch (e) { return _memStore[k] || null; }
    },
    setItem(k, v) {
        try { localStorage.setItem(k, v); } catch (e) { _memStore[k] = v; }
    },
    removeItem(k) {
        try { localStorage.removeItem(k); } catch (e) { delete _memStore[k]; }
    }
};

export function getCurrentUser() {
    return safeStorage.getItem('cyberdork_active_user') || null;
}

export function registerUser(username, password) {
    if (!username || !password) return { success: false, msg: 'Username and password required.' };
    const users = JSON.parse(safeStorage.getItem('cyberdork_users') || '{}');
    if (users[username]) {
        return { success: false, msg: 'User already exists.' };
    }
    users[username] = { password, created: new Date().toISOString() };
    safeStorage.setItem('cyberdork_users', JSON.stringify(users));
    return { success: true, msg: 'User registered successfully!' };
}

export function loginUser(username, password) {
    if (!username || !password) return { success: false, msg: 'Username and password required.' };
    
    // Default master admin fallback
    if (username === 'admin' && password === 'admin') {
        safeStorage.setItem('cyberdork_active_user', 'admin');
        return { success: true, user: 'admin' };
    }

    const users = JSON.parse(safeStorage.getItem('cyberdork_users') || '{}');
    if (users[username] && users[username].password === password) {
        safeStorage.setItem('cyberdork_active_user', username);
        return { success: true, user: username };
    }

    return { success: false, msg: 'Invalid username or password.' };
}

export function logoutUser() {
    safeStorage.removeItem('cyberdork_active_user');
}

export function logSearchHistory(target, type = 'search') {
    if (!target) return;
    const history = JSON.parse(safeStorage.getItem('cyberdork_history') || '[]');
    const newEntry = {
        id: Date.now(),
        target,
        type,
        timestamp: new Date().toLocaleString()
    };
    const filtered = history.filter(item => item.target !== target || item.type !== type);
    filtered.unshift(newEntry);
    const updated = filtered.slice(0, 50);
    safeStorage.setItem('cyberdork_history', JSON.stringify(updated));
}

export function getSearchHistory() {
    return JSON.parse(safeStorage.getItem('cyberdork_history') || '[]');
}

export function clearSearchHistory() {
    safeStorage.setItem('cyberdork_history', '[]');
}

export function exportHistoryJSON() {
    const history = getSearchHistory();
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cyberdork_osint_history_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

export function exportHistoryCSV() {
    const history = getSearchHistory();
    if (history.length === 0) return alert('No history data to export.');

    let csvContent = "data:text/csv;charset=utf-8,ID,Target,Type,Timestamp\n";
    history.forEach(row => {
        csvContent += `"${row.id}","${row.target.replace(/"/g, '""')}","${row.type}","${row.timestamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `cyberdork_osint_history_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
