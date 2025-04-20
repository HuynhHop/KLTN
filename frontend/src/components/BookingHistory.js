import React, { useEffect, useState } from "react";
import "../css/BookingHistory.css";

const BookingHistory = () => {
  const [orders, setOrders] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const response = await fetch(`${apiUrl}/orders/user/${userId}`);
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [apiUrl]);
  const getStatusClass = (status) => {
    switch (status) {
      case "booking_pending":
        return "status-pending";
      case "confirmed":
        return "status-confirmed";
      case "paid":
        return "status-paid";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };
  return (
    <div className="booking-history">
      <h3>Danh sách đơn phòng</h3>
      <p>Xem lại các đơn phòng đã đặt trước đây tại đây.</p>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-item form-grid">
            <div className="order-image">
              <img
                src={order.imageRoom || "../assets/Premium.jpg"}
                alt="Room"
              />
            </div>
            <div className="order-details">
              <h4 className="hotel-name">
                {order.hotelName || "Tên khách sạn"}
              </h4>
              <p>
                Phòng:{" "}
                <span className="room-name">
                  {order.roomName || "Loại phòng"}
                </span>
              </p>
              <p>
                Giá:{" "}
                <span className="total-price">
                  {order.totalPrice.toLocaleString()} VND
                </span>
              </p>
              <p>
                Trạng thái:{" "}
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
              </p>
              <p>
                Ngày đặt:{" "}
                <span className="booking-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                Ghi chú:{" "}
                <span className="note">{order.note || "Không có ghi chú"}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Không có đơn phòng nào.</p>
      )}
    </div>
  );
};

export default BookingHistory;
