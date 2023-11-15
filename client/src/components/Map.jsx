import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, TileLayer,  Marker, Popup, Circle, useMap } from "react-leaflet";
import L from "leaflet";

function Map({spots, location}) {

  return (

    <section id="map-sec" className="fixed top-[57px] right-0 left-0 bottom-[52px] w-full h-full z-0">
      <MapContainer center={location} zoom={13} scrollWheelZoom={true} className="h-full w-full">       
     <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && <Marker icon={userIcon} position={location}/>}
          {spots && spots.map(spot => {
            return (
              <CustomMarker position={[spot.location.lat, spot.location.lon]} key={spot._id}/>
            )
          })}
          <RecenterAutomatically location={location} />
          </MapContainer>
  </section>
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
  iconSize: [48, 48],
  iconAnchor: [24, 40], // Anchor point of the icon (center-bottom)
  className: "hover:scale-105"
});

const userIcon = L.icon({
  iconUrl: 'user-marker.png',
  color: "red",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  
})

const CustomMarker = ({position}) => (
  <Marker position={position} icon={customIcon} />
);

export default Map;
