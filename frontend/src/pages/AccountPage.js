import React, { useState } from "react";
import AccountManagement from "../components/AccountManagement.js";
import BookingHistory from "../components/BookingHistory";
import FlightHistory from "../components/FlightHistory";
import CancellationHistory from "../components/CancellationHistory";
import "../css/AccountPage.css";

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountManagement />;
      case "booking":
        return <BookingHistory />;
      case "flight":
        return <FlightHistory />;
      case "cancellation":
        return <CancellationHistory />;
      default:
        return <AccountManagement />;
    }
  };

  return (
    <div className="account-page">
      <div className="tabs">
        <div
          className={`tab ${activeTab === "account" ? "active" : ""}`}
          onClick={() => setActiveTab("account")}
        >
          Quản lý tài khoản
        </div>
        <div
          className={`tab ${activeTab === "booking" ? "active" : ""}`}
          onClick={() => setActiveTab("booking")}
        >
          Đơn phòng
        </div>
        <div
          className={`tab ${activeTab === "flight" ? "active" : ""}`}
          onClick={() => setActiveTab("flight")}
        >
          Chuyến bay
        </div>
        <div
          className={`tab ${activeTab === "cancellation" ? "active" : ""}`}
          onClick={() => setActiveTab("cancellation")}
        >
          Đơn hủy
        </div>
      </div>

      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default AccountPage;
