import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

function ListMap({ spot, location, coordinates }) {
  // console.log(spot);
  return (
    <section
      id="map-sec"
      className="fixed top-[57px] right-0 left-0 bottom-[52px] w-full h-full z-0"
    >
      <MapContainer
        center={[spot.location.lat, spot.location.lon]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={userIcon} position={location} />
        <CustomMarker
          position={[spot.location.lat, spot.location.lon]}
          key={spot._id}
        />
        {coordinates && <Polyline positions={coordinates} color="blue" />}
      </MapContainer>
    </section>
  );
}

const customIcon = L.icon({
  iconUrl: "/map-marker.png",
  iconSize: [36, 36],
  iconAnchor: [18, 30], // Anchor point of the icon (center-bottom)
});

const userIcon = L.icon({
  iconUrl: "/user-marker.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const CustomMarker = ({ position }) => (
  <Marker position={position} icon={customIcon} />
);

export default ListMap;
