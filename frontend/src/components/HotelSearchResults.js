import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import HotelListComponent from "./HotelListComponent";
import "../css/HotelSearchResults.css";

const HotelSearchResults = () => {
  const location = useLocation();
  const initialHotels = location.state?.results || [];

  const [filters, setFilters] = useState({});
  const [filteredHotels, setFilteredHotels] = useState(initialHotels);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    // Nếu bạn muốn lọc hotels dựa trên filters tại client
    let filtered = initialHotels;

    if (filters.province) {
      filtered = filtered.filter(hotel =>
        hotel.province?.toLowerCase().includes(filters.province.toLowerCase())
      );
    }

    if (filters.district) {
      filtered = filtered.filter(hotel =>
        hotel.district?.toLowerCase().includes(filters.district.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(hotel =>
        hotel.pricePerNight >= Number(filters.minPrice)
      );
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(hotel =>
        hotel.pricePerNight <= Number(filters.maxPrice)
      );
    }

    setFilteredHotels(filtered);
  }, [filters, initialHotels]);

  return (
    <div className="hotel-results-container">
      <h2>Kết quả nhận được là {filteredHotels.length} khách sạn</h2>
      <div className="hotel-results">
        <div className="filters">
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
        <div className="hotel-listing">
          <HotelListComponent hotels={filteredHotels} />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchResults;
