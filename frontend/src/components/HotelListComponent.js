import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
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
    starRating: 9.4,
    address: "Thùy Vân, Thành Phố Vũng Tàu",
    pricePerNight: 1105056,
    originalPrice: 1280334,
    discount: "-14%",
    images: [hotel1_1, hotel1_2, hotel1_3],
    amenities: ["Bữa sáng miễn phí", "Hồ bơi", "WiFi miễn phí"],
  },
  {
    name: "Khách Sạn Fusion Suites Vũng Tàu",
    rating: 9.2,
    address: "Trương Công Định, Vũng Tàu",
    pricePerNight: 1340363,
    originalPrice: 1634590,
    discount: "-19%",
    images: [hotel2_1, hotel2_2, hotel2_3],
    amenities: ["View biển", "Gym miễn phí", "Dịch vụ Spa"],
  },
];

const HotelListComponent = ({ filters }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Kích hoạt mũi tên điều hướng
  };

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(
          `http://localhost:8080/v1/api/hotels/filter?${queryParams}`
        );
        const data = await response.json();
        if (data.success) {
          setHotels(data.data);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [filters]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hotel-list">
      {hotels.map((hotel, index) => (
        <div key={index} className="hotel-item">
          <div className="hotel-image-slider">
            <Slider {...sliderSettings}>
              {hotel.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={hotel.name}
                  className="hotel-image"
                />
              ))}
            </Slider>
          </div>
          <div className="hotel-info">
            <h4 className="hotel-name">{hotel.name}</h4>
            <p className="hotel-location">{hotel.address}</p>
            <p className="hotel-rating">
              <span className="rating-badge">{hotel.starRating}</span> Tuyệt vời
            </p>
            <ul className="hotel-features">
              {hotel.amenities.map((feature, featureIndex) => (
                <li key={featureIndex}>✅ {feature}</li>
              ))}
            </ul>
            <div className="hotel-pricing">
              <span className="original-price">
                {hotel.pricePerNight.toLocaleString()}₫
              </span>
              <span className="discounted-price">
                {hotel.pricePerNight.toLocaleString()}₫
              </span>
              {/* <span className="discount">{hotel.discount}</span> */}
            </div>
            <button
              className="book-button"
              onClick={() => navigate(`/hotelInfo?id=${hotel._id}`)}
            >
              Xem phòng
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelListComponent;
