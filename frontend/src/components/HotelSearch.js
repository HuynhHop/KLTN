import React from "react";
import "../css/SearchBox.css";

const HotelSearch = () => (
  <div className="search-content">
    <input type="text" placeholder="Địa điểm, khách sạn trong nước hoặc quốc tế" />
    <input type="date" placeholder="Chọn ngày đi" />
    <input type="date" placeholder="Chọn ngày về" />
    <select>
      <option>1 phòng, 1 người lớn, 1 trẻ em</option>
      <option>2 phòng, 2 người lớn, 2 trẻ em</option>
    </select>
    <button className="search-button">🔍</button>
  </div>
);

export default HotelSearch;
