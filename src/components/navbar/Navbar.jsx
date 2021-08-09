import Avatar from "react-avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { SearchUser } from "../../features/search/SearchUser";
// import { logoutUser } from "../../features/authentication/authSlice";

export const Navbar = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const [showSearchModal, setShowSearchModal] = useState(false);
  // useEffect(() => {
  //   setShowSearchModal(false);
  // }, [navigate]);
  return (
    <div className="flex justify-between w-full h-16 items-center shadow-md">
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
      <div className="flex items-center">
        {/* <span
          className="material-icons-outlined"
          onClick={() => setShowSearchModal(() => true)}
        >
          search
        </span> */}
        <Avatar
          name={`${user.firstName} ${user.lastName}`}
          size="40"
          className="rounded-full font-semibold mr-4 cursor-pointer ml-1"
          onClick={() => navigate(`/user/${user.username}`)}
        />
      </div>
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
