import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AddNewPost } from "./Components/AddNewPost";
import { LikeComponent } from "./Components/LikeComponent";

export const PostsListing = () => {
  const posts = useSelector((state) => state.posts.posts);
  const navigate = useNavigate();
  console.log(posts);

  return (
    <>
      <AddNewPost />
      <section className="w-2/3 my-0 mx-auto">
        <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2>
        {posts?.map((post) => {
          return (
            <article
              key={post._id}
              className="border border-gray-500 my-4 rounded-md px-4"
            >
              <h3 className="font-semibold text-xl ">
                Test User{" "}
                <span className="text-gray-500 text-base font-medium">
                  @testuser
                </span>
              </h3>
              <p
                onClick={() => navigate(`/posts/${post._id}`)}
                className=" mb-6 cursor-pointer"
              >
                {post.content}
              </p>
              <div className="flex items-center gap-2">
                <LikeComponent postId={post._id} />
                <button
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="flex items-center gap-1"
                >
                  <span class="material-icons-outlined">comment</span> Comment
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};
