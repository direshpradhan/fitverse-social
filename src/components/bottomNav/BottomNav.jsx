import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const BottomNav = () => {
  const {
    user: { username },
  } = useSelector((state) => state.auth);
  return (
    <>
      <div>
        <div className="flex w-screen justify-around items-center h-16 bg-gray-50 border-t-2 border-gray-400 border-opacity-50 rounded-3xl fixed bottom-0 md:hidden">
          <NavLink
            end
            to="/"
            activeClassName="bg-gray-500"
            className="rounded-full py-2 px-3 w-auto flex justify-center items-center hover:bg-gray-400"
          >
            <span class="material-icons-outlined text-3xl">home</span>{" "}
          </NavLink>
          <NavLink
            to="/search"
            activeClassName="bg-gray-500"
            className="rounded-full py-2 px-3 w-auto flex justify-center items-center hover:bg-gray-400"
          >
            <span class="material-icons-outlined text-3xl">search</span>{" "}
          </NavLink>
          <NavLink
            to={`user/${username}`}
            activeClassName="bg-gray-500"
            className="rounded-full py-2 px-3 w-auto flex justify-center items-center hover:bg-gray-400"
          >
            <span class="material-icons-outlined text-3xl">person</span>{" "}
          </NavLink>
        </div>
      </div>
    </>
  );
};
