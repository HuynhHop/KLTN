import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Chart from "../Config/Chart";
import List from "../Components/List";
import "../Style/single.scss";

const DetailUser = () => {
  const { userId } = useParams(); // Lấy ID từ URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {}, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <span className="editButton">Edit</span>

            <div className="item">
              <img
                src={userData?.avatar || "/assets/default-avatar.jpg"}
                alt={`${userData?.fullName || "User"}'s avatar`}
                className="itemImg"
              />

              <div className="details">
                <h1 className="itemTitle">
                  {userData?.username || "Unknown Username"}
                </h1>

                <div className="detailItem">
                  <span className="itemKey">Full Name:</span>
                  <span className="itemValue">
                    {userData?.fullname || "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{userData?.email || "N/A"}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{userData?.phone || "N/A"}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{userData?.role || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Users Spending ( Last 6 Months )" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          {/* <List /> */}
        </div>
      </div>
    </div>
  );
};

export default DetailUser;
