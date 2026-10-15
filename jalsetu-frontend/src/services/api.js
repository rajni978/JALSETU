import axios from 'axios';

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

// Single axios instance - backend teammate only needs to set VITE_API_URL
const api = axios.create({
  baseURL: import.meta.env.VITE_GEOAPIFY_KEY || 'http://localhost:5000/api',
  timeout: 15000,
});

console.log(
  "Geoapify key loaded:",
  Boolean(import.meta.env.VITE_GEOAPIFY_KEY)
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jalsetu_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) localStorage.removeItem('jalsetu_token');
    return Promise.reject(err);
  }
);

// Returns mock data (with small delay) when VITE_USE_MOCK=true, else calls backend
export const request = async (apiCall, mockData) => {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 350));
    return typeof mockData === 'function' ? mockData() : mockData;
  }
  const res = await apiCall();
  return res.data;
};

export default api;