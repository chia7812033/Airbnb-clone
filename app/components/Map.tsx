"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { CountrySelectValue } from "./inputs/CountrySelect";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  position?: CountrySelectValue;
}

const Map: React.FC<MapProps> = ({ position }) => {
  return (
    <div>
      <MapContainer
        center={(position?.latlng as L.LatLngExpression) || [40, 116]}
        zoom={6}
        scrollWheelZoom={false}
        className='h-[35vh] rounded-lg border-2 border-black'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {position && (
          <Marker
            position={(position?.latlng as L.LatLngExpression) || [40, 116]}
          >
            <Popup>{position?.label}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
