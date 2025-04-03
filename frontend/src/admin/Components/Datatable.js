import React, { useState, useEffect, useContext } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../Config/datatableSource";
import { DarkModeContext } from "../Context/darkModeContext";
import "../Style/datatable.scss";
import { Link } from "react-router-dom";

const Datatable = () => {
  const { darkMode } = useContext(DarkModeContext);

  const [data, setData] = useState([]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton" onClick={() => {}}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        <span>Manager User</span>
        <Link to="/admin/users/userId/new" style={{ textDecoration: "none" }}>
          <span className="link">Add New User</span>
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sx={{
          "& .MuiTablePagination-root": {
            color: darkMode ? "white" : "black",
          },
        }}
      />
    </div>
  );
};

export default Datatable;
