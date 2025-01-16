import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Company from "./pages/Company";
import PendingRequests from "./pages/PendingRequests";
import Companies from "./pages/Companies";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/company" element={<Company />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/pending_requests" element={<PendingRequests />} />
        <Route path="/companies" element={<Companies />} />
      </Routes>
      <Toaster />
    </div>
  );
}
