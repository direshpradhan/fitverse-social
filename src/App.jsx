import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { PostsListing } from "./features/posts/PostsListing";

function App() {
  return (
    <div className="">
      <Routes>
        <Route to="/" element={<PostsListing />} />
      </Routes>
    </div>
  );
}

export default App;
