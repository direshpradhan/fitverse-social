import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import { PostCard } from "../../components/postCard/PostCard";
import { AddNewPost } from "./Components/AddNewPost";
// import { LikeComponent } from "./Components/LikeComponent";

export const PostsListing = () => {
  const posts = useSelector((state) => state.posts.posts);
  // const navigate = useNavigate();
  console.log(posts);

  return (
    <>
      <AddNewPost />
      <section className="w-2/3 my-0 mx-auto">
        <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2>
        {posts?.map((post) => {
          return <PostCard post={post} />;
        })}
      </section>
    </>
  );
};
