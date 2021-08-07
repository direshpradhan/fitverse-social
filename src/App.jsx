import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { getLoggedInUser } from "./features/authentication/authSlice";
import { Login } from "./features/authentication/Login";
import { PrivateRoute } from "./features/authentication/PrivateRoute";
import { Signup } from "./features/authentication/Signup";
import { PostsListing } from "./features/posts/PostsListing";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { UserProfilePage } from "./features/users/UserProfilePage";
// import { getAllUsers } from "./features/users/usersSlice";
import { setAxiosHeadersForServiceCalls } from "./utils/setAxiosHeadersForServiceCalls";

function App() {
  const { token, authStatus } = useSelector((state) => state.auth);
  token && setAxiosHeadersForServiceCalls(token);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loggedIn user.....");
    if (authStatus === "idle" && token) {
      dispatch(getLoggedInUser());
    }
  }, [token, dispatch, authStatus]);

  return (
    <div className="">
      {token && <Navbar />}
      <Routes>
        <PrivateRoute path="/" element={<PostsListing />} />
        <PrivateRoute path="/posts/:postId" element={<SinglePostPage />} />
        <PrivateRoute path="user/:username" element={<UserProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
