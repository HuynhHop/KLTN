import React, { useState } from "react";
import { FaBell, FaGift, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import "../css/SiteHeader.css"; // Import CSS
import logo from "../assets/image.png"; // Logo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Left Section: Logo & Navigation */}
        <div className="left-section">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <nav className="nav-links">
            <a href="#" className="nav-item">Khách sạn</a>
            <a href="#" className="nav-item">Vé máy bay</a>
            <a href="#" className="nav-item">Biệt thự, HomeStay</a>
          </nav>
        </div>

        {/* Right Section: Icons & Buttons */}
        <div className="right-menu">
          <FaBell className="icon" />
          <FaGift className="icon" />
          <FaUser className="icon" />
          <button className="btn login">Đăng nhập</button>
          <button className="btn signup">Đăng ký</button>
          <IoMenu className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#" className="nav-item">Khách sạn</a>
          <a href="#" className="nav-item">Vé máy bay</a>
        </div>
      )}
    </header>
  );
};

export default Header;
