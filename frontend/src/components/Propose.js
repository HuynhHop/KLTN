import React, { useState, useEffect } from "react";
import "../css/Propose.css";
import RoomDetailModal from "./RoomDetailModal";

const Propose = (hotelId) => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // Trạng thái để hiển thị chi
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/rooms/hotel/${hotelId.hotelId}`
        );
        const data = await response.json();
        if (data.success) {
          setRooms(data.data);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    if (hotelId) {
      fetchRooms();
    }
  }, [hotelId]);

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

  const room = {
    name: "Premium Deluxe Twin Room",
    people: "2 người",
    maxPeople: "4",
    standardPeople: "2",
    area: "50 m² / 538 ft²",
    view: "Hướng Vườn",
    beds: "2 Giường đơn",
    priceOld: "2.560.667 ₫",
    priceDiscounted: "2.114.020 ₫",
    coupon: "DEALVUI25",
    finalPrice: "1.944.898 ₫",
    finalTotal: "2.228.878 ₫",
    cashback: "Hoàn 22.288 ₫ vào Mytour Cash",
    images: [
      "https://lottecityhotel.jp/assets/images/room/premium_deluxe_twin/mv_slide01_pc.jpg",
      "https://lottecityhotel.jp/assets/images/room/premium_deluxe_twin/mv_slide02_pc.jpg",
      "https://lottecityhotel.jp/assets/images/room/premium_deluxe_twin/mv_slide03_pc.jpg",
    ],
    amenities: [
      "Điều hòa nhiệt độ",
      "Sàn gỗ",
      "Tivi màn hình phẳng",
      "Dép đi trong nhà",
      "Tủ",
      "Minibar",
      "Két an toàn",
      "Dọn phòng hàng ngày",
      "Ấm đun nước điện",
      "Máy sấy tóc",
      "Giá treo quần áo",
      "Bàn là",
      "Khăn tắm",
      "Cửa sổ",
      "Điện thoại",
      "Không hút thuốc",
      "Đồ vệ sinh cá nhân miễn phí",
      "Truyền hình cáp",
      "Phòng tắm riêng",
      "Bình nước nóng",
      "Tivi",
      "Wifi miễn phí",
      "Vòi hoa sen",
      "Trà, cà phê miễn phí",
      "Nước suối miễn phí",
      "Kệ để hành lý",
      "Tủ quần áo",
      "Truyền hình vệ tinh",
      "Dịch vụ báo thức",
    ],
  };

  return (
    <div className="propose-container">
      <div className="propose-header">⭐ Được đề xuất</div>
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
          </div>

          <div className="propose-info">
            <h3>{room.name}</h3>
            <p className="light-text">
              {room.people} | {room.area} | {room.view}
            </p>
            {/* <p className="recent-booked">🔥 Vừa được đặt 3 giờ trước</p> */}
            <ul className="bullet-list">
              <li>✅ Hoàn huỷ một phần</li>
              <li>✅ Giá đã bao gồm bữa sáng</li>
              <li>⚠️ Xác nhận trong 15 phút</li>
              <p className="old-price">
                -18% <s>{room.price}</s>
              </p>
              <p className="discounted-price">{room.price}</p>
              <p className="final-price">{room.price}</p>
            </ul>

            {/* Khung hiển thị "Ưu đãi bao gồm" và "Thông tin bổ sung" */}
            <div className="propose-advantages">
              <div
                className="advantage-frame"
                onClick={() => setShowDetails(!showDetails)}
              >
                <p>
                  <b>Ưu đãi bao gồm:</b> Ăn sáng
                </p>
                <p>
                  <b>Thông tin bổ sung:</b> Đặt phòng không đổi tên khách
                </p>
              </div>
            </div>

            {/* Hiển thị chi tiết khi nhấn vào phần "Ưu đãi bao gồm" */}
            {/* {showDetails && (
              <div className="room-details">
                <p>
                  <b>Chính sách hủy:</b> Bạn sẽ được hoàn 52.000 ₫ nếu hủy phòng
                  trước 15:00 ngày 04/04/2025. Bạn sẽ không được hoàn tiền nếu
                  hủy phòng từ 15:00 ngày 04/04/2025.
                </p>
                <p>
                  <b>Bữa ăn:</b> Giá đã bao gồm bữa sáng
                </p>
                <p>
                  <b>Xác nhận:</b> Phòng này có mức giá rất rẻ nên đang bán rất
                  chạy. Để đảm bảo bạn có được ưu đãi này, chúng tôi cần khách
                  sạn xác nhận còn phòng hay không. Khách sạn thường xác nhận
                  yêu cầu đặt phòng trong vòng 15 phút. Nếu yêu cầu đặt phòng
                  của bạn không thể xác nhận, chúng tôi sẽ hoàn tiền đầy đủ.
                </p>
                <p>
                  <b>Hóa đơn:</b> An tâm đặt phòng, Mytour hỗ trợ xuất hoá đơn
                  nhanh chóng, tiết kiệm thời gian cho bạn.
                </p>
                <p>
                  <b>Ưu đãi:</b> Ăn sáng
                </p>
                <p>
                  <b>Thông tin bổ sung:</b> Đặt phòng không đổi tên khách
                </p>
              </div>
            )} */}

            {showDetails && (
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

            <div className="propose-amenities">
              {room.amenities.slice(0, 3).map((item, i) => (
                <span key={i}>{item}</span>
              ))}
              <span
                className="more-amenities"
                onClick={() => setShowMoreAmenities(!showMoreAmenities)}
              >
                {showMoreAmenities
                  ? "Ẩn tiện ích"
                  : `+ ${room.amenities.length - 3} tiện ích`}
              </span>

              {/* Hiển thị thêm tiện ích nếu trạng thái showMoreAmenities là true */}
              {showMoreAmenities && (
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
              -18% <s>{room.price}</s>
            </p>
            <p className="discounted-price">{room.price}</p>
            <p className="coupon">
              Nhập mã:
              {/* <b>{room.coupon}</b> (-8%) */}
            </p>
            <p className="final-price">{room.price}</p>
            <p className="total-price">Giá cuối cùng {room.price}</p>
            <button className="book-btn">Đặt phòng</button>
            <p className="cashback">Hoàn {room.cashback} vào Cash</p>
          </div>
        </div>
      ))}
      {isModalOpen && selectedRoom && (
        <RoomDetailModal room={selectedRoom} onClose={closeModal} />
      )}
    </div>
  );
};

export default Propose;
