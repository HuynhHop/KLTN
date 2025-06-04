import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/HotelCheckout.css";
import { FaPlane } from "react-icons/fa";

const FlightCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const [flight, setFlight] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [passengerInfo, setPassengerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    contactInfo: {},
    passengerInfo: {},
  });
  const [note, setNote] = useState("");
  const [isBookingForOthers, setIsBookingForOthers] = useState(false);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await fetch(`${apiUrl}/flights/${id}`);
        const data = await res.json();
        setFlight(data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu chuyến bay:", err);
      }
    };
    fetchFlight();
  }, [id, apiUrl]);

  const handleContactChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handlePassengerChange = (e) => {
    setPassengerInfo({ ...passengerInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentReturn = useCallback(
    async (success) => {
      if (success) {
        try {
          // const savedFlightNumber = localStorage.getItem("flightNumber");
          // const savedAirline = localStorage.getItem("airline");
          const savedContactInfo = JSON.parse(localStorage.getItem("contactInfo"));
          const savedPassengerInfo = JSON.parse(localStorage.getItem("passengerInfo"));
          const savedNote = localStorage.getItem("note");
          const savedIsBookingForOthers = localStorage.getItem("isBookingForOthers");
          const savedFlightId = localStorage.getItem("flightId");
          const savedPrice = localStorage.getItem("price");
          // const savedImage = localStorage.getItem("image");
          // const savedDeparture = localStorage.getItem("departure");
          // const savedDestination = localStorage.getItem("destination");
          // const savedDepartureTime = localStorage.getItem("departureTime");
          // const savedArrivalTime = localStorage.getItem("arrivalTime");

          // Gọi API tạo Order
          const response = await fetch(`${apiUrl}/order-flight/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: JSON.parse(localStorage.getItem("user"))._id,
              // serviceType: "Flight",
              flight: savedFlightId,
              // airline: savedAirline,
              // flightNumber: savedFlightNumber,
              // departure: savedDeparture,
              // destination: savedDestination,
              // departureTime: savedDepartureTime,
              // arrivalTime: savedArrivalTime,
              // quantity: 1,
              totalPrice: Number(savedPrice.toString().replace(/\./g, "")),
              contactInfo: savedContactInfo,
              passengerInfo: savedIsBookingForOthers === "true" ? savedPassengerInfo : savedContactInfo,
              note: savedNote,
              // image: savedImage,
            }),
          });
          
          const data = await response.json();
          console.log("Flight created:", data);
          if (data.success) {
            alert("Đặt vé thành công!");
            navigate("/account?tab=flight");
          } else {
            alert("Không thể lưu thông tin đặt vé. Vui lòng thử lại!");
            navigate(`/checkout-flight/${savedFlightId}`);
          }
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Có lỗi xảy ra khi lưu thông tin đặt vé!");
        }
      } else {
        const savedFlightId = localStorage.getItem("flightId");
        alert("Thanh toán thất bại. Vui lòng thử lại!");
        navigate(`/checkout-flight/${savedFlightId}`);
      }
      
      // Clear localStorage
      localStorage.removeItem("paymentProcessed");
      localStorage.removeItem("flightNumber");
      localStorage.removeItem("airline");
      localStorage.removeItem("contactInfo");
      localStorage.removeItem("passengerInfo");
      localStorage.removeItem("note");
      localStorage.removeItem("isBookingForOthers");
      localStorage.removeItem("flightId");
      localStorage.removeItem("price");
      localStorage.removeItem("image");
      localStorage.removeItem("departure");
      localStorage.removeItem("destination");
      localStorage.removeItem("departureTime");
      localStorage.removeItem("arrivalTime");
    },
    [apiUrl, navigate]
  );

  useEffect(() => {
    const checkPaymentStatus = () => {
      const params = new URLSearchParams(window.location.search);
      const success = params.get("success");

      if (!localStorage.getItem("paymentProcessed")) {
        if (success === "true") {
          handlePaymentReturn(true);
          localStorage.setItem("paymentProcessed", "true");
        } else if (success === "false") {
          handlePaymentReturn(false);
          localStorage.setItem("paymentProcessed", "true");
        }
      }
    };

    checkPaymentStatus();
  }, [handlePaymentReturn]);

  const handleConfirmPayment = async () => {
    try {
      if (!validateInfo()) {
        alert("Vui lòng điền đầy đủ thông tin trước khi thanh toán!");
        return;
      }

      localStorage.setItem("flightNumber", flight.flightNumber);
      localStorage.setItem("airline", flight.airline);
      localStorage.setItem("contactInfo", JSON.stringify(contactInfo));
      localStorage.setItem("passengerInfo", JSON.stringify(passengerInfo));
      localStorage.setItem("note", note);
      localStorage.setItem("isBookingForOthers", isBookingForOthers);
      localStorage.setItem("flightId", id);
      localStorage.setItem("price", (flight.originalPrice || 0) + (flight.taxPrice || 0));
      localStorage.setItem("image", flight.image);
      localStorage.setItem("departure", flight.departure);
      localStorage.setItem("destination", flight.destination);
      localStorage.setItem("departureTime", flight.departureTime);
      localStorage.setItem("arrivalTime", flight.arrivalTime);

      const response = await fetch(`${apiUrl}/payment/create_payment_url`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(((flight.originalPrice || 0) + (flight.taxPrice || 0)).toString().replace(/\./g, "")),
          bankCode: "",
          language: "vn",
          serviceType: "Flight" // Thêm loại dịch vụ
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Không thể tạo thanh toán. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Có lỗi xảy ra khi xác nhận thanh toán!");
    }
  };

  const validateInfo = () => {
    const newErrors = { contactInfo: {}, passengerInfo: {} };

    // Validate contact info
    if (!contactInfo.fullName) newErrors.contactInfo.fullName = "Bạn chưa nhập Họ và Tên";
    if (!contactInfo.email) newErrors.contactInfo.email = "Bạn chưa nhập Email";
    if (!contactInfo.phone) newErrors.contactInfo.phone = "Bạn chưa nhập Số điện thoại";

    // Validate passenger info if booking for others
    if (isBookingForOthers) {
      if (!passengerInfo.fullName) newErrors.passengerInfo.fullName = "Bạn chưa nhập Họ và Tên";
      if (!passengerInfo.email) newErrors.passengerInfo.email = "Bạn chưa nhập Email";
      if (!passengerInfo.phone) newErrors.passengerInfo.phone = "Bạn chưa nhập Số điện thoại";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors.contactInfo).length === 0 &&
      Object.keys(newErrors.passengerInfo).length === 0
    );
  };

  if (!flight) return <div>Đang tải thông tin chuyến bay...</div>;

  return (
    <div className="checkout-container">
      <div className="left-side">
        {/* Flight Summary */}
        <div className="flight-summary">
          <img src={flight.image} alt="Flight" className="flight-img" />
          <div className="flight-info">
            <h2>{flight.airline} - {flight.flightNumber}</h2>
            <div className="flight-details">
              <div>
                <FaPlane /> <strong>Khởi hành:</strong> {flight.departure} - {new Date(flight.departureTime).toLocaleString("vi-VN")}
              </div>
              <div>
                <FaPlane /> <strong>Đến nơi:</strong> {flight.destination} - {new Date(flight.arrivalTime).toLocaleString("vi-VN")}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="contact-section">
          <h3>Thông tin liên hệ</h3>
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
          Tôi đặt vé cho người khác
        </label>

        {isBookingForOthers && (
          <div className="passenger-section">
            <h3>Thông tin hành khách</h3>
            <div className="form-grid">
              <input
                type="text"
                name="fullName"
                placeholder="Họ và tên"
                value={passengerInfo.fullName}
                onChange={handlePassengerChange}
              />
              {errors.passengerInfo.fullName && (
                <p className="error">{errors.passengerInfo.fullName}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={passengerInfo.email}
                onChange={handlePassengerChange}
              />
              {errors.passengerInfo.email && (
                <p className="error">{errors.passengerInfo.email}</p>
              )}
              <input
                type="tel"
                name="phone"
                placeholder="Số điện thoại"
                value={passengerInfo.phone}
                onChange={handlePassengerChange}
              />
              {errors.passengerInfo.phone && (
                <p className="error">{errors.passengerInfo.phone}</p>
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
            * Lưu ý: Các yêu cầu đặc biệt phụ thuộc vào chính sách của hãng hàng không.
          </p>
        </div>
      </div>

      <div className="right-side">
        {/* Flight Info */}
        <div className="flight-details-card">
          <div className="flight-header">
            <h3>Chi tiết chuyến bay</h3>
          </div>
          <div className="flight-route">
            <div className="route-detail">
              <strong>{flight.departure}</strong>
              <span>{new Date(flight.departureTime).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="route-separator">
              <div className="route-line"></div>
              <FaPlane className="plane-icon" />
            </div>
            <div className="route-detail">
              <strong>{flight.destination}</strong>
              <span>{new Date(flight.arrivalTime).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
          <div className="flight-info-details">
            <p><strong>Hãng hàng không:</strong> {flight.airline}</p>
            <p><strong>Số hiệu chuyến bay:</strong> {flight.flightNumber}</p>
            <p><strong>Thời gian bay:</strong> {Math.floor((new Date(flight.arrivalTime) - new Date(flight.departureTime)) / (1000 * 60 * 60))} giờ</p>
          </div>
        </div>

        {/* Price Details */}
        <div className="price-details">
          <h3>Chi tiết giá</h3>
          <p>
            <span>Giá vé</span>
            <span>{(flight.originalPrice || 0).toLocaleString("vi-VN")}₫</span>
          </p>
          <p>
            <span>Thuế & Phí</span>
            <span>{(flight.taxPrice || 0).toLocaleString("vi-VN")}₫</span>
          </p>
          <p className="total-price">
            <span>Tổng cộng</span>
            <span>
              {((flight.originalPrice || 0) + (flight.taxPrice || 0)).toLocaleString("vi-VN")}₫
            </span>
          </p>
        </div>

        <button className="confirm-button" onClick={handleConfirmPayment}>
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default FlightCheckout;