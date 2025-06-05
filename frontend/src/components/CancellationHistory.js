import React from "react";

const CancellationHistory = () => {
  return (
    <div>
      <h3>Lịch sử đơn hủy</h3>
      <p>Xem lại các đơn hủy trước đây tại đây.</p>
    </div>
  );
};

export default CancellationHistory;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTrashAlt } from "react-icons/fa";
// import "../css/BookingHistory.css"; // dùng lại CSS của booking

// const CancellationHistory = () => {
//   const [cancelledOrders, setCancelledOrders] = useState([]);
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCancelledOrders = async () => {
//       try {
//         const userId = JSON.parse(localStorage.getItem("user"))._id;
//         const response = await fetch(`${apiUrl}/orders/user/${userId}`);
//         const data = await response.json();
//         if (data.success && Array.isArray(data.data)) {
//           const cancelled = data.data.filter((order) => order.status === "Cancelled");
//           setCancelledOrders(cancelled);
//         } else {
//           setCancelledOrders([]);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchCancelledOrders();
//   }, [apiUrl]);

//   return (
//     <div className="booking-history">
//       <h3>Lịch sử đơn hủy</h3>
//       <p>Xem lại các đơn hủy trước đây tại đây.</p>

//       {cancelledOrders.length > 0 ? (
//         cancelledOrders.map((order) => (
//           <div key={order._id} className="order-item form-grid">
//             <div className="order-image">
//               <img
//                 src={order.imageRoom || "../assets/Premium.jpg"}
//                 alt="Room"
//               />
//             </div>
//             <div className="order-details">
//               <h4 className="hotel-name">{order.hotelName || "Tên khách sạn"}</h4>
//               <p>
//                 Phòng: <span className="room-name">{order.roomName}</span>
//               </p>
//               <p>
//                 Giá: <span className="total-price">{order.totalPrice.toLocaleString()} VND</span>
//               </p>
//               <p>
//                 Trạng thái: <span className="status-cancelled">{order.status}</span>
//               </p>
//               <p>
//                 Ngày huỷ: <span className="booking-date">{new Date(order.updatedAt).toLocaleDateString()}</span>
//               </p>
//               <p>
//                 Ghi chú: <span className="note">{order.note || "Không có ghi chú"}</span>
//               </p>
//               <button
//                 className="trash-button"
//                 onClick={() => navigate(`/delete-order/${order._id}`)}
//               >
//                 <FaTrashAlt /> Xoá vĩnh viễn
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>Không có đơn hủy nào.</p>
//       )}
//     </div>
//   );
// };

// export default CancellationHistory;

