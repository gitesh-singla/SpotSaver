import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import L from "leaflet";

function ListMap({ spot, location, coordinates, amenities }) {
  return (
    <MapContainer
      center={[spot.location.lat, spot.location.lon]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-[400px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={userIcon} position={location} />
      {amenities &&
        amenities.map((amenity) => {
          let icon;
          if (amenity.type == "hotel") icon = hotelIcon;
          if (amenity.type == "gas") icon = gasIcon;
          if (amenity.type == "food") icon = foodIcon;
          if (amenity.type == "daycare") icon = daycareIcon;

          return (
            <Marker
              icon={icon}
              position={[amenity.location.lat, amenity.location.lon]}
              key={amenity._id}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <span>{amenity.name}</span>
              </Tooltip>
            </Marker>
          );
        })}
      <CustomMarker
        position={[spot.location.lat, spot.location.lon]}
        key={spot._id}
      />
      {coordinates && <Polyline positions={coordinates} color="blue" />}
    </MapContainer>
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

const foodIcon = L.icon({
  iconUrl: "/food.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});
const gasIcon = L.icon({
  iconUrl: "/gas.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});
const daycareIcon = L.icon({
  iconUrl: "/daycare.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});
const hotelIcon = L.icon({
  iconUrl: "/hotel.png",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const CustomMarker = ({ position }) => (
  <Marker position={position} icon={customIcon} />
);

export default ListMap;
