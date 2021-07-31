import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { LikeComponent } from "./Components/LikeComponent";
// import { Link } from "react-router-dom";

export const PostsListing = () => {
  const posts = useSelector((state) => state.posts);

  const navigate = useNavigate();

  return (
    <>
      <section className="mx-6">
        <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2>
        {posts.posts.map((post) => {
          return (
            <article
              key={post.id}
              className="border border-gray-500 my-4 rounded-md px-4"
            >
              <h3 className="font-semibold text-xl ">
                Test User{" "}
                <span className="text-gray-500 text-base font-medium">
                  @testuser
                </span>
              </h3>
              <p
                onClick={() => navigate(`/posts/${post.id}`)}
                className=" mb-6 cursor-pointer"
              >
                {post.content}
              </p>
              <div className="flex items-center gap-2">
                <LikeComponent post={post} />
                <button
                  onClick={() => navigate(`/posts/${post.id}`)}
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
