import React from "react";
// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Login } from "./features/authentication/Login";
import { AddNewPost } from "./features/posts/AddNewPost";
import { PostsListing } from "./features/posts/PostsListing";
import { SinglePostPage } from "./features/posts/SinglePostPage";

function App() {
  // const { token } = useSelector((state) => state.auth);
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<AddNewPost />}>
          <Route path="/" element={<PostsListing />} />
        </Route>
        <Route path="/posts/:postId" element={<SinglePostPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
