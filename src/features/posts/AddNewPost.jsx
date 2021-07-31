import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { postButtonClicked } from "./postsSlice";

export const AddNewPost = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const addToPostHandler = (event) => {
    event.preventDefault();
    content &&
      dispatch(
        postButtonClicked({ id: nanoid(), content, liked: false, comments: [] })
      );
    setContent("");
  };

  return (
    <div className="w-3/4 my-0 mx-auto">
      <form onSubmit={() => {}} className="flex flex-col mx-4">
        <textarea
          name="postContent"
          placeholder="What's happening?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full resize-none mt-4 h-20 mb-2 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-700 px-7 py-1 rounded text-white self-end"
          onClick={(event) => addToPostHandler(event)}
        >
          Post
        </button>
      </form>
      <Outlet />
    </div>
  );
};
