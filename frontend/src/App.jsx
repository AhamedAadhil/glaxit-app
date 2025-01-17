import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Company from "./pages/Company";
import PendingRequests from "./pages/PendingRequests";
import Companies from "./pages/Companies";

import AdminLayout from "./components/layouts/AdminLayout";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={<PrivateRoutes allowedRole="Super Admin" />}
        >
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Admin />} />
            <Route path="pending_requests" element={<PendingRequests />} />
            <Route path="companies" element={<Companies />} />
          </Route>
        </Route>

        <Route
          path="/company"
          element={<PrivateRoutes allowedRole="Company" />}
        >
          <Route path="/company" element={<Company />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}
