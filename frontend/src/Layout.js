import { Outlet, useLocation } from "react-router-dom"
import SiteHeader from "./components/SiteHeader";
function Layout() {
  const location = useLocation()
  const hideHeaderPaths = ["/login", "/signup"] // Các đường dẫn không hiển thị Header

  return (
    <div>
      {!hideHeaderPaths.includes(location.pathname) && <SiteHeader />}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
