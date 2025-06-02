// import React, { useState } from "react";
// import hotel1 from "../assets/hotel1.jpg";
// import hotel2 from "../assets/hotel2.jpg";
// import hotel3 from "../assets/hotel3.jpeg";
// import hotel4 from "../assets/hotel4.jpg";

// // Danh sách khách sạn
// const hotels = [
//   { id: 1, name: "Mayfair Suites", province: "Hồ Chí Minh", rating: 9.0, price: 876604, discount: "-15%", img: hotel1 },
//   { id: 2, name: "Ruby Star Hotel Truong Dinh", province: "Hồ Chí Minh", rating: 7.6, price: 634206, discount: "-5%", img: hotel2 },
//   { id: 3, name: "Khách Sạn Cap Town Sài Gòn", province: "Hồ Chí Minh", rating: 8.6, price: 1004160, discount: "-9%", img: hotel3 },
//   { id: 4, name: "Khách sạn The Odys Boutique", province: "Hà Nội", rating: 8.8, price: 1882553, discount: "-53%", img: hotel4 },
// ];

// const HotelList = () => {
//   const [selectedProvince, setSelectedProvince] = useState("");

//   const filteredHotels = selectedProvince
//     ? hotels.filter((hotel) => hotel.province === selectedProvince)
//     : hotels;

//   return (
//     <div style={{ 
//         padding: "30px", 
//         background: "#f7f9fc", 
//         minHeight: "100vh",
//         display: "flex", 
//         flexDirection: "column", 
//         alignItems: "start", // Căn trái tất cả nội dung
//         maxWidth: "1300px", // Đảm bảo nội dung không quá rộng
//         margin: "0 auto" // Căn giữa trang
//       }}>
//         <h2>Khách sạn với giá cực sốc</h2>
//       {/* Bộ lọc tỉnh thành bằng button */}
//       <div style={{ display: "flex", justifyContent: "left", gap: "20px", marginBottom: "20px", width: "fit-content" }}>
//         <button
//           onClick={() => setSelectedProvince("")}
//           style={{
//             padding: "10px 20px",
//             background: selectedProvince === "" ? "#007BFF" : "#ddd",
//             color: selectedProvince === "" ? "white" : "black",
//             border: "none",
//             borderRadius: "20px",
//             cursor: "pointer",
//           }}
//         >
//           Tất cả
//         </button>
//         <button
//           onClick={() => setSelectedProvince("Hồ Chí Minh")}
//           style={{
//             padding: "10px 20px",
//             background: selectedProvince === "Hồ Chí Minh" ? "#007BFF" : "#ddd",
//             color: selectedProvince === "Hồ Chí Minh" ? "white" : "black",
//             border: "none",
//             borderRadius: "20px",
//             cursor: "pointer",
//           }}
//         >
//           Hồ Chí Minh
//         </button>
//         <button
//           onClick={() => setSelectedProvince("Hà Nội")}
//           style={{
//             padding: "10px 20px",
//             background: selectedProvince === "Hà Nội" ? "#007BFF" : "#ddd",
//             color: selectedProvince === "Hà Nội" ? "white" : "black",
//             border: "none",
//             borderRadius: "20px",
//             cursor: "pointer",
//           }}
//         >
//           Hà Nội
//         </button>
//       </div>

//       {/* Danh sách khách sạn */}
//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "start", gap: "20px" }}>
//         {filteredHotels.map((hotel) => (
//           <div
//             key={hotel.id}
//             style={{
//               width: "280px",
//               borderRadius: "10px",
//               overflow: "hidden",
//               boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
//               background: "white",
//             }}
//           >
//             {/* Hình ảnh full frame */}
//             <img src={hotel.img} alt={hotel.name} style={{ width: "100%", height: "180px", objectFit: "cover" }} />

//             {/* Thông tin khách sạn */}
//             <div style={{ padding: "15px" }}>
//               <h3
//                 style={{
//                     margin: "5px 0",
//                     fontSize: "18px",
//                     textAlign: "left",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                 }}
//                 title={hotel.name} // Hiển thị tên đầy đủ khi hover
//               >
//                 {hotel.name}
//               </h3>

//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <p style={{ margin: "5px 0", color: "#555", fontSize: "14px" }}>{hotel.province}</p>
//                 <p style={{ margin: "5px 0", fontSize: "14px", color: "#f39c12" }}>⭐ {hotel.rating}</p>
//               </div>

