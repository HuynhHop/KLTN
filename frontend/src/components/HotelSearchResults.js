import React from "react";
import FilterComponent from "./FilterComponent";
import HotelListComponent from "./HotelListComponent";
import "../css/HotelSearchResults.css";

const HotelSearchResults = () => {
  return (
    <div className="hotel-results-container">
      <h2>4 khách sạn tại Thành Phố Vũng Tàu</h2>
      <div className="hotel-results">
        <div className="filters">
          <FilterComponent />
        </div>
        <div className="hotel-listing">
          <HotelListComponent />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchResults;
