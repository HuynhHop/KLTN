import React from "react";

const HotelReviews = ({ openModal }) => {
  return (
    <div className="hotel-reviews">
      <h3>Đánh giá của khách hàng</h3>
      <p>Khách sạn này có đánh giá rất tốt từ khách hàng.</p>
      
      {/* Button Xem chi tiết */}
      <button className="detail-button" onClick={() => openModal("Chi tiết đánh giá")}>
        Xem chi tiết
      </button>
    </div>
  );
};

export default HotelReviews;
