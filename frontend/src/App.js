import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";
import Home from "./pages/Home";
import HotelSearchResults from "./components/HotelSearchResults";
import AdminLayout from "./admin/Config/AdminLayout";
// import HotelInfo from "./components/HotelInfo";

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          {/* Routes có Header */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/resultHotel" element={<HotelSearchResults />} />
            {/* <Route path="/hotelInfo" element={<HotelInfo />} /> */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
export default App;
// // export default App
// import SiteHeader from "./components/SiteHeader";

// function App() {
//   return (
//     <div>
//       <SiteHeader />
//       {/* Các component khác */}
//     </div>
//   );
// }

// export default App;
