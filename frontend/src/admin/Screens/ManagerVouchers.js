import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import Voucherstable from "../Components/Tourtable";
import { Link } from "react-router-dom";

const ManagerVouchers = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Tour</span>
            <Link
              to="/admin/vouchers/vouchersId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Vouchers</span>
            </Link>
          </div>
          <Voucherstable />
        </div>
      </div>
    </div>
  );
};

export default ManagerVouchers;
