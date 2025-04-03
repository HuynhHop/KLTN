import React from "react";

const HotelHeader = () => {
  return (
    <div className="hotel-header">
      <div className="hotel-badge">
        <span className="badge sea-view">Sát biển</span>
        <span className="badge exclusive">Giá độc quyền</span>
      </div>
      <h1>Khách Sạn Fusion Suites Vũng Tàu</h1>
      <p className="rating">
        <span className="rating-score">9.2</span> Tuyệt vời (159 đánh giá)
      </p>
      <p className="hotel-location">📍 2, Trương Công Định, Vũng Tàu, Việt Nam</p>
      <div className="hotel-price">
        <span className="old-price">22.266.667 đ</span>
        <span className="discount">-93%</span>
        <span className="new-price">1.662.003 đ</span>
        <button className="book-button">Chọn phòng</button>
      </div>
    </div>
  );
};

export default HotelHeader;
