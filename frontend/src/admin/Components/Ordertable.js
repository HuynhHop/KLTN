import React, { useEffect, useState, useContext } from "react";
import { DarkModeContext } from "../Context/darkModeContext";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import "../Style/lessontable.scss";

const Ordertable = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {}, []);

  const handleDelete = async (id) => {};

  // Cấu hình cột cho DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "lessons",
      headerName: "Lessons",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellScroll">
            {params.row.lessons?.map((lesson) => (
              <div key={lesson._id}>{lesson.title}</div>
            ))}
          </div>
        );
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/admin/orders/${params.row.id}/addorder`}
              style={{ textDecoration: "none" }}
            >
              <div className="addButton">Add Order</div>
            </Link>
            <Link
              to={`/admin/orders/${params.row.id}/edit`}
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

export default Ordertable;
