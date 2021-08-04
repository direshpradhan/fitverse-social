import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./features/authentication/Login";
import { PrivateRoute } from "./features/authentication/PrivateRoute";
import { Signup } from "./features/authentication/Signup";
import { AddNewPost } from "./features/posts/AddNewPost";
import { PostsListing } from "./features/posts/PostsListing";
import { SinglePostPage } from "./features/posts/SinglePostPage";

function App() {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="">
      {token && <Navbar />}
      <Routes>
        <PrivateRoute path="/" element={<AddNewPost />}>
          <Route path="/" element={<PostsListing />} />
        </PrivateRoute>
        <PrivateRoute path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
