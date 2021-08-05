import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { LikeComponent } from "./Components/LikeComponent";
import { addCommentToPost, deleteCommentFromPost } from "./postsSlice";

export const SinglePostPage = () => {
  const { postId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const post = posts.find((post) => post._id === postId);
  const [comment, setComment] = useState("");
  console.log(post);

  return (
    <>
      <article className="border border-gray-500 rounded-md mx-auto my-2 px-4 pb-2 w-1/2">
        <h3 className="font-semibold text-xl">
          Test User{" "}
          <span className="text-gray-500 text-base font-medium">@testuser</span>
        </h3>
        <p className="mb-6">{post?.content}</p>
        <LikeComponent postId={post?._id} />

        <div className="mt-2 border-t border-gray-300 max-h-80 overflow-y-auto">
          {post?.comments?.map((comment) => {
            return (
              <div className="my-2 relative">
                <h3 className="font-semibold text-lg">
                  Test User{" "}
                  <span className="text-gray-500 text-base font-medium">
                    @testuser
                  </span>
                </h3>
                <p>{comment?.comment}</p>
                {comment?.user === user._id && (
                  <span
                    class="material-icons-outlined absolute right-2 top-1 cursor-pointer"
                    onClick={() =>
                      dispatch(
                        deleteCommentFromPost({
                          postId: post._id,
                          commentId: comment?._id,
                        })
                      )
                    }
                  >
                    delete
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 mt-4 mb-2 min-w-full">
          <textarea
            name="post-comment"
            id="post-comment"
            className="w-10/12 h-8 px-2 py-1 resize-none"
            placeholder="Write Something"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
          <button
            onClick={() => {
              console.log("clicked");
              dispatch(addCommentToPost({ postId: post._id, comment }));
              setComment("");
            }}
            className="bg-blue-700 px-4 py-1 rounded text-white self-end"
          >
            Comment
          </button>
        </div>
      </article>
    </>
  );
};
