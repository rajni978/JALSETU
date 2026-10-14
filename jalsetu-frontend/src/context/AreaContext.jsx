import { createContext, useContext, useEffect, useState } from 'react';
import { getAreas } from '../services/areaApi';

const AreaContext = createContext(null);

// Keeps the selected area (and all areas with stress score) available on every page
export function AreaProvider({ children }) {
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaIdState] = useState(() => localStorage.getItem('jalsetu_area') || 'ormanjhi');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getAreas()
      .then(setAreas)
      .catch((e) => setError(e.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const setAreaId = (id) => {
    localStorage.setItem('jalsetu_area', id);
    setAreaIdState(id);
  };

  const area = areas.find((a) => a.id === areaId) || areas[0] || null;

  return (
    <AreaContext.Provider value={{ areas, area, areaId: area?.id || areaId, setAreaId, loading, error, reload: load }}>
      {children}
    </AreaContext.Provider>
  );
}

export const useArea = () => useContext(AreaContext);