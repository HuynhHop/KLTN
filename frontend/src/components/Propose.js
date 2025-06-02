import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Propose.css";
import RoomDetailModal from "./RoomDetailModal";

const Propose = ({ hotelId }) => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState({});
  const [expandedAmenities, setExpandedAmenities] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${apiUrl}/orders/user/${userId}`);
        const data = await res.json();
        if (data.success) {
          setBookings(data.data);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId, apiUrl]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${apiUrl}/rooms/hotel/${hotelId}`);
        const data = await res.json();
        if (data.success) {
          const updatedRooms = data.data.map((room) => {
            const booking = bookings.find(
              (b) =>
                b.serviceType === "Hotel" &&
                b.serviceId === room._id &&
                b.status === "Paid"
            );

            let timeAgoText = null;
            if (booking) {
              const diffMs = new Date() - new Date(booking.bookingDate);
              const diffMins = Math.floor(diffMs / 60000);
              if (diffMins < 60) {
                timeAgoText = `Đã đặt ${diffMins} phút trước`;
              } else {
                const diffHours = Math.floor(diffMins / 60);
                timeAgoText = `Đã đặt ${diffHours} giờ trước`;
              }
            }

            return {
              ...room,
              timeAgoText,
            };
          });

          setRooms(updatedRooms);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    if (hotelId && bookings) {
      fetchRooms();
    }
  }, [hotelId, bookings, apiUrl]);

  const toggleDetails = (roomId) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  const toggleAmenities = (roomId) => {
    setExpandedAmenities((prev) => ({
      ...prev,
      [roomId]: !prev[roomId],
    }));
  };

  const openModal = async (roomId) => {
    try {
      const response = await fetch(`${apiUrl}/rooms/${roomId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedRoom(data.data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching room details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="propose-container">
      <div className="propose-header">⭐ Được đề xuất</div>
      <div className="propose-list">
        {rooms.map((room) => (
          <div key={room._id} className="propose-content">
            <div className="propose-image">
              <img src={room.images[0]} alt={room.name} />
              <button
                className="propose-view-details"
                onClick={() => openModal(room._id)}
              >
                Xem chi tiết phòng »
              </button>
              {room.timeAgoText && (
                <div className="propose-booking-time">{room.timeAgoText}</div>
              )}
            </div>

            <div className="propose-info">
              <h3>{room.name}</h3>
              <p className="light-text">
                {room.people} | {room.area} | {room.view}
              </p>

              <ul className="bullet-list">
                <li>✅ Hoàn huỷ một phần</li>
                <li>✅ Giá đã bao gồm bữa sáng</li>
                <li>⚠️ Xác nhận trong 15 phút</li>
              </ul>

              <div className="propose-advantages">
                <div
                  className="advantage-frame"
                  onClick={() => toggleDetails(room._id)}
                >
                  <p>
                    <b>Ưu đãi bao gồm:</b> {room.policies?.extra || "Ăn sáng"}
                  </p>
                  <p>
                    <b>Thông tin bổ sung:</b>{" "}
                    {room.policies?.cancellation ||
                      "Đặt phòng không đổi tên khách"}
                  </p>
                </div>

                {expandedDetails[room._id] && (
                  <div className="room-details">
                    <p>
                      <b>Chính sách hủy:</b> {room.policies?.cancellation}
                    </p>
                    <p>
                      <b>Bữa ăn:</b> {room.policies?.breakfast}
                    </p>
                    <p>
                      <b>Xác nhận:</b> {room.policies?.confirmation}
                    </p>
                    <p>
                      <b>Hóa đơn:</b> {room.policies?.invoice}
                    </p>
                    <p>
                      <b>Ưu đãi:</b> {room.policies?.extra}
                    </p>
                    <p>
                      <b>Thông tin bổ sung:</b> Đặt phòng không đổi tên khách
                    </p>
                  </div>
                )}
              </div>

              <div className="propose-amenities">
                {room.amenities.slice(0, 3).map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
                {room.amenities.length > 3 && (
                  <span
                    className="more-amenities"
                    onClick={() => toggleAmenities(room._id)}
                  >
                    {expandedAmenities[room._id]
                      ? "Ẩn tiện ích"
                      : `+ ${room.amenities.length - 3} tiện ích`}
                  </span>
                )}
                {expandedAmenities[room._id] && (
                  <div className="full-amenities">
                    {room.amenities.slice(3).map((item, i) => (
                      <span key={i}>{item}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="propose-bed">
              <p>{room.beds}</p>
            </div>

            <div className="propose-pricing">
              <p className="old-price">
                -18% <s>{room.price}₫</s>
              </p>
              <p className="discounted-price">{room.discountedPrice}₫</p>
              <p className="coupon">
                Nhập mã: <b>{room.coupon || "MYTOUR8"}</b>
              </p>
              <p className="final-price">{room.finalPrice}₫</p>
              <p className="total-price">Giá cuối cùng {room.finalPrice}₫</p>
              <button
                className="book-btn"
                onClick={() => navigate(`/checkout?id=${room._id}`)}
              >
                Đặt phòng
              </button>
              <p className="cashback">Hoàn {room.cashback}₫ vào Cash</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedRoom && (
        <RoomDetailModal room={selectedRoom} onClose={closeModal} />
      )}
    </div>
  );
};

export default Propose;
