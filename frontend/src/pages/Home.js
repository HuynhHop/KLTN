import React from "react";
import SearchBox from "../components/SearchBox";
import VoucherCarousel from "../components/VoucherCarousel";
import HotelList from "../components/HotelList";
import FlightList from "../components/FlightList";

function Home() {
  return (
    <div style={{ padding: "0px", textAlign: "center" }}>
      <SearchBox /> {/* Gọi component tìm kiếm */}
      <VoucherCarousel /> {/* Gọi component carousel */}
      <HotelList /> {/* Gọi component danh sách khách sạn */}
      <FlightList /> 
    </div>
  );
}

export default Home;
