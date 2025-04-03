import React from "react";
import mainImage from "../assets/hotel3.jpeg";
import img1 from "../assets/hotel1.jpg";
import img2 from "../assets/hotel2.jpg";
import img3 from "../assets/hotel4.jpg";

const HotelImages = () => {
  return (
    <div className="hotel-images">
      <img src={mainImage} alt="Main" className="main-image" />
      <div className="image-gallery">
        <img src={img1} alt="1" />
        <img src={img2} alt="2" />
        <img src={img3} alt="3" />
        <div className="more-images">+142 Ảnh</div>
      </div>
    </div>
  );
};

export default HotelImages;
