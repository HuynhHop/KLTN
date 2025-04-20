import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HotelHeader from "../components/HotelHeader";
import HotelImages from "../components/HotelImages";
import HotelReviews from "../components/HotelReviews";
// import HotelReview2 from "../components/HotelReviews2";
import HotelAmenities from "../components/HotelAmenities";
import HotelLocation from "../components/HotelLocation";
import Propose from "../components/Propose"; // ✅ Thêm Propose Component
import Modal from "../components/Modal";
import "../css/HotelInfoPage.css";

const HotelInfo = () => {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("id"); // Lấy hotelId từ query string
  const [hotel, setHotel] = useState(null);
  // const [recommendedRooms, setRecommendedRooms] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // Fetch hotel details
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/hotels/${hotelId}`);
        const data = await response.json();
        if (data) {
          setHotel(data);
        }
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    // const fetchRecommendedRooms = async () => {
    //   try {
    //     const response = await fetch(
    //       `${apiUrl}/rooms/hotel/${hotelId}`
    //     );
    //     const data = await response.json();
    //     if (data.success) {
    //       setRecommendedRooms(data.data);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching recommended rooms:", error);
    //   }
    // };

    if (hotelId) {
      fetchHotelDetails();
      // fetchRecommendedRooms();
    }
  }, [hotelId, apiUrl]);

  const openModal = (content) => {
    setModalContent(content);
  };

  // const closeModal = () => {
  //   setModalContent(null);
  // };

  if (!hotel) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hotel-container">
      <HotelHeader hotel={hotel.data} />
      <HotelImages images={hotel.data.images} />
      <div className="hotel-details">
        {/* ✅ Thêm HotelReviews vào */}
        <HotelReviews openModal={openModal} />
        <HotelAmenities
          amenities={hotel.data.amenities}
          openModal={openModal}
        />
        <HotelLocation location={hotel.data.location} openModal={openModal} />
      </div>

      {/* ✅ Thêm danh sách phòng được đề xuất */}
      <Propose
        hotelId={hotelId}
        openModal={(content) => setModalContent(content)}
      />
      {modalContent && (
        <Modal
          content={modalContent}
          closeModal={() => setModalContent(null)}
        />
      )}

      {/* ✅ Thêm HotelReview2 vào dưới cùng
      <HotelReview2 openModal={openModal} />  Hiển thị đánh giá thứ hai */}
    </div>
  );
};

export default HotelInfo;
