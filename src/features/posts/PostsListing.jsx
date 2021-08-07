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
      {postStatus === "loading" && posts.length === 0 && (
        <h2 className="text-center text-2xl font-semibold mt-20">
          Loading Posts.....
        </h2>
      )}
      {(postStatus === "fulfilled" || postStatus === "loading") && (
        <section className="w-11/12 mt-12 mx-auto md:w-2/5 lg:w-2/5">
          {/* <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2> */}
          {posts?.map((post) => {
            return <PostCard post={post} />;
          })}
        </section>
      )}
    </>
  );
};
