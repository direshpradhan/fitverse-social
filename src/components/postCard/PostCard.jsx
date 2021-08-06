import React from "react";
import { useNavigate } from "react-router";
import { LikeComponent } from "../../features/posts/Components/LikeComponent";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  return (
    <>
      <article
        key={post._id}
        className="border border-gray-500 my-4 rounded-md px-4"
      >
        <h3 className="font-semibold text-xl ">
          Test User{" "}
          <span className="text-gray-500 text-base font-medium">@testuser</span>
        </h3>
        <p
          onClick={() => navigate(`/posts/${post._id}`)}
          className=" mb-6 cursor-pointer"
        >
          {post.content}
        </p>
        <div className="flex items-center gap-2">
          <LikeComponent postId={post._id} />
          <button
            onClick={() => navigate(`/posts/${post._id}`)}
            className="flex items-center gap-1"
          >
            <span class="material-icons-outlined">comment</span> Comment
          </button>
        </div>
      </article>
    </>
  );
};
