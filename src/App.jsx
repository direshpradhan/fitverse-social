import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
// import { store } from "./app/store";
import { BottomNav } from "./components/bottomNav/BottomNav";
import { Navbar } from "./components/navbar/Navbar";
import { Sidebar } from "./components/sidebar/Sidebar";
import { getLoggedInUser } from "./features/authentication/authSlice";
// import { interceptor } from "./utils/interceptor";
import { Login } from "./features/authentication/Login";
import { PrivateRoute } from "./features/authentication/PrivateRoute";
import { Signup } from "./features/authentication/Signup";
import { PostsListing } from "./features/posts/PostsListing";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { getAllUsers } from "./features/search/searchSlice";
import { SearchUser } from "./features/search/SearchUser";
import { UserProfilePage } from "./features/users/UserProfilePage";
import { setAxiosHeadersForServiceCalls } from "./utils/setAxiosHeadersForServiceCalls";

function App() {
  const { token, authStatus } = useSelector((state) => state.auth);
  const { searchStatus } = useSelector((state) => state.search);
  token && setAxiosHeadersForServiceCalls(token);
  const dispatch = useDispatch();

  // interceptor(store);

  useEffect(() => {
    // console.log("loggedIn user.....");
    if (token) {
      // console.log(authStatus);
      authStatus === "idle" && dispatch(getLoggedInUser());
      searchStatus === "idle" && dispatch(getAllUsers());
    }
  }, [token, dispatch, authStatus, searchStatus]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {token && <Sidebar />}
      {token && <Navbar />}
      <Routes>
        <PrivateRoute path="/" element={<PostsListing />} />
        <PrivateRoute path="/posts/:postId" element={<SinglePostPage />} />
        <PrivateRoute path="user/:username" element={<UserProfilePage />} />
        <PrivateRoute path="/search" element={<SearchUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {token && <BottomNav />}
    </div>
  );
}

export default App;
