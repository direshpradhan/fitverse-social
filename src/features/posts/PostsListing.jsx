import { useSelector } from "react-redux";

export const PostsListing = () => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);

  return (
    <>
      <section className="mx-6">
        <h2 className="font-bold text-3xl my-4 mb-6">Posts</h2>
        {posts.posts.map((post) => {
          return (
            <article
              key={post.id}
              className="border border-gray-500 my-4 rounded-md"
            >
              <h3 className="font-semibold text-2xl px-4">{post.title}</h3>
              <p className="px-4 mb-6">{post.content}</p>
            </article>
          );
        })}
      </section>
    </>
  );
};
