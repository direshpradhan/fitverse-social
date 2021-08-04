import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router";

export const PrivateRoute = ({ path, ...props }) => {
  const { token } = useSelector((state) => state.auth);
  return token ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
