import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

export const PrivateRoute = ({ path, ...props }) => {
  console.log("entered private route..");
  const { token } = useSelector((state) => state.auth);
  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
