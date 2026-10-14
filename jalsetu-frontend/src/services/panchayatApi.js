import api, { request } from './api';
import { seedActions, seedReports, seedMonitoring } from '../data/mockData';
import { loadList, saveList, newId } from '../data/mockStore';

export const getActions = () =>
  request(() => api.get('/actions'), () => loadList('actions', seedActions).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));

export const createAction = (payload) =>
  request(() => api.post('/actions', payload), () => {
    const now = new Date().toISOString();
    const item = { id: newId('a'), status: 'Planned', reportId: null, notes: '', createdAt: now, history: [{ status: 'Planned', date: now }], ...payload };
    saveList('actions', [item, ...loadList('actions', seedActions)]);
    if (item.reportId) setReportStatus(item.reportId, 'Action Planned');
    return item;
  });

export const updateActionStatus = (id, status) =>
  request(() => api.patch(`/actions/${id}`, { status }), () => {
    let updated;
    const list = loadList('actions', seedActions).map((a) => {
      if (a.id !== id) return a;
      updated = { ...a, status, history: [...a.history, { status, date: new Date().toISOString() }] };
      return updated;
    });
    saveList('actions', list);
    if (updated?.reportId && status === 'Resolved') setReportStatus(updated.reportId, 'Resolved');
    return updated;
  });

export const getMonitoring = (areaId) =>
  request(() => api.get('/monitoring', { params: { areaId } }), () => seedMonitoring.filter((m) => m.areaId === areaId));

function setReportStatus(reportId, status) {
  saveList('reports', loadList('reports', seedReports).map((r) => (r.id === reportId ? { ...r, status } : r)));
}