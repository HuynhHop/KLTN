import React, { useState, useEffect } from "react";
import { FaBell, FaGift, FaUser } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../css/SiteHeader.css"; // Import CSS
import logo from "../assets/image.png"; // Logo

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const User = localStorage.getItem("user");
    if (User) {
      setUser(JSON.parse(User));
    }
  }, []);

  const handleLogout = () => {
    // Xóa thông tin người dùng và token khỏi localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/home");
  };

  const handleNavigate = (path) => {
    setMenuOpen(false); // Đóng menu khi điều hướng
    navigate(path);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Left Section: Logo & Navigation */}
        <div className="left-section">
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} alt="Logo" />
          </div>
          <nav className="nav-links">
            <a href="/resultHotel" className="nav-item">
              Khách sạn
            </a>
            <a href="#" className="nav-item">
              Vé máy bay
            </a>
            <a href="#" className="nav-item">
              Biệt thự, HomeStay
            </a>
          </nav>
        </div>

        {/* Right Section: Icons & Buttons */}
        <div className="right-menu">
          <FaBell className="icon" />
          <FaGift className="icon" />
          {/* <FaUser className="icon" />
          <button className="btn login" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
          <button className="btn signup" onClick={() => navigate("/signup")}>
            Đăng ký
          </button> */}

          {user ? (
            <div className="user-menu">
              <img
                src={user.avatar || "https://via.placeholder.com/40"} // Avatar mặc định nếu không có
                alt="User Avatar"
                className="user-avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              <span className="user-name">{user.fullname || "Người dùng"}</span>
              {menuOpen && (
                <div className="dropdown-menu">
                  <div onClick={() => handleNavigate("/account")}>
                    Tài khoản
                  </div>
                  <div onClick={() => handleNavigate("/favorites")}>
                    Yêu Thích
                  </div>
                  <div onClick={() => handleNavigate("/orders")}>
                    Đơn hàng của tôi
                  </div>
                  <div onClick={handleLogout}>Đăng xuất</div>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="btn login" onClick={() => navigate("/login")}>
                Đăng nhập
              </button>
              <button
                className="btn signup"
                onClick={() => navigate("/signup")}
              >
                Đăng ký
              </button>
            </>
          )}
          <IoMenu
            className="menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#" className="nav-item">
            Khách sạn
          </a>
          <a href="#" className="nav-item">
            Vé máy bay
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
