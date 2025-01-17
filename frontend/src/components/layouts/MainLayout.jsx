import { Outlet } from "react-router-dom";
import SideNavbar from "../SideNavbar";
import TopNavbar from "../TopNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* SideNavbar (left sidebar) */}
      <SideNavbar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Added ml-64 to give space for the sidebar */}
        {/* TopNavbar */}
        <TopNavbar />
        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
