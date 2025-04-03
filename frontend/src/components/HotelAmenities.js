import React from "react";

const HotelAmenities = ({ openModal }) => {
  return (
    <div className="hotel-amenities">
      <h3>Tiện nghi</h3>
      <ul>
        <li>🕒 Lễ tân 24h</li>
        <li>🎒 Giữ hành lý</li>
        <li>📶 Internet miễn phí</li>
      </ul>
      <button className="detail-button" onClick={() => openModal("Chi tiết tiện nghi của khách sạn...")}>
        Xem chi tiết
      </button>
    </div>
  );
};

export default HotelAmenities;
