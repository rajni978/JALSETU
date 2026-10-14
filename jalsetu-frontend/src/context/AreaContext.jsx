import { createContext, useContext, useEffect, useState } from 'react';
import { getAreas } from '../services/areaApi';

const AreaContext = createContext(null);

// Keeps the selected area (and all areas with stress score) available on every page
export function AreaProvider({ children }) {
  const [areas, setAreas] = useState([]);
  const [areaId, setAreaIdState] = useState(() => localStorage.getItem('jalsetu_area') || 'ormanjhi');
  const [selectedLocation, setSelectedLocation] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem('jalsetu_location') || 'null');
  } catch {
    return null;
  }
});
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

  const chooseLocation = (location) => {
  localStorage.setItem('jalsetu_location', JSON.stringify(location));
  setSelectedLocation(location);

  // Existing predefined area ho to uska ID bhi update hoga
  const existingArea = areas.find(
    (a) =>
      a.name?.toLowerCase() === location.name?.toLowerCase()
  );

  if (existingArea) {
    setAreaId(existingArea.id);
  }
};

  const area = areas.find((a) => a.id === areaId) || areas[0] || null;

  return (
    <AreaContext.Provider value={{ areas, area, areaId: area?.id || areaId, setAreaId, loading, error, reload: load,selectedLocation,chooseLocation }}>
      {children}
    </AreaContext.Provider>
  );
}

export const useArea = () => useContext(AreaContext);