import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer,  Marker, Popup, Circle, useMap } from "react-leaflet";

function Map({spots, location}) {

  return (

      <div className="mapContainer w-4/6">
        <MapContainer center={location} zoom={13} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && <Circle center={location} radius={20} color="green"/>}
          {spots && spots.map(spot => {
            return (
              <CustomMarker position={[spot.location.lat, spot.location.lon]} key={spot._id}/>
            )
          })}
          <RecenterAutomatically location={location} />
        </MapContainer>
      </div>
  );
}

const RecenterAutomatically = ({location}) => {
  const map = useMap();
   useEffect(() => {
     map.setView(location);
   }, location);
   return null;
 }

 const customIcon = L.icon({
  iconUrl: 'map-marker.png',
  iconSize: [48, 48], // Width and height of the icon
  iconAnchor: [24, 40], // Anchor point of the icon (center-bottom)
});

const CustomMarker = ({position}) => (
  <Marker position={position} icon={customIcon} />
);



export default Map;
