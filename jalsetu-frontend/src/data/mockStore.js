// Tiny localStorage-backed store so demo data survives page refresh (mock mode only)
const KEY = 'jalsetu_mock_';

export function loadList(name, seed) {
  try {
    const raw = localStorage.getItem(KEY + name);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return structuredClone(seed);
}

export function saveList(name, list) {
  try { localStorage.setItem(KEY + name, JSON.stringify(list)); } catch { /* ignore */ }
  return list;
}

export const newId = (p) => `${p}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`;