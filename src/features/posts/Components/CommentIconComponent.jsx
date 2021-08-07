import React from "react";
import { useNavigate } from "react-router";

export const CommentIconComponent = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate(`/posts/${post?._id}`)}
        className="flex items-center gap-1"
      >
        <span class="material-icons-outlined">comment</span>{" "}
        {post?.comments.length} Comments
      </button>
    </div>
  );
};
