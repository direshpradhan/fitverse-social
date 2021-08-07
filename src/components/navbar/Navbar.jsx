import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { logoutUser } from "../../features/authentication/authSlice";

export const Navbar = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-between w-full h-20 items-center shadow-md">
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

      <Avatar
        name={`${user.firstName} ${user.lastName}`}
        size="40"
        className="rounded-full font-semibold mr-4"
        onClick={() => navigate(`/user/${user.username}`)}
      />
      {/* <button
        className="mr-8 py-1 px-4 text-white bg-gray-700 rounded"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button> */}
    </div>
  );
};
