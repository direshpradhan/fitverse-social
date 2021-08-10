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

  useEffect(() => {
    if (postStatus === "idle" && token) {
      dispatch(getAllPosts());
    }
  }, [token, dispatch, postStatus]);

  const sortedPosts = [...posts].sort((post1, post2) =>
    post2.createdAt.localeCompare(post1.createdAt)
  );

  return (
    <>
      <div className="w-11/12 md:w-3/5 lg:w-2/3 mx-auto md:ml-72 lg:ml-80 pb-20 md:pb-8 md:pt-12">
        <AddNewPost />
        {postStatus === "loading" && posts.length === 0 && (
          <h2 className="text-center text-2xl font-semibold mt-20 h-screen">
            Loading Posts.....
          </h2>
        )}
        {(postStatus === "fulfilled" || postStatus === "loading") && (
          <section className=" mt-12 mx-auto">
            {/* <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2> */}
            {sortedPosts?.map((post) => {
              return <PostCard post={post} />;
            })}
          </section>
        )}
      </div>
    </>
  );
};
