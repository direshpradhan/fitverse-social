import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { AddNewPost } from "./features/posts/AddNewPost";
import { PostsListing } from "./features/posts/PostsListing";

function App() {
  return (
    <div className="">
      <Routes>
        <Route to="/" element={<AddNewPost />}>
          <Route to="/" element={<PostsListing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
