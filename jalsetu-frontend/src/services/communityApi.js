import api, { request } from './api';
import { seedReports, seedSuggestions } from '../data/mockData';
import { loadList, saveList, newId } from '../data/mockStore';

const byNewest = (a, b) => new Date(b.date) - new Date(a.date);

export const getReports = () =>
  request(() => api.get('/reports'), () => loadList('reports', seedReports).sort(byNewest));

export const createReport = (payload) =>
  request(() => api.post('/reports', payload), () => {
    const item = { id: newId('r'), status: 'Reported', date: new Date().toISOString(), ...payload };
    saveList('reports', [item, ...loadList('reports', seedReports)]);
    return item;
  });

export const getSuggestions = () =>
  request(() => api.get('/suggestions'), () => loadList('suggestions', seedSuggestions).sort(byNewest));

export const createSuggestion = (payload) =>
  request(() => api.post('/suggestions', payload), () => {
    const item = { id: newId('s'), votes: 0, date: new Date().toISOString(), ...payload };
    saveList('suggestions', [item, ...loadList('suggestions', seedSuggestions)]);
    return item;
  });

export const voteSuggestion = (id) =>
  request(() => api.post(`/suggestions/${id}/vote`), () => {
    const list = loadList('suggestions', seedSuggestions).map((s) => (s.id === id ? { ...s, votes: s.votes + 1 } : s));
    saveList('suggestions', list);
    return list.find((s) => s.id === id);
  });