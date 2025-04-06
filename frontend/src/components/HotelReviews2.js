import React from "react";
import "../css/HotelReview2.css";
import { FaStar, FaCalendarAlt } from "react-icons/fa";

const HotelReviews2 = ({ closeModal }) => {
  return (
    <>
      <div className="modal-header">
        <h2>Đánh giá</h2>
        <button className="close-btn" onClick={closeModal}>×</button>
      </div>

      <div className="review-summary">
        <div className="score-circle">
          <div className="score">9.2</div>
          <p>Tuyệt vời</p>
        </div>

        <div className="score-breakdown">
          <p>Tuyệt vời: 252</p>
          <p>Xuất sắc: 47</p>
          <p>Tốt: 15</p>
          <p>Trung bình: 8</p>
          <p>Kém: 7</p>
        </div>

        <div className="score-criteria">
          <p>Vị trí: <strong>9.6</strong></p>
          <p>Giá cả: <strong>9.2</strong></p>
          <p>Phục vụ: <strong>9.4</strong></p>
          <p>Vệ sinh: <strong>9.2</strong></p>
          <p>Tiện nghi: <strong>9.2</strong></p>
        </div>
      </div>

      <div className="review-filters">
        <button className="active">Tất cả (375)</button>
        <button>Cặp đôi (81)</button>
        <button>Gia đình (156)</button>
        <button>Bạn bè (15)</button>
        <button>Du lịch một mình (36)</button>
      </div>

      <div className="review-list">
        <div className="review-card">
          <div className="review-avatar">GG</div>
          <div className="review-content">
            <h4>Group GMC</h4>
            <div className="meta">
              <span><FaCalendarAlt /> 28/03/2025</span>
              <span>1 đêm • Premium Double • Du lịch một mình</span>
            </div>
            <div className="rating">10 <FaStar color="crimson" /> Tuyệt vời</div>
            <p>View đẹp, mát mẻ, nhân viên lịch sự</p>
          </div>
        </div>

        <div className="review-card">
          <div className="review-avatar">A</div>
          <div className="review-content">
            <h4>Anonymous</h4>
            <div className="meta">
              <span><FaCalendarAlt /> 27/03/2025</span>
              <span>2 đêm • Premium Double • Cặp đôi</span>
            </div>
            <div className="rating">10 <FaStar color="crimson" /> Tuyệt vời</div>
            <p>Phòng đẹp, phục vụ lịch sự, chuyên nghiệp. Món ăn sáng phong phú! Thích!</p>
            <div className="photo-preview">
              <img src="../asssets/review1.jpg" alt="Review" />
              <img src="../asssets/review2.jpg" alt="Review" />
              <img src="../asssets/review3.jpg" alt="Review" />
              <img src="../asssets/review4.jpg" alt="Review" />
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

export default HotelReviews2;
