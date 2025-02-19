import React from "react";
import "../css/SearchBox.css";

const FlightSearch = () => (
  <div className="search-content">
    <input type="text" placeholder="Điểm đi" />
    <input type="text" placeholder="Điểm đến" />
    <input type="date" placeholder="Ngày đi" />
    <input type="date" placeholder="Ngày về (nếu có)" />
    <select>
      <option>1 người lớn, 0 trẻ em</option>
      <option>2 người lớn, 1 trẻ em</option>
    </select>
    <button className="search-button">🔍</button>
  </div>
);

export default FlightSearch;
