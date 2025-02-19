import React, { useState } from "react";
import hotel1 from "../assets/hotel1.jpg";
import hotel2 from "../assets/hotel2.jpg";
import hotel3 from "../assets/hotel3.jpeg";
import hotel4 from "../assets/hotel4.jpg";

// Danh sách khách sạn
const hotels = [
  { id: 1, name: "Mayfair Suites", province: "Hồ Chí Minh", rating: 9.0, price: 876604, discount: "-15%", img: hotel1 },
  { id: 2, name: "Ruby Star Hotel Truong Dinh", province: "Hồ Chí Minh", rating: 7.6, price: 634206, discount: "-5%", img: hotel2 },
  { id: 3, name: "Khách Sạn Cap Town Sài Gòn", province: "Hồ Chí Minh", rating: 8.6, price: 1004160, discount: "-9%", img: hotel3 },
  { id: 4, name: "Khách sạn The Odys Boutique", province: "Hà Nội", rating: 8.8, price: 1882553, discount: "-53%", img: hotel4 },
];

const HotelList = () => {
  const [selectedProvince, setSelectedProvince] = useState("");

  const filteredHotels = selectedProvince
    ? hotels.filter((hotel) => hotel.province === selectedProvince)
    : hotels;

  return (
    <div style={{ 
        padding: "30px", 
        background: "#f7f9fc", 
        minHeight: "100vh",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "start", // Căn trái tất cả nội dung
        maxWidth: "1300px", // Đảm bảo nội dung không quá rộng
        margin: "0 auto" // Căn giữa trang
      }}>
        <h2>Khách sạn với giá cực sốc</h2>
      {/* Bộ lọc tỉnh thành bằng button */}
      <div style={{ display: "flex", justifyContent: "left", gap: "20px", marginBottom: "20px", width: "fit-content" }}>
        <button
          onClick={() => setSelectedProvince("")}
          style={{
            padding: "10px 20px",
            background: selectedProvince === "" ? "#007BFF" : "#ddd",
            color: selectedProvince === "" ? "white" : "black",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setSelectedProvince("Hồ Chí Minh")}
          style={{
            padding: "10px 20px",
            background: selectedProvince === "Hồ Chí Minh" ? "#007BFF" : "#ddd",
            color: selectedProvince === "Hồ Chí Minh" ? "white" : "black",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Hồ Chí Minh
        </button>
        <button
          onClick={() => setSelectedProvince("Hà Nội")}
          style={{
            padding: "10px 20px",
            background: selectedProvince === "Hà Nội" ? "#007BFF" : "#ddd",
            color: selectedProvince === "Hà Nội" ? "white" : "black",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Hà Nội
        </button>
      </div>

      {/* Danh sách khách sạn */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", gap: "20px" }}>
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              width: "280px",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
              background: "white",
            }}
          >
            {/* Hình ảnh full frame */}
            <img src={hotel.img} alt={hotel.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />

            {/* Thông tin khách sạn */}
            <div style={{ padding: "15px" }}>
              <h3
                style={{
                    margin: "5px 0",
                    fontSize: "18px",
                    textAlign: "left",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
                title={hotel.name} // Hiển thị tên đầy đủ khi hover
              >
                {hotel.name}
              </h3>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>{hotel.province}</p>
                <p style={{ margin: "5px 0", fontSize: "14px", color: "#f39c12" }}>⭐ {hotel.rating}</p>
              </div>

              <p style={{ margin: "5px 0", fontSize: "16px" }}>
                <del style={{ color: "#888" }}>{(hotel.price * 1.2).toLocaleString()} đ</del>{" "}
                <b style={{ color: "#e74c3c" }}>{hotel.price.toLocaleString()} đ</b>
              </p>

              <span
                style={{
                  display: "inline-block",
                  background: "#e74c3c",
                  color: "white",
                  padding: "3px 10px",
                  borderRadius: "5px",
                  fontSize: "14px",
                }}
              >
                {hotel.discount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
