import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

export default function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const { isLoadingPosition, geolocationPosition, getPosition } =
    useGeolocation();

  // get lat/long in query string
  const {lat, lng } = useUrlPosition()

  // update map when lat & long are in url
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  // use geolcation
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {/* Show use your location btn only when geolocation is not set */}
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use my position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition} // center is not reactive when pos changes
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.emoji} {city.cityName}
            </Popup>
          </Marker>
        ))}
        {/* dynamically change the map view with this React component to force a re-render */}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// React component to dynamically change map postion
const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

// React component to detect click and get lat/long where clicked on the map
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvents({
    click: ({ latlng }) => {
      navigate(`form?lat=${latlng.lat}&lng=${latlng.lng}`);
    },
  });
};
