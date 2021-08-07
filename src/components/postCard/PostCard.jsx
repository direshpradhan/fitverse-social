import React from "react";
import { useNavigate } from "react-router";
import Avatar from "react-avatar";
import { LikeComponent } from "../../features/posts/Components/LikeComponent";
import { CommentIconComponent } from "../../features/posts/Components/CommentIconComponent";

export const PostCard = ({ post }) => {
  const navigate = useNavigate();
  console.log(post);
  return (
    <>
      <article
        key={post._id}
        className=" flex gap-2 border border-gray-500 my-4 rounded-md px-2 md:px-6 pt-4 pb-2"
      >
        <Avatar
          name={`${post.user.firstName} ${post?.user.lastName}`}
          size="50"
          className="rounded-full cursor-pointer"
          onClick={() => navigate(`/user/${post?.user.username}`)}
        />

        <div>
          <div className="flex">
            <h3
              className="font-semibold text-lg cursor-pointer"
              onClick={() => navigate(`/user/${post?.user.username}`)}
            >
              {post.user.firstName} {post.user.lastName}
            </h3>
            <span className="text-gray-500 text-base ml-1 mt-0.5">
              @{post.user.username}
            </span>
            <span className="text-gray-500 mx-1 mt-0.5">•</span>
            <span className="text-base text-gray-500 mt-0.5">1h</span>
          </div>
          <p
            onClick={() => navigate(`/posts/${post._id}`)}
            className="mb-4 mt-1 cursor-pointer"
          >
            {post.content}
          </p>
          <div className="flex items-center gap-x-4">
            <LikeComponent post={post} />
            <CommentIconComponent post={post} />
          </div>
        </div>
      </article>
    </>
  );
};
