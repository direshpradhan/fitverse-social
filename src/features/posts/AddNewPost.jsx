import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { postButtonClicked } from "./postsSlice";

export const AddNewPost = () => {
  const [content, setContent] = useState();
  const dispatch = useDispatch();

  const addToPostHandler = (event) => {
    event.preventDefault();
    content && dispatch(postButtonClicked({ id: nanoid(), content }));
    setContent("");
  };

  return (
    <div>
      <form onSubmit={() => {}} className="flex">
        <textarea
          name="postContent"
          placeholder="What's happening?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-1/2 mt-4 mx-4 border border-gray-900 h-20"
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
