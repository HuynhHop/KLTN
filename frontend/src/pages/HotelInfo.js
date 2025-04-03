import React, { useState } from "react";
import HotelHeader from "../components/HotelHeader";
import HotelImages from "../components/HotelImages";
import HotelReviews from "../components/HotelReviews";
import HotelAmenities from "../components/HotelAmenities";
import HotelLocation from "../components/HotelLocation";
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
        <HotelReviews openModal={openModal} />
        <HotelAmenities openModal={openModal} />
        <HotelLocation openModal={openModal} />
      </div>

      {modalContent && <Modal content={modalContent} closeModal={closeModal} />}
    </div>
  );
};

export default HotelInfo;
