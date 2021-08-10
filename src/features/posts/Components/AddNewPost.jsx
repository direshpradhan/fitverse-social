import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "react-avatar";
import { addNewPost } from "../postsSlice";

export const AddNewPost = () => {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");
  const [enableButtonClick, setEnableButtonClick] = useState(false);
  const dispatch = useDispatch();

  const addToPostHandler = (event) => {
    event.preventDefault();
    content && dispatch(addNewPost(content));
    setContent("");
  };

  useEffect(() => {
    content
      ? setEnableButtonClick(() => true)
      : setEnableButtonClick(() => false);
  }, [content]);

  return (
    <div className="flex gap-x-1 border-2 mt-4 rounded-md pl-2 pr-4 pt-2 pb-4 my-0 mx-auto bg-white">
      {/* <Avatar
        name={`${user?.firstName} ${user?.lastName}`}
        size="50"
        className="rounded-full mt-2"
      /> */}
      <form
        onSubmit={(event) => addToPostHandler(event)}
        className="flex flex-col w-full"
      >
        <div className="flex gap-x-2 w-full">
          <Avatar
            name={`${user?.firstName} ${user?.lastName}`}
            size="50"
            className="rounded-full"
          />

          <textarea
            name="postContent"
            placeholder="What's happening?"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="w-full resize-none h-28 p-2 focus:outline-none"
          ></textarea>
        </div>
        <div className="bg-gray-200 h-px my-2"></div>
        <button
          disabled={!enableButtonClick}
          type="submit"
          className="bg-blue-700 px-7 py-1 rounded text-white self-end disabled:opacity-70"
        >
          Post
        </button>
      </form>
    </div>
  );
};
