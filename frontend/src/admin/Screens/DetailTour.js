import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Chart from "../Config/Chart";
import List from "../Components/List";
import "../Style/single.scss";

const DetailTour = () => {
  const { tourId } = useParams(); // Lấy ID từ URL
  const [tourData, settourData] = useState(null);
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
              <div className="details">
                <h1 className="itemTitle">
                  {tourData?.packageName || "Unknown Tour"}
                </h1>

                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">
                    {tourData?.description || "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">
                    {tourData?.price ? `${tourData.price} VNĐ` : "N/A"}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Time Duration:</span>
                  <span className="itemValue">
                    {tourData?.timeDuration
                      ? `${tourData.timeDuration} Day`
                      : "N/A"}
                  </span>
                </div>
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
  );
};

export default DetailTour;
