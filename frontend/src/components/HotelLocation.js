import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../css/HotelLocation.css"; // Import CSS cho component này
import Modal from "./Modal"; // Import Modal component

const hotelIcon = new L.DivIcon({
  html: `<div style="
    background: #e74c3c;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    transform: translate(-50%, -50%);
  "><i class="fas fa-hotel"></i></div>`,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const restaurantIcon = new L.DivIcon({
  html: `<div style="
    background: #2ecc71;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    transform: translate(-50%, -50%);
  "><i class="fas fa-utensils"></i></div>`,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const attractionIcon = new L.DivIcon({
  html: `<div style="
    background: #3498db;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    transform: translate(-50%, -50%);
  "><i class="fas fa-camera-retro"></i></div>`,
  className: "custom-icon",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const HotelLocation = ({ location, openModal }) => {
  const [places, setPlaces] = useState([]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [locationScore, setLocationScore] = useState(null);

  // Fetch địa điểm xung quanh từ Overpass API
  useEffect(() => {
    if (!location) return;

    const fetchPlaces = async () => {
      try {
        const { lat, lng } = location;
        const query = `
          [out:json];
          (
            node[amenity=restaurant](around:3000,${lat},${lng});
            node[tourism=attraction](around:3000,${lat},${lng});
          );
          out center;
        `;
        const res = await fetch(
          `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setPlaces(data.elements || []);
        // Phân tích kết quả
        const restaurantCount = data.elements.filter(
          (e) => e.tags?.amenity === "restaurant"
        ).length;
        const attractionCount = data.elements.filter(
          (e) => e.tags?.tourism === "attraction"
        ).length;

        // Tính điểm
        const restaurantScore = Math.min((restaurantCount / 20) * 5, 5);
        const attractionScore = Math.min((attractionCount / 10) * 5, 5);

        const totalScore = (restaurantScore + attractionScore).toFixed(1);
        setLocationScore(totalScore);
      } catch (error) {
        console.error("Fetch places error:", error);
      }
    };

    fetchPlaces();
  }, [location, isMapModalOpen]);

  if (!location) return null;

  // Lọc địa điểm có tên và theo tab
  const filteredPlaces = places.filter((place) => {
    const hasName = place.tags?.name;
    if (activeTab === "restaurants")
      return hasName && place.tags?.amenity === "restaurant";
    if (activeTab === "attractions")
      return hasName && place.tags?.tourism === "attraction";
    return hasName;
  });

  // Top places (ưu tiên có đánh giá hoặc phổ biến)
  const topPlaces = [...places]
    .filter((place) => place.tags?.name)
    .sort((a, b) => (b.tags?.rating || 0) - (a.tags?.rating || 0))
    .slice(0, 4);

  // Modal content với sidebar và bản đồ
  const mapModalContent = (
    <div style={{ height: "70vh", width: "100%" }}>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lng]} icon={hotelIcon}>
          <Popup>Khách sạn của bạn</Popup>
        </Marker>
        {filteredPlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lon]}
            icon={
              place.tags?.amenity === "restaurant"
                ? restaurantIcon
                : attractionIcon
            }
          >
            <Popup>
              <strong>{place.tags?.name || "Địa điểm"}</strong>
              <br />
              {place.tags?.amenity || place.tags?.tourism}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );

  return (
    <div className="hotel-location">
      <h3>
        Điểm vị trí tuyệt vời: <strong>{locationScore}</strong>
      </h3>

      {/* Hiển thị danh sách địa điểm */}
      <div className="top-places">
        <h4>Gợi ý nổi bật:</h4>
        <ul>
          {topPlaces.map((place) => (
            <li key={place.id}>
              <span className="place-category">
                {place.tags?.amenity === "restaurant" ? "🍴" : "🏞️"}
              </span>
              <strong>{place.tags.name}</strong>
            </li>
          ))}
        </ul>
      </div>

      {/* Nút mở Modal bản đồ */}
      <button className="detail-button" onClick={() => setIsMapModalOpen(true)}>
        Xem bản đồ
      </button>

      {/* Modal chứa bản đồ */}
      {isMapModalOpen && (
        <Modal
          title="Bản đồ & Địa điểm lân cận"
          content={mapModalContent}
          closeModal={() => setIsMapModalOpen(false)}
          width="100%"
          height="80vh"
        />
      )}
    </div>
  );
};

export default HotelLocation;
