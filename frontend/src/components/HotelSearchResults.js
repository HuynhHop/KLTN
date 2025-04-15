import React, { useState } from "react";
import FilterComponent from "./FilterComponent";
import HotelListComponent from "./HotelListComponent";
import "../css/HotelSearchResults.css";

const HotelSearchResults = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="hotel-results-container">
      <h2>4 khách sạn tại Thành Phố Vũng Tàu</h2>
      <div className="hotel-results">
        <div className="filters">
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
        <div className="hotel-listing">
          <HotelListComponent filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchResults;
