import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import voucher1 from "../assets/voucher1.jpg";
import voucher2 from "../assets/voucher2.jpg";
import voucher3 from "../assets/voucher3.jpg";

const vouchers = [
  { id: 1, img: voucher1 },
  { id: 2, img: voucher2 },
  { id: 3, img: voucher3 },
];

const VoucherCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div className="voucher-carousel" style={{ maxWidth: "95%", margin: "auto", padding: "20px 0" }}>
      <Slider {...settings}>
        {vouchers.map((voucher) => (
          <div key={voucher.id} style={{ padding: "0 10px" }}> {/* Khoảng cách giữa các voucher */}
            <img
              src={voucher.img}
              alt={`Voucher ${voucher.id}`}
              style={{
                width: "90%",   // Điều chỉnh kích thước ảnh
                height: "150px", // Giảm chiều cao
                objectFit: "cover", // Cắt ảnh phù hợp
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Tạo bóng cho voucher
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VoucherCarousel;
