
import { useEffect, useRef, useState } from 'react';
import { MapPin, Search, ChevronDown, LoaderCircle } from 'lucide-react';
import { useArea } from '../../context/AreaContext';

export default function AreaSelector() {
  const { areas, area, selectedLocation, chooseLocation } = useArea();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const box = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (box.current && !box.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  useEffect(() => {
    const query = q.trim();

    if (query.length < 3) {
      setResults([]);
      setError('');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      const key = import.meta.env.VITE_GEOAPIFY_KEY;

      if (!key) {
        setError('Geoapify API key not found.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const params = new URLSearchParams({
          text: query,
          limit: '8',
          format: 'json',
          apiKey: key,
        });

        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?${params}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error('Location search failed. Please check your API key.');
        }

        const data = await response.json();

        setResults(
          (data.results || [])
            .filter(
              (item) =>
                Number.isFinite(item.lat) &&
                Number.isFinite(item.lon)
            )
            .map((item) => ({
              id: `${item.place_id || item.formatted}-${item.lat}-${item.lon}`,
              name: item.name || item.address_line1 || item.formatted,
              formatted: item.formatted,
              latitude: item.lat,
              longitude: item.lon,
              country: item.country || '',
              state: item.state || '',
              city: item.city || item.county || '',
            }))
        );
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Location search failed.');
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q]);

  const choose = (location) => {
    chooseLocation(location);
    setQ('');
    setResults([]);
    setOpen(false);
  };

  const currentLocation =
    selectedLocation?.formatted ||
    (area ? `${area.name}${area.district ? `, ${area.district}` : ''}` : 'Select location');

  return (
    <div className="relative" ref={box}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-card"
      >
        <MapPin size={16} className="text-aqua-600" />
        <span className="text-sm font-semibold text-navy-900">Location</span>
        <span className="max-w-[180px] truncate text-sm font-medium">
          {currentLocation}
        </span>
        <ChevronDown size={16} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 max-w-[90vw] rounded-xl bg-white p-2 text-left shadow-2xl ring-1 ring-slate-100">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              autoFocus
              className="input pl-9"
              placeholder="Search any city, village or area..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search any location"
            />
          </div>

          {loading && (
            <p className="flex items-center gap-2 px-3 py-3 text-sm text-slate-500">
              <LoaderCircle size={16} className="animate-spin" />
              Searching locations...
            </p>
          )}

          {error && (
            <p className="px-3 py-3 text-sm text-red-600">{error}</p>
          )}

          {!loading && !error && q.trim().length > 0 && q.trim().length < 3 && (
            <p className="px-3 py-3 text-sm text-slate-500">
             Type atleaset 3 character
            </p>
          )}

          {!loading && !error && results.length > 0 && (
            <ul role="listbox" className="mt-2 max-h-64 overflow-y-auto">
              {results.map((location) => (
                <li key={location.id} role="option" aria-selected={false}>
                  <button
                    type="button"
                    onClick={() => choose(location)}
                    className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                  >
                    <MapPin size={15} className="mt-1 shrink-0 text-aqua-600" />
                    <span>
                      <span className="block font-semibold text-slate-800">
                        {location.name}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {location.formatted}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && q.trim().length >= 3 && results.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-slate-500">
              No Location found . Please check your spelling.
            </p>
          )}

          <p className="px-3 pb-1 pt-2 text-xs text-slate-400">
            {areas.length} existing water-data areas · New locations from  online search
          </p>
        </div>
      )}
    </div>
  );
}
