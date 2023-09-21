import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -32],
});

const inactiveMarkerIcon = new L.Icon({
  iconUrl: "https://icon-library.com/images/inactive-icon/inactive-icon-8.jpg",
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

const User = () => {
  const position = [51.145981, 71.471815];
  const initialMarkers = JSON.parse(localStorage.getItem("markers")) || [];
  const [markers, setMarkers] = useState(initialMarkers);

  useEffect(() => {
    const savedMarkers = JSON.parse(localStorage.getItem("markers"));
    if (savedMarkers) {
      setMarkers(savedMarkers);
    }
  }, []);

  return (
    <div>
      <h1>Карта пользователя</h1>
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => {
          if (marker.deleted) return null; // Skip rendering deleted markers
          return (
            <Marker
              key={index}
              position={marker.position}
              icon={
                marker.status === "Неактивный"
                  ? inactiveMarkerIcon
                  : customMarkerIcon
              }
            >
              <Popup>
                <div>
                  <strong>{marker.title}</strong>
                  <div>Status: {marker.status}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default User;
