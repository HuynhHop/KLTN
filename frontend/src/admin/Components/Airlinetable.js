import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../Style/lessontable.scss";

const Airlinetable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {}, []);

  const handleDelete = async (id) => {};

  // Cấu hình cột cho DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 250 },
    { field: "registrationDate", headerName: "Registration Date", width: 250 },
    { field: "expirationDate", headerName: "Expiration Date", width: 250 },
    {
      field: "isRenewal",
      headerName: "Renewal",
      width: 150,
      renderCell: (params) => {
        return (
          <div
            className={`cellWithStatus ${params.row.isRenewal} ? 'true' : 'false'`}
          >
            {params.row.isRenewal ? "True" : "False"}
          </div>
        );
      },
    },
    {
      field: "packageInfo",
      headerName: "Package Information",
      width: 250,
      renderCell: (params) => {
        const { packageName } = params.row.packageInfo || {};
        return <div>{packageName}</div>;
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/airlines/${params.row.id}/edit`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Edit</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="productable">
      <Paper className="productContainer">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColumn)}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            "& .MuiTablePagination-root": {
              color: darkMode ? "white" : "black",
            },
          }}
        />
      </Paper>
    </div>
  );
};

export default Airlinetable;
