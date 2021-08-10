import { useNavigate } from "react-router";
// import { SearchUser } from "../../features/search/SearchUser";
// import { logoutUser } from "../../features/authentication/authSlice";

export const Navbar = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between sticky top-0 left-0 right-0 z-10 bg-white w-full h-16 items-center shadow-md md:hidden">
      <h1
        className="text-2xl font-bold pl-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Social
      </h1>
      {/* <button
        className="mr-8 py-1 px-4 text-white bg-gray-700 rounded"
        onClick={() => (token ? dispatch(logoutUser()) : navigate("/login"))}
      >
        {token ? "Logout" : "Login"}
      </button> */}
      {/* <div className="flex items-center">
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size="40"
          className="rounded-full font-semibold mr-4 cursor-pointer ml-1"
          onClick={() => navigate(`/user/${user.username}`)}
        />
      </div> */}
      {/* {showSearchModal && (
        <div
          className="fixed inset-0 mx-auto z-10"
          onClick={() => {
            setShowSearchModal(false);
          }}
        >
          <div
            className="absolute top-1/3 w-full md:left-72 md:w-3/5 bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <SearchUser />
          </div>
        </div>
      )} */}
      {/* <button
        className="mr-8 py-1 px-4 text-white bg-gray-700 rounded"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button> */}
    </div>
  );
};
