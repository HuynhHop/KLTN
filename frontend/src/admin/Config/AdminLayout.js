import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Screens/Home";
import ManagerUser from "../Screens/ManagerUser";
import DetailUser from "../Screens/DetailUser";
import New from "../Screens/New";
import { DarkModeContext } from "../Context/darkModeContext";
import {
  userInputs,
  tourInputs,
  orderInputs,
  hotelInputs,
  airlineInputs,
  saleInputs,
  vouchersInputs,
  contentInputs,
} from "../Components/formData";
import "../Style/dark.scss";
import { useContext } from "react";
import ManagerTour from "../Screens/ManagerTour";
import ManagerOrder from "../Screens/ManagerOrder";
import ManagerHotel from "../Screens/ManagerHotel";
import ManagerAirline from "../Screens/ManagerAirline";
import ManagerSale from "../Screens/ManagerSale";
import ManagerVouchers from "../Screens/ManagerVouchers";
import ManagerContent from "../Screens/ManagerContent";
import DetailTour from "../Screens/DetailTour";

const AdminLayout = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="users" element={<ManagerUser />} />
        <Route path="users/:userId" element={<DetailUser />} />
        <Route
          path="users/:userId/new"
          element={<New inputs={userInputs} title={"Add New User"} />}
        />

        <Route path="tours" element={<ManagerTour />} />
        <Route path="tours/:tourId/edit" element={<DetailTour />} />
        <Route
          path="tours/:toursId/new"
          element={<New inputs={tourInputs} title={"Add New Tour"} />}
        />

        <Route path="orders" element={<ManagerOrder />} />
        {/* <Route path="orders/:orderId/edit" element={<DetailOrder />} /> */}
        <Route
          path="orders/:orderId/new"
          element={<New inputs={orderInputs} title={"Add New Order"} />}
        />

        <Route path="hotels" element={<ManagerHotel />} />
        {/* <Route path="hotels/:hotelId" element={<DetailHotel />} /> */}
        <Route
          path="hotels/:hotelId/new"
          element={
            <New inputs={hotelInputs} title={"Add New Hotel & Service"} />
          }
        />

        <Route path="airlines" element={<ManagerAirline />} />
        {/* <Route path="airlines/:airlineId/edit" element={<DetailAirline />} /> */}
        <Route
          path="airlines/:airlineId/new"
          element={
            <New inputs={airlineInputs} title={"Add New Airline Ticket"} />
          }
        />

        <Route path="sales" element={<ManagerSale />} />
        {/* <Route path="airlines/:airlineId/edit" element={<DetailAirline />} /> */}
        <Route
          path="sales/:saleId/new"
          element={<New inputs={saleInputs} title={"Add New Sale"} />}
        />

        <Route path="vouchers" element={<ManagerVouchers />} />
        {/* <Route path="airlines/:airlineId/edit" element={<DetailAirline />} /> */}
        <Route
          path="vouchers/:vouchersId/new"
          element={<New inputs={vouchersInputs} title={"Add New Vouchers"} />}
        />

        <Route path="contents" element={<ManagerContent />} />
        {/* <Route path="airlines/:airlineId/edit" element={<DetailAirline />} /> */}
        <Route
          path="contents/:contentId/new"
          element={<New inputs={contentInputs} title={"Add New Content"} />}
        />
      </Routes>
    </div>
  );
};

export default AdminLayout;
