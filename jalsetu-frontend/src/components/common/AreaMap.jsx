import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { MAP_CENTER } from '../../utils/constants';
import { levelHex } from '../../utils/helpers';

export default function AreaMap({ areas, selectedId, onSelect, height = 520 }) {
  return (
    <MapContainer center={MAP_CENTER} zoom={8} scrollWheelZoom={false} style={{ height }} className="z-0 rounded-xl">
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {areas.map((a) => (
        <CircleMarker key={a.id} center={[a.lat, a.lng]} radius={a.id === selectedId ? 17 : 12}
          pathOptions={{ color: a.id === selectedId ? '#082f55' : '#fff', weight: 3, fillColor: levelHex(a.stress.level), fillOpacity: 0.9 }}
          eventHandlers={{ click: () => onSelect(a.id) }}>
          <Popup>
            <p className="font-bold">{a.name}, {a.district}</p>
            <p className="text-xs">Water stress: {a.stress.score} ({a.stress.level})</p>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}