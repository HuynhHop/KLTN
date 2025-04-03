import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import Saletable from "../Components/Tourtable";
import { Link } from "react-router-dom";

const ManagerSale = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Sale</span>
            <Link
              to="/admin/sales/saleId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Sale</span>
            </Link>
          </div>
          <Saletable />
        </div>
      </div>
    </div>
  );
};

export default ManagerSale;
