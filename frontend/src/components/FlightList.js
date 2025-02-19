import React, { useState } from "react";
import "../css/FlightList.css"; 

const flights = [
  { id: 1, airline: "Vietravel Airlines", departure: "Tân Sơn Nhất", destination: "Nội Bài", departureDate: "17/02/2025", originalPrice: "558.000 ₫", discountedPrice: "508.000 ₫", taxPrice: "1.241.040 ₫" },
  { id: 2, airline: "Bamboo Airways", departure: "Tân Sơn Nhất", destination: "Cam Ranh", departureDate: "18/02/2025", originalPrice: "149.000 ₫", discountedPrice: "99.000 ₫", taxPrice: "746.000 ₫" },
  { id: 3, airline: "Vietravel Airlines", departure: "Đà Nẵng", destination: "Nội Bài", departureDate: "17/02/2025", originalPrice: "108.000 ₫", discountedPrice: "58.000 ₫", taxPrice: "722.640 ₫" },
  { id: 4, airline: "Vietravel Airlines", departure: "Phú Quốc", destination: "Tân Sơn Nhất", departureDate: "17/02/2025", originalPrice: "358.000 ₫", discountedPrice: "308.000 ₫", taxPrice: "992.640 ₫" },
];

const departures = [...new Set(flights.map((flight) => flight.departure))];

const FlightList = () => {
  const [selectedDeparture, setSelectedDeparture] = useState("");

  const filteredFlights = selectedDeparture ? flights.filter((flight) => flight.departure === selectedDeparture) : flights;

  return (
    <div className="flight-container">
      <h2 className="flight-title">✈️ Tìm chuyến bay giá rẻ</h2>

      <div className="flight-filter">
        <select value={selectedDeparture} onChange={(e) => setSelectedDeparture(e.target.value)}>
          <option value="">Tất cả điểm xuất phát</option>
          {departures.map((departure, index) => (
            <option key={index} value={departure}>{departure}</option>
          ))}
        </select>
        <button onClick={() => setSelectedDeparture("")}>Reset</button>
      </div>

      <div className="flight-grid">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
              <h3>{flight.airline}</h3>
              <p className="flight-route">{flight.departure} ➝ {flight.destination}</p>
              <p className="flight-date">📅 {flight.departureDate}</p>
              <p className="flight-original">{flight.originalPrice}</p>
              <p className="flight-discount">{flight.discountedPrice}</p>
              <p className="flight-tax">Giá sau thuế: {flight.taxPrice}</p>
              <button className="flight-book">Đặt vé</button>
            </div>
          ))
        ) : (
          <p className="flight-empty">Không tìm thấy chuyến bay phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default FlightList;
