import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hotel1_1 from "../assets/hotel1.jpg";
import hotel1_2 from "../assets/hotel2.jpg";
import hotel1_3 from "../assets/hotel3.jpeg";
import hotel2_1 from "../assets/hotel3.jpeg";
import hotel2_2 from "../assets/hotel1.jpg";
import hotel2_3 from "../assets/hotel4.jpg";

const hotels = [
  {
    name: "Khách Sạn ibis Styles Vũng Tàu",
    rating: 9.4,
    location: "Thùy Vân, Thành Phố Vũng Tàu",
    price: 1105056,
    originalPrice: 1280334,
    discount: "-14%",
    images: [hotel1_1, hotel1_2, hotel1_3],
    features: ["Bữa sáng miễn phí", "Hồ bơi", "WiFi miễn phí"],
  },
  {
    name: "Khách Sạn Fusion Suites Vũng Tàu",
    rating: 9.2,
    location: "Trương Công Định, Vũng Tàu",
    price: 1340363,
    originalPrice: 1634590,
    discount: "-19%",
    images: [hotel2_1, hotel2_2, hotel2_3],
    features: ["View biển", "Gym miễn phí", "Dịch vụ Spa"],
  },
];

const HotelListComponent = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Kích hoạt mũi tên điều hướng
  };

  return (
    <div className="hotel-list">
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-item">
          <div className="hotel-image-slider">
            <Slider {...sliderSettings}>
              {hotel.images.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt={hotel.name} className="hotel-image" />
              ))}
            </Slider>
          </div>
          <div className="hotel-info">
            <h4 className="hotel-name">{hotel.name}</h4>
            <p className="hotel-location">{hotel.location}</p>
            <p className="hotel-rating">
              <span className="rating-badge">{hotel.rating}</span> Tuyệt vời
            </p>
            <ul className="hotel-features">
              {hotel.features.map((feature, featureIndex) => (
                <li key={featureIndex}>✅ {feature}</li>
              ))}
            </ul>
            <div className="hotel-pricing">
              <span className="original-price">{hotel.originalPrice.toLocaleString()}₫</span>
              <span className="discounted-price">{hotel.price.toLocaleString()}₫</span>
              <span className="discount">{hotel.discount}</span>
            </div>
            <button className="book-button">Xem phòng</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelListComponent;
