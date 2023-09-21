import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconSize: [24, 32],
  iconAnchor: [24, 32],
  popupAnchor: [0, -32],
});

const inactiveMarkerIcon = new L.Icon({
  iconUrl: "https://icon-library.com/images/inactive-icon/inactive-icon-8.jpg",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const MapComponent = () => {
  const position = [51.145981, 71.471815];

  const [markers, setMarkers] = useState([]);
  const [newMarkerData, setNewMarkerData] = useState({
    position: position,
    title: "",
    subtitle: "",
    status: "Активный",
  });

  const [editMarkerIndex, setEditMarkerIndex] = useState(null);
  const [editedMarkerData, setEditedMarkerData] = useState(null);

  const addMarker = () => {
    setMarkers([...markers, newMarkerData]);
    setNewMarkerData({
      position: position,
      title: "",
      subtitle: "",
      status: "Активный",
    });
  };

  const handleDrag = (index, newPosition) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index].position = [newPosition.lat, newPosition.lng];
    setMarkers(updatedMarkers);
  };

  const deleteMarker = (index) => {
    const updatedMarkers = [...markers];
    updatedMarkers.splice(index, 1);
    setMarkers(updatedMarkers);
  };

  const openEditForm = (index) => {
    setEditMarkerIndex(index);
    setEditedMarkerData({ ...markers[index] });
  };

  const saveEdit = (index, editedData) => {
    const updatedMarkers = [...markers];
    updatedMarkers[index] = editedData;
    setMarkers(updatedMarkers);
    setEditMarkerIndex(null);
    setEditedMarkerData(null);
  };

  const closeEditForm = () => {
    setEditMarkerIndex(null);
    setEditedMarkerData(null);
  };

  return (
    <div>
      <h1>Карта</h1>
      <div>
        <label>
          Заголовок:
          <input
            className=""
            type="text"
            value={newMarkerData.title}
            onChange={(e) =>
              setNewMarkerData({
                ...newMarkerData,
                title: e.target.value,
              })
            }
          />
        </label>
        <button onClick={addMarker}>Добавить метку</button>
      </div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ width: "100%", height: "100vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={
              marker.status === "Неактивный"
                ? inactiveMarkerIcon
                : customMarkerIcon
            }
            draggable={true}
            onDragEnd={(newPosition) => handleDrag(index, newPosition)}
          >
            <Popup>
              {editMarkerIndex === index ? (
                <div>
                  <label>
                    Заголовок:
                    <input
                      type="text"
                      value={editedMarkerData.title}
                      onChange={(e) => {
                        const editedData = {
                          ...editedMarkerData,
                          title: e.target.value,
                        };
                        setEditedMarkerData(editedData);
                      }}
                    />
                  </label>
                  <label>
                    Подзаголовок:
                    <input
                      type="text"
                      value={editedMarkerData.subtitle}
                      onChange={(e) => {
                        const editedData = {
                          ...editedMarkerData,
                          subtitle: e.target.value,
                        };
                        setEditedMarkerData(editedData);
                      }}
                    />
                  </label>
                  <label>
                    Статус:
                    <select
                      value={editedMarkerData.status}
                      onChange={(e) => {
                        const editedData = {
                          ...editedMarkerData,
                          status: e.target.value,
                        };
                        setEditedMarkerData(editedData);
                      }}
                    >
                      <option value="Активный">Активный</option>
                      <option value="Неактивный">Неактивный</option>
                    </select>
                  </label>
                  <button onClick={() => saveEdit(index, editedMarkerData)}>
                    Сохранить
                  </button>
                </div>
              ) : (
                <div>
                  <strong>{marker.title}</strong>
                  <div>{marker.subtitle}</div>
                  <div>Status: {marker.status}</div>
                  <button onClick={() => openEditForm(index)}>
                    Редактировать
                  </button>
                  <button onClick={() => deleteMarker(index)}>
                    Удалить метку
                  </button>
                </div>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
