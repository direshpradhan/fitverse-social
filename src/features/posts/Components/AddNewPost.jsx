import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "../postsSlice";

export const AddNewPost = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const addToPostHandler = (event) => {
    event.preventDefault();
    content && dispatch(addNewPost(content));
    setContent("");
  };

  return (
    <div className="w-2/3 my-0 mx-auto">
      <form onSubmit={() => {}} className="flex flex-col">
        <textarea
          name="postContent"
          placeholder="What's happening?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full resize-none mt-4 h-28 mb-2 p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-700 px-7 py-1 rounded text-white self-end"
          onClick={(event) => addToPostHandler(event)}
        >
          Post
        </button>
      </form>
    </div>
  );
};
