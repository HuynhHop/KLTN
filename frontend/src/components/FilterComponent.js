import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [starRating, setStarRating] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [hasFreeCancellation, setHasFreeCancellation] = useState(false);

  const handleCheckboxChange = (value, state, setState) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const applyFilters = () => {
    onFilterChange({
      minPrice,
      maxPrice,
      starRating,
      amenities,
      province,
      district,
      freeCancellation: hasFreeCancellation,
    });
  };

  return (
    <div className="filter-container">
      <h3>Bộ lọc</h3>

      {/* Tỉnh/Thành phố, Quận/Huyện */}
      <div className="filter-category">
        <input
          type="text"
          placeholder="Tỉnh/Thành phố"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quận/Huyện"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>

      {/* Lọc theo giá */}
      <div className="filter-price">
        <label>Giá mỗi đêm</label>
        <input
          type="number"
          placeholder="Thấp nhất"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cao nhất"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Tiện nghi */}
      <div className="filter-category">
        <h4>Tiện nghi</h4>
        {["Wifi", "Hồ bơi", "Bãi đậu xe", "Điều hòa", "Thang máy", "Nhà hàng"].map((item) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={amenities.includes(item)}
              onChange={() => handleCheckboxChange(item, amenities, setAmenities)}
            />
            {item}
          </label>
        ))}
      </div>

      {/* Hạng sao */}
      <div className="filter-category">
        <h4>Hạng khách sạn</h4>
        {[5, 4, 3, 2, 1].map((star) => (
          <label key={star}>
            <input
              type="checkbox"
              checked={starRating.includes(star)}
              onChange={() => handleCheckboxChange(star, starRating, setStarRating)}
            />
            {"⭐".repeat(star)} ({star} sao)
          </label>
        ))}
      </div>

      {/* Chính sách */}
      <div className="filter-category">
        <h4>Chính sách</h4>
        <label>
          <input
            type="checkbox"
            checked={hasFreeCancellation}
            onChange={() => setHasFreeCancellation(!hasFreeCancellation)}
          />
          Miễn phí hủy phòng
        </label>
      </div>

      <button onClick={applyFilters}>Áp dụng</button>
    </div>
  );
};

export default FilterComponent;