//               <p style={{ margin: "5px 0", fontSize: "16px" }}>
//                 <del style={{ color: "#888" }}>{(hotel.price * 1.2).toLocaleString()} đ</del>{" "}
//                 <b style={{ color: "#e74c3c" }}>{hotel.price.toLocaleString()} đ</b>
//               </p>

//               <span
//                 style={{
//                   display: "inline-block",
//                   background: "#e74c3c",
//                   color: "white",
//                   padding: "3px 10px",
//                   borderRadius: "5px",
//                   fontSize: "14px",
//                 }}
//               >
//                 {hotel.discount}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HotelList;
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import {
  FaWifi,
  FaTv,
  FaSwimmingPool,
  FaUtensils,
  FaCar,
  FaDumbbell,
  FaSpa
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const provinces = ["Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Huế", "Nha Trang"];
const apiUrl = process.env.REACT_APP_API_URL;

const amenityIcons = {
  Wifi: <FaWifi />,
  TV: <FaTv />,
  "Hồ bơi": <FaSwimmingPool />,
  "Nhà hàng": <FaUtensils />,
  "Chỗ đỗ xe": <FaCar />,
  "Phòng gym": <FaDumbbell />,
  Spa: <FaSpa />
};

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const fetchHotels = async (province) => {
    try {
      setLoading(true);
      const endpoint = province
        ? `${apiUrl}/hotels/province/${encodeURIComponent(province)}`
        : `${apiUrl}/hotels`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) {
        setHotels(data.data);
      }
    } catch (err) {
      console.error("Error fetching hotels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(selectedProvince);
    setShowAll(false); // reset khi chuyển tỉnh
  }, [selectedProvince]);

  const displayedHotels = showAll ? hotels : hotels.slice(0, 8);

  return (
    <div
      style={{
        padding: "30px",
        background: "#f7f9fc",
        minHeight: "100vh",
        maxWidth: "1300px",
        margin: "0 auto"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Khách sạn nổi bật</h2>

      {/* Bộ lọc tỉnh thành */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap"
        }}
      >
        <button
          onClick={() => setSelectedProvince("")}
          style={{
            padding: "10px 20px",
            background: selectedProvince === "" ? "#007BFF" : "#ddd",
            color: selectedProvince === "" ? "white" : "black",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Tất cả
        </button>
        {provinces.map((province) => (
          <button
            key={province}
            onClick={() => setSelectedProvince(province)}
            style={{
              padding: "10px 20px",
              background: selectedProvince === province ? "#007BFF" : "#ddd",
              color: selectedProvince === province ? "white" : "black",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {province}
          </button>
        ))}
      </div>

      {/* Danh sách khách sạn */}
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {displayedHotels.length > 0 ? (
              displayedHotels.map((hotel) => (
                <div
                  key={hotel._id}
                  onClick={() => navigate(`/hotelInfo?id=${hotel._id}`)}
                  style={{
                    width: "280px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    background: "white",
                    transition: "transform 0.3s",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={
                      hotel.images[0] ||
                      "https://via.placeholder.com/280x180?text=No+Image"
                    }
                    alt={hotel.name}
                    style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "15px" }}>
                    <h3
                      style={{
                        margin: "5px 0",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}
                      title={hotel.name}
                    >
                      {hotel.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px"
                      }}
                    >
                      <span style={{ fontSize: "14px", color: "#666" }}>
                        {hotel.province}
                      </span>
                      <span style={{ fontSize: "14px", color: "#f39c12" }}>
                        ⭐ {hotel.starRating || "?"}
                      </span>
                    </div>

                    {/* Tiện nghi */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        marginBottom: "10px"
                      }}
                    >
                      {hotel.amenities?.slice(0, 3).map((amenity, idx) => (
                        <span
                          key={idx}
                          title={amenity}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "13px",
                            background: "#f0f0f0",
                            padding: "4px 8px",
                            borderRadius: "12px",
                            gap: "4px"
                          }}
                        >
                          {amenityIcons[amenity]} {amenity}
                        </span>
                      ))}
                    </div>

                    <p style={{ fontSize: "16px", margin: "5px 0" }}>
                      <b style={{ color: "#e74c3c" }}>
                        {hotel.pricePerNight.toLocaleString()} đ
                      </b>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>Không có khách sạn nào phù hợp.</p>
            )}
          </div>

          {/* Nút xem chi tiết hoặc thu gọn */}
          {hotels.length > 8 && (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                onClick={() => setShowAll(!showAll)}
                style={{
                  padding: "12px 30px",
                  background: "#007BFF",
                  color: "white",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "background 0.3s"
                }}
              >
                {showAll ? "Thu gọn" : "Xem tất cả"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HotelList;

