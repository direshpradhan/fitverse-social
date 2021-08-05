import { useDispatch, useSelector } from "react-redux";
import { toggleLikeUnlikePost } from "../postsSlice";

export function LikeComponent({ postId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const post = posts.find((post) => post._id === postId);
  const isLikedByUser = post?.likes?.find((id) => id === user._id);
  return !isLikedByUser ? (
    <button
      onClick={() => dispatch(toggleLikeUnlikePost(post?._id))}
      className="flex items-center py-2"
    >
      <span class="material-icons-outlined mr-1">favorite_border</span>
      {post?.likes.length} Likes
    </button>
  ) : (
    <button
      onClick={() => dispatch(toggleLikeUnlikePost(post._id))}
      className="flex items-center py-2"
    >
      <span class="material-icons-outlined mr-1 text-red-600">favorite</span>
      {post?.likes.length} Likes
    </button>
  );
}
