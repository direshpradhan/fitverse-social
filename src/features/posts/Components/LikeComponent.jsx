import { useDispatch } from "react-redux";
import { likeButtonClicked } from "../postsSlice";

export function LikeComponent({ post }) {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(likeButtonClicked(post.id))}
      className="flex items-center py-2"
    >
      {post.liked ? (
        <span class="material-icons-outlined mr-1 text-red-600">favorite</span>
      ) : (
        <span class="material-icons-outlined mr-1">favorite_border</span>
      )}
      Like
    </button>
  );
}
