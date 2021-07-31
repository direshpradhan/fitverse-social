import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { AddNewPost } from "./features/posts/AddNewPost";
import { PostsListing } from "./features/posts/PostsListing";
import { SinglePostPage } from "./features/posts/SinglePostPage";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<AddNewPost />}>
          <Route path="/" element={<PostsListing />} />
        </Route>
        <Route path="/posts/:postId" element={<SinglePostPage />} />
      </Routes>
    </div>
  );
}

export default App;
