import React from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const {
    user: { firstName, lastName, username },
  } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const navigateOnClickHandler = () => {
    navigate(`/user/${username}`);
  };
  return (
    <div className="fixed hidden left-0 top-0 h-screen md:w-1/4 lg:w-1/5 flex-col  z-10 bg-gray-50 md:block border-r-2 border-gray-300 rounded-3xl">
      <h1
        className="text-3xl mt-4 font-bold px-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Social
      </h1>
      <div className="mt-28 px-4">
        <NavLink
          end
          to="/"
          activeClassName="bg-gray-400"
          className="flex items-center py-2 pl-4 text-xl mb-3 rounded-3xl hover:bg-gray-200"
        >
          <span class="material-icons-outlined mr-2 text-3xl">home</span>{" "}
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/search"
          activeClassName="bg-gray-400 bg-opacity-80 highlight-none"
          className="flex items-center py-2 pl-4 text-xl mb-3 rounded-full hover:bg-gray-200"
        >
          <span class="material-icons-outlined mr-2 text-3xl">search</span>{" "}
          <span>Search</span>
        </NavLink>
        <NavLink
          to={`user/${username}`}
          activeClassName="bg-gray-400"
          className="flex items-center py-2 pl-4 text-xl mb-3 rounded-full hover:bg-gray-200"
        >
          <span class="material-icons-outlined mr-2 text-3xl">person</span>{" "}
          <span>Profile</span>
        </NavLink>
      </div>

      <div className="flex absolute bottom-4 h-20 border-t border-gray-300 w-full px-6 p-4 hover:bg-gray-200">
        <Avatar
          size="50"
          name={`${firstName} ${lastName}`}
          className="rounded-full cursor-pointer"
          onClick={navigateOnClickHandler}
        />
        <div className="ml-2">
          <p
            className="font-bold text-xl cursor-pointer"
            onClick={navigateOnClickHandler}
          >
            {firstName} {lastName}
          </p>
          <p
            className="text-gray-700 font-semibold cursor-pointer"
            onClick={navigateOnClickHandler}
          >
            @{username}
          </p>
        </div>
      </div>
    </div>
  );
};
