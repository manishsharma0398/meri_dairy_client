import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/animals" /> : <Outlet />;
};

export default PublicRoutes;
