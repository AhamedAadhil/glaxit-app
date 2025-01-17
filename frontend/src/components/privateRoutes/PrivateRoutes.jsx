/* eslint-disable react/prop-types */
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ allowedRole }) => {
  const role = localStorage.getItem("role");

  return role === allowedRole ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
