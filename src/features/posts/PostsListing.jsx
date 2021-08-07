import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { PostCard } from "../../components/postCard/PostCard";
import { AddNewPost } from "./Components/AddNewPost";
import { getAllPosts } from "./postsSlice";
// import { LikeComponent } from "./Components/LikeComponent";

export const PostsListing = () => {
  const { posts, postStatus } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(posts);

  useEffect(() => {
    console.log("All posts....");
    if (postStatus === "idle" && token) {
      dispatch(getAllPosts());
    }
  }, [token, dispatch, postStatus]);

  return (
    <>
      <AddNewPost />
      {postStatus === "loading" && (
        <h2 className="text-center text-2xl font-semibold mt-20">
          Loading.....
        </h2>
      )}
      {postStatus === "fulfilled" && (
        <section className="w-2/3 my-0 mx-auto">
          <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2>
          {posts?.map((post) => {
            return <PostCard post={post} />;
          })}
        </section>
      )}
    </>
  );
};
