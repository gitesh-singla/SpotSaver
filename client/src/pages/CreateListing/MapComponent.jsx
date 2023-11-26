import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

function MapComponent({lat, setLat, lon, setLon}) {

  const onDragEnd = (e) => {
    setLat(e.target.getLatLng().lat);
    setLon(e.target.getLatLng().lng);
  };

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <DropPin position={[lat, lon]} onDragEnd={onDragEnd} />
      <RecenterAutomatically lat={lat} lon={lon}/>
    </MapContainer>
  );
}

const RecenterAutomatically = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon]);
  return null;
};

const DropPin = ({ position, onDragEnd }) => {
  const pinIcon = new L.Icon({
    iconUrl: "/map-marker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Marker
      position={position}
      icon={pinIcon}
      draggable={true}
      eventHandlers={{
        dragend: onDragEnd,
      }}
    >
      <Popup>Drag the pin to desired location</Popup>
    </Marker>
  );
};

export default MapComponent;
