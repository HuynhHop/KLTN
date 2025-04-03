import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import "../Style/managerlesson.scss";
import Contenttable from "../Components/Tourtable";
import { Link } from "react-router-dom";

const ManagerContent = () => {
  return (
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Manager Content</span>
            <Link
              to="/admin/contents/contentId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New Content</span>
            </Link>
          </div>
          <Contenttable />
        </div>
      </div>
    </div>
  );
};

export default ManagerContent;
