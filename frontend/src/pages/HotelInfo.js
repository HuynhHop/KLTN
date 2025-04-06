import React, { useState } from "react";
import HotelHeader from "../components/HotelHeader";
import HotelImages from "../components/HotelImages";
import HotelReviews from "../components/HotelReviews"; 
import HotelReview2 from "../components/HotelReviews2";
import HotelAmenities from "../components/HotelAmenities";
import HotelLocation from "../components/HotelLocation";
import Propose from "../components/Propose";  // ✅ Thêm Propose Component
import Modal from "../components/Modal";
import "../css/HotelInfoPage.css";

const HotelInfo = () => {
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <div className="hotel-container">
      <HotelHeader />
      <HotelImages />
      <div className="hotel-details">
        {/* ✅ Thêm HotelReviews vào */}
        <HotelReviews openModal={openModal} />  {/* Hiển thị đánh giá khách sạn */}
        <HotelAmenities openModal={openModal} />
        <HotelLocation openModal={openModal} />
      </div>

      {/* ✅ Thêm danh sách phòng được đề xuất */}
      <Propose openModal={openModal} />

      {modalContent && <Modal content={modalContent} closeModal={closeModal} />}

      {/* ✅ Thêm HotelReview2 vào dưới cùng
      <HotelReview2 openModal={openModal} />  Hiển thị đánh giá thứ hai */}
    </div>
  );
};

export default HotelInfo;
