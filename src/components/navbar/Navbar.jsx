import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../features/authentication/authSlice";

export const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full h-20 items-center shadow-md">
      <h1 className="text-2xl font-bold pl-6" onClick={() => navigate("/")}>
        Social
      </h1>
      {/* <button
        className="mr-8 py-1 px-4 text-white bg-gray-700 rounded"
        onClick={() => (token ? dispatch(logoutUser()) : navigate("/login"))}
      >
        {token ? "Logout" : "Login"}
      </button> */}
      {!token ? (
        <button
          className="mr-8 py-1 px-4 text-white bg-gray-700 rounded"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      ) : (
        <button
          className="mr-8 py-1 px-4 text-white bg-gray-700 rounded"
          onClick={() => dispatch(logoutUser())}
        >
          Logout
        </button>
      )}
    </div>
  );
};
