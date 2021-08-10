import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const SearchUser = () => {
  const { allUsers, searchStatus } = useSelector((state) => state.search);
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const [searchText, setSearchText] = useState("");
  const [usersModal, setUsersModal] = useState(false);
  const navigate = useNavigate();
  console.log(searchText.trim() !== "");
  const searchedUser = allUsers.filter((user) => {
    if (searchText.trim() !== "") {
      const { firstName, lastName, username } = user;
      const fullName = (firstName + " " + lastName).toLowerCase();
      const searchTextLowerCase = searchText.toLowerCase().trim();
      return (
        (username.toLowerCase().includes(searchTextLowerCase) ||
          fullName.toLowerCase().includes(searchTextLowerCase)) &&
        username !== loggedInUser.username
      );
    }
    return [];
  });

  const navigateOnClickHandler = (user) => {
    navigate(`/user/${user.username}`);
    setUsersModal(false);
    setSearchText("");
  };

  useEffect(() => {
    searchText !== "" ? setUsersModal(() => true) : setUsersModal(() => false);
  }, [searchText]);
  return (
    <>
      {searchStatus === "fulfilled" && (
        <div className="w-11/12 md:w-3/5 lg:w-2/3 mx-auto md:ml-72 lg:ml-80 mt-4 md:mt-12 relative">
          <span className="material-icons-outlined absolute right-2 top-1 text-3xl text-gray-500">
            search
          </span>
          <input
            type="search"
            placeholder="Search"
            // value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            className="w-full py-2 pl-4 pr-9 border-2 focus:border-blue-400 focus:outline-none rounded-md"
          />
          {usersModal && (
            <div className="border-2 rounded-md mt-2 px-2 py-1 max-h-80 overflow-y-auto">
              {searchedUser.length !== 0 ? (
                searchedUser.map((user) => {
                  return (
                    <div className="flex my-4">
                      <Avatar
                        size="50"
                        name={`${user.firstName} ${user.lastName}`}
                        className="rounded-full cursor-pointer"
                        onClick={() => navigateOnClickHandler(user)}
                      />
                      <div className="ml-1">
                        <p
                          className="cursor-pointer font-semibold"
                          onClick={() => navigateOnClickHandler(user)}
                        >
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>
                  {console.log("entered..")}
                  {searchText.trim() === "" && usersModal ? (
                    setUsersModal(false)
                  ) : (
                    <div className="flex justify-center items-center h-36">
                      <h2 className="text-xl">
                        {console.log("No users")}
                        {searchStatus === "error"
                          ? "Some error occurred. Please try again later!"
                          : "No users found!"}
                      </h2>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
