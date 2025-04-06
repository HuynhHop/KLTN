import React from "react";
import "../css/HotelCheckout.css";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import hotelImg from "../assets/hotel1.jpg";
import roomImg from "../assets/hotel2.jpg";

const HotelCheckout = () => {
  return (
    <div className="checkout-container">
      <div className="left-side">
        {/* Hotel Summary */}
        <div className="hotel-summary">
        <img src={hotelImg} alt="Hotel" className="hotel-img" />
          <div className="hotel-info">
            <h2>Khách Sạn ibis Styles Vũng Tàu</h2>
            <p className="hotel-address">
              <FaMapMarkerAlt /> 117 Thùy Vân, TP Vũng Tàu, Bà Rịa Vũng Tàu
            </p>

            <div className="booking-summary">
              <div><FaCalendarAlt /> <strong>Nhận phòng:</strong> 15:00, T6, 04 tháng 4</div>
              <div><FaCalendarAlt /> <strong>Trả phòng:</strong> 11:00, T7, 05 tháng 4</div>
              <div><strong>Số đêm:</strong> 01</div>
              <div><strong>Số phòng:</strong> 1 x Premium Twin</div>
              <div><strong>Đủ chỗ ngủ cho:</strong> 2 người lớn</div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="contact-section">
          <h3>Thông tin liên hệ</h3>
          <div className="form-grid">
            <input type="text" placeholder="Họ và tên" />
            <input type="text" placeholder="Quốc tịch" />
            <input type="email" placeholder="Email" />
            <input type="tel" placeholder="Số điện thoại" />
          </div>
          <label className="checkbox">
            <input type="checkbox" /> Tôi đặt phòng giúp cho người khác
          </label>
        </div>

        {/* Special Request */}
        <div className="special-request">
          <h3>Yêu cầu đặc biệt</h3>
          <textarea placeholder="Nhập yêu cầu của bạn..." rows="4" />
          <p className="note">
            * Lưu ý: Các yêu cầu phụ thuộc vào tình trạng phòng khách sạn.
          </p>
        </div>
      </div>

      <div className="right-side">
        {/* Room Info */}
        <div className="room-info">
          <div className="discount-tag">Giảm giá 51%</div>
          <img src={roomImg} alt="Room" className="room-img" />
          <h3>Premium Twin</h3>
          <ul className="room-details">
            <li>👥 2 người</li>
            <li>🛏 2 Giường đơn</li>
            <li>🌅 Hướng biển, Ban công</li>
            <li>🚫 Không hỗ trợ hoàn huỷ</li>
            <li style={{ color: "green" }}>✅ Giá đã bao gồm bữa sáng</li>
            <li>⏳ Xác nhận trong 15 phút</li>
          </ul>

          <div className="included">
            <h4>Ưu đãi bao gồm</h4>
            <ul>
              <li>Bữa sáng cho 2 người lớn và 1 trẻ dưới 12 tuổi</li>
              <li>Wifi miễn phí, không tính phụ thu</li>
              <li>Chỉ áp dụng với khách từ Việt Nam, Hàn, Nhật, Nga,...</li>
            </ul>
          </div>
        </div>

        {/* Phần giá */}
        <div className="price-details">
        <h3>Chi tiết giá</h3>
        <p>Giá gốc: <span className="strikethrough">2.500.000 ₫</span></p>
        <p>Giảm giá: <span className="discounted">1.225.000 ₫</span></p>
        <p>Thuế và phí: <strong>200.000 ₫</strong></p>
        <h4>Tổng cộng: <span className="total-price">1.425.000 ₫</span></h4>
        </div>

        {/* Nút thanh toán */}
        <button className="confirm-button">Xác nhận thanh toán</button>
      </div>
    </div>
  );
};

export default HotelCheckout;
