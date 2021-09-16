import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "../../components/postCard/PostCard";
import { AddNewPost } from "./Components/AddNewPost";
import { getPostsForLoggedInUser } from "./postsSlice";
import { Loader } from "../../components/loader/Loader";
import { useNavigate } from "react-router";

export const PostsListing = () => {
  const { loggedInUserPosts, loggedInUserPostsStatus } = useSelector(
    (state) => state.posts
  );
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    token ? dispatch(getPostsForLoggedInUser()) : navigate("/login");
  }, [token, dispatch, navigate]);

  const sortedPosts = [...loggedInUserPosts].sort((post1, post2) =>
    post2.createdAt.localeCompare(post1.createdAt)
  );
  console.log(loggedInUserPosts.length);
  console.log(loggedInUserPostsStatus);

  return (
    <>
      <div className="w-11/12 md:w-3/5 lg:w-2/3 mx-auto md:ml-72 lg:ml-80 pb-20 md:pb-8 md:pt-12">
        {loggedInUserPostsStatus === "loading" && (
          // <h2 className="text-center text-2xl font-semibold mt-20 h-screen">
          //   Loading Posts.....
          // </h2>
          <Loader />
        )}
        {loggedInUserPostsStatus === "fulfilled" && (
          <>
            {loggedInUserPosts.length === 0 && <p>No posts to show.</p>}
            <AddNewPost />
            <section className=" mt-12 mx-auto">
              {/* <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2> */}
              {sortedPosts?.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </section>
          </>
        )}
      </div>
    </>
  );
};
