import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import Tourtable from "../Components/Tourtable";
import { Link } from "react-router-dom";

const ManagerTour = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Tour</span>
            <Link
              to="/admin/tours/tourId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Tour</span>
            </Link>
          </div>
          <Tourtable />
        </div>
      </div>
    </div>
  );
};

export default ManagerTour;
