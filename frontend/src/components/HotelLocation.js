import React from "react";

const HotelLocation = ({ openModal }) => {
  return (
    <div className="hotel-location">
      <h3>Vị trí</h3>
      <p>Điểm vị trí tuyệt vời: <strong>9.4</strong></p>
      <button className="detail-button" onClick={() => openModal("Bản đồ chi tiết vị trí khách sạn...")}>
        Xem chi tiết
      </button>
    </div>
  );
};

export default HotelLocation;
