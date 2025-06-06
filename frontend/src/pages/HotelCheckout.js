import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../css/HotelCheckout.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";

const HotelCheckout = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("id"); // Lấy roomId từ URL param
  console.log("Room ID:", roomId); // Kiểm tra roomId
  const hasProcessedRef = useRef(false);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [room, setRoom] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [guestInfo, setGuestInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    contactInfo: {},
    guestInfo: {},
  });
  const [note, setNote] = useState("");
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);

  // Fetch thông tin phòng và khách sạn
  useEffect(() => {
    const fetchRoomAndHotel = async () => {
      try {
        const roomResponse = await fetch(`${apiUrl}/rooms/${roomId}`);
        const roomData = await roomResponse.json();
        if (roomData.success) {
          setRoom(roomData.data);
          // Fetch thông tin khách sạn dựa trên hotelId từ room
          const hotelResponse = await fetch(
            `${apiUrl}/hotels/${roomData.data.hotel._id}`
          );
          const hotelData = await hotelResponse.json();
          if (hotelData.success) {
            setHotel(hotelData.data);
          }
        }
      } catch (error) {
        console.error("Error fetching room and hotel:", error);
      }
    };

    fetchRoomAndHotel();
  }, [roomId, apiUrl]);

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleGuestChange = (e) => {
    setGuestInfo({ ...guestInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentReturn = useCallback(
    async (success) => {
      if (success) {
        try {
          const savedHotelName = localStorage.getItem("hotelName"); // Lấy hotelName từ localStorage
          const savedRoomName = localStorage.getItem("roomName"); // Lấy roomName từ localStorage
          const savedContactInfo = JSON.parse(
            localStorage.getItem("contactInfo")
          );
          const savedGuestInfo = JSON.parse(localStorage.getItem("guestInfo"));
          const savedNote = localStorage.getItem("note");
          const savedIsBookingForOthers =
            localStorage.getItem("isBookingForOthers");
          const savedRoomId = localStorage.getItem("roomId");
          const savedPrice = localStorage.getItem("finalPrice"); // Lấy hotelId từ localStorage
          const savedImage = localStorage.getItem("image"); // Lấy hình ảnh từ localStorage

          console.log("Order request payload:", {
          user: JSON.parse(localStorage.getItem("user"))._id,
          serviceType: "Hotel",
          serviceId: savedRoomId,
          hotelName: savedHotelName,
          roomName: savedRoomName,
          quantity: 1,
          totalPrice: Number(savedPrice.toString().replace(/\./g, "")),
          contactInfo: savedContactInfo,
          guestInfo: savedIsBookingForOthers === "true" && savedGuestInfo ? savedGuestInfo : savedContactInfo,
          note: savedNote,
          imageRoom: savedImage,
        });
          // Gọi API tạo Order
          const response = await fetch(`${apiUrl}/orders/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: JSON.parse(localStorage.getItem("user"))._id,
              serviceType: "Hotel",
              serviceId: savedRoomId,
              hotelName: savedHotelName,
              roomName: savedRoomName,
              quantity: 1,
              totalPrice: Number(savedPrice.toString().replace(/\./g, "")),
              contactInfo: savedContactInfo,
              guestInfo: savedIsBookingForOthers
                ? savedGuestInfo
                : savedContactInfo,
              note: savedNote,
              imageRoom: savedImage,
            }),
          });
          const data = await response.json();
          console.log("Order created:", data);
          if (data.success) {
            alert("Đặt phòng thành công!");
            navigate("/account?tab=booking"); // Chuyển đến trang BookingHistory
          } else {
            alert("Không thể lưu thông tin đặt phòng. Vui lòng thử lại!");
            navigate(`/checkout?id=${savedRoomId}`);
          }
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Có lỗi xảy ra khi lưu thông tin đặt phòng!");
        }
      } else {
        const savedRoomId = localStorage.getItem("roomId");
        alert("Thanh toán thất bại. Vui lòng thử lại!");
        navigate(`/checkout?id=${savedRoomId}`); // Quay lại trang thanh toán
      }
      localStorage.removeItem("paymentProcessed");
      localStorage.removeItem("hotelName"); // Xóa thông tin khỏi localStorage
      localStorage.removeItem("roomName"); // Xóa thông tin khỏi localStorage
      localStorage.removeItem("contactInfo");
      localStorage.removeItem("guestInfo");
      localStorage.removeItem("note");
      localStorage.removeItem("isBookingForOthers");
      localStorage.removeItem("roomId");
      localStorage.removeItem("price");
      localStorage.removeItem("image"); // Xóa thông tin khỏi localStorage
    },
    [apiUrl, navigate]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");

    if (hasProcessedRef.current) return;

    if (success === "true") {
      handlePaymentReturn(true);
      hasProcessedRef.current = true;
    } else if (success === "false") {
      handlePaymentReturn(false);
      hasProcessedRef.current = true;
    }
  }, [handlePaymentReturn]);

  const handleConfirmPayment = async () => {
    try {
      if (!validateInfo()) {
        alert("Vui lòng điền đầy đủ thông tin trước khi thanh toán!");
        return;
      }
      // localStorage.setItem("paymentProcessed", "false"); // Lưu giá phòng vào localStorage
      localStorage.setItem("hotelName", hotel.name); // Lưu tên khách sạn vào localStorage
      localStorage.setItem("roomName", room.name); // Lưu tên loại phòng vào localStorage
      localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
      localStorage.setItem("guestInfo", JSON.stringify(guestInfo));
      localStorage.setItem("note", note);
      localStorage.setItem("isBookingForOthers", isBookingForOthers);
      localStorage.setItem("roomId", roomId);
      localStorage.setItem("price", room.price);
      localStorage.setItem("image", room.images[0]);
      const response = await fetch(`${apiUrl}/payment/create_payment_url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(localStorage.getItem("finalPrice") || room.price),
          bankCode: "",
          language: "vn",
          serviceType: "Hotel"
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Chuyển hướng đến VNPay
      } else {
        alert("Không thể tạo thanh toán. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Có lỗi xảy ra khi xác nhận thanh toán!");
    }
  };

  const validateInfo = () => {
    const newErrors = { contactInfo: {}, guestInfo: {} };

    // Kiểm tra thông tin liên hệ
    if (!contactInfo.fullName)
      newErrors.contactInfo.fullName = "Bạn chưa nhập Họ và Tên";
    if (!contactInfo.email) newErrors.contactInfo.email = "Bạn chưa nhập Email";
    if (!contactInfo.phone)
      newErrors.contactInfo.phone = "Bạn chưa nhập Số điện thoại";

    // Kiểm tra thông tin khách nhận phòng (nếu đặt cho người khác)
    if (isBookingForOthers) {
      if (!guestInfo.fullName)
        newErrors.guestInfo.fullName = "Bạn chưa nhập Họ và Tên";
      if (!guestInfo.email) newErrors.guestInfo.email = "Bạn chưa nhập Email";
      if (!guestInfo.phone)
        newErrors.guestInfo.phone = "Bạn chưa nhập Số điện thoại";
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return (
      Object.keys(newErrors.contactInfo).length === 0 &&
      Object.keys(newErrors.guestInfo).length === 0
    );
  };

  if (!room || !hotel) {
    return <p>Đang tải thông tin...</p>;
  }

  return (
    <div className="checkout-container">
      <div className="left-side">
        {/* Hotel Summary */}
        <div className="hotel-summary">
          <img src={hotel.images[0]} alt="Hotel" className="hotel-img" />
          <div className="hotel-info">
            <h2>{hotel.name}</h2>
            <p className="hotel-address">
              <FaMapMarkerAlt /> {hotel.address}
            </p>

            <div className="booking-summary">
              <div>
                <FaCalendarAlt /> <strong>Nhận phòng:</strong> 15:00, T6, 04
                tháng 4
              </div>
              <div>
                <FaCalendarAlt /> <strong>Trả phòng:</strong> 11:00, T7, 05
                tháng 4
              </div>
              <div>
                <strong>Số đêm:</strong> 01
              </div>
              <div>
                <strong>Số phòng:</strong> 1 x {room.name}
              </div>
              <div>
                <strong>Đủ chỗ ngủ cho:</strong> {room.capacity} người lớn
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="contact-section">
          <div className="form-grid">
            <input
              type="text"
              name="fullName"
              placeholder="Họ và tên"
              value={contactInfo.fullName}
              onChange={handleContactChange}
            />
            {errors.contactInfo.fullName && (
              <p className="error">{errors.contactInfo.fullName}</p>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contactInfo.email}
              onChange={handleContactChange}
            />
            {errors.contactInfo.email && (
              <p className="error">{errors.contactInfo.email}</p>
            )}
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              value={contactInfo.phone}
              onChange={handleContactChange}
            />
            {errors.contactInfo.phone && (
              <p className="error">{errors.contactInfo.phone}</p>
            )}
          </div>
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={isBookingForOthers}
            onChange={(e) => setIsBookingForOthers(e.target.checked)}
          />
          Tôi đặt phòng giúp cho người khác
        </label>

        {isBookingForOthers && (
          <div className="guest-section">
            <h3>Thông tin khách nhận phòng</h3>
            <div className="form-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={guestInfo.fullName}
                onChange={handleGuestChange}
              />
              {errors.contactInfo.fullName && (
                <p className="error">{errors.contactInfo.fullName}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={guestInfo.email}
                onChange={handleGuestChange}
              />
              {errors.contactInfo.email && (
                <p className="error">{errors.contactInfo.email}</p>
              )}
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={guestInfo.phone}
                onChange={handleGuestChange}
              />
              {errors.contactInfo.phone && (
                <p className="error">{errors.contactInfo.phone}</p>
              )}
            </div>
          </div>
        )}
        <div className="special-request">
          <h3>Yêu cầu đặc biệt</h3>
          <textarea
            placeholder="Nhập yêu cầu của bạn..."
            rows="4"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <p className="note">
            * Lưu ý: Các yêu cầu phụ thuộc vào tình trạng phòng khách sạn.
          </p>
        </div>
      </div>
      <div className="right-side">
        {/* Room Info */}
        <div className="room-info">
          <div className="discount-tag">Giảm giá 50%</div>
          <img src={room.images[0]} alt="Room" className="room-img" />
          <h3>{room.name}</h3>
          <ul className="room-details">
            <li> 👥 {room.capacity} Người</li>
            <li> 🛏 {room.beds}</li>
            <li> 🌅 {room.view}</li>
          </ul>
        </div>
        <div className="included">
          <h4>Ưu đãi bao gồm</h4>
          <ul>
            <li>{room.policies.breakfast}</li>
            <li>{room.policies.extra}</li>
          </ul>
        </div>
        {/* Phần giá */}
        <div className="price-details">
          <h3>Chi tiết giá</h3>
          <p>
            Giá gốc:{" "}
            <span className="strikethrough">
              {(Number(localStorage.getItem("price") || room.price).toLocaleString(
                "vi-VN"
              ))}{" "}
              ₫
            </span>
          </p>
          <p>
            Giảm giá còn:{" "}
            <span className="discounted">{Number(localStorage.getItem("discountedPrice"))} ₫</span>
          </p>
          <p>
            Thuế và phí: {" "}
            <span className="service-fee">
              {(Number(room.serviceFee.toString().replace(/\./g, ""))).toLocaleString(
                "vi-VN"
              )}{" "}
              ₫
            </span>
          </p>
          <h4>
            Tổng cộng:{" "}
            <span className="total-price">
              {(Number(localStorage.getItem("finalPrice") || room.price).toLocaleString(
                "vi-VN"
              ))}{" "}
              ₫
            </span>
          </h4>
        </div>

        {/* Nút thanh toán */}
        <button className="confirm-button" onClick={handleConfirmPayment}>
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default HotelCheckout;
