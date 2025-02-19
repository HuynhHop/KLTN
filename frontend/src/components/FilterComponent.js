import React from "react";

const FilterComponent = () => {
  return (
    <div className="filter-container">
      <h3>Bộ lọc</h3>

      {/* Lọc theo giá */}
      <div className="filter-price">
        <label>Giá mỗi đêm</label>
        <input type="range" min="0" max="5000000" />
        <div className="price-range">
          <span>Thấp nhất: 0₫</span>
          <span>Cao nhất: Không giới hạn</span>
        </div>
      </div>

      {/* Bộ lọc phổ biến */}
      <div className="filter-category">
        <h4>Bộ lọc phổ biến</h4>
        <label>
          <input type="checkbox" /> Bao gồm bữa sáng
        </label>
        <label>
          <input type="checkbox" /> Miễn phí hủy phòng
        </label>
        <label>
          <input type="checkbox" /> Đánh giá tuyệt vời (9+)
        </label>
        <label>
          <input type="checkbox" /> Vị trí trung tâm
        </label>
        <label>
          <input type="checkbox" /> Miễn phí phụ thu trẻ em
        </label>
      </div>

      {/* Lọc theo loại phòng */}
      <div className="filter-category">
        <h4>Loại phòng</h4>
        <label>
          <input type="checkbox" /> Standard
        </label>
        <label>
          <input type="checkbox" /> Deluxe
        </label>
        <label>
          <input type="checkbox" /> Suite
        </label>
      </div>

      {/* Lọc theo xếp hạng sao */}
      <div className="filter-category">
        <h4>Hạng khách sạn</h4>
        <label>
          <input type="checkbox" /> ⭐⭐⭐⭐⭐ (5 sao)
        </label>
        <label>
          <input type="checkbox" /> ⭐⭐⭐⭐ (4 sao)
        </label>
        <label>
          <input type="checkbox" /> ⭐⭐⭐ (3 sao)
        </label>
      </div>
    </div>
  );
};

export default FilterComponent;
