import { useDispatch, useSelector } from "react-redux";
import {
  resetloggedInUserPostsStatus,
  toggleLikeUnlikePost,
} from "../postsSlice";

export function LikeComponent({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isLikedByUser = post?.likes?.find((id) => id === user._id);
  return !isLikedByUser ? (
    <button
      onClick={() => {
        dispatch(toggleLikeUnlikePost(post?._id));
        dispatch(resetloggedInUserPostsStatus());
      }}
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
