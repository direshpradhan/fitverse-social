import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { PostCard } from "../../components/postCard/PostCard";
import { logoutUser } from "../authentication/authSlice";
import { UserSuggestion } from "./UserSuggestion";
import {
  followButtonClicked,
  // getPostsByUsername,
  getUserByUsername,
  resetUser,
  unfollowButtonClicked,
} from "./usersSlice";
import { Modal } from "./components/Modal";
import { getAllPosts } from "../posts/postsSlice";
import { Loader } from "../../components/loader/Loader";

export const UserProfilePage = () => {
  const { username } = useParams();
  const { user, posts, userStatus } = useSelector((state) => state.users);
  const { allPosts, allPostsStatus } = useSelector((state) => state.posts);
  const { user: loggedInUser, token } = useSelector((state) => state.auth);
  const isFollowed = user?.followers.find(
    (user) => user._id === loggedInUser._id
  );
  const dispatch = useDispatch();
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const navigate = useNavigate();

  const postsByUsername = allPosts.filter(
    (post) => post.user.username === username
  );
  // console.log(allPosts);
  const sortedPosts = [...postsByUsername].sort((post1, post2) =>
    post2.createdAt.localeCompare(post1.createdAt)
  );

  const followUnfollowHandler = () => {
    if (isFollowed) {
      dispatch(unfollowButtonClicked(user?._id));
    } else {
      dispatch(followButtonClicked(user?._id));
    }
  };

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(getUserByUsername(username));
      allPostsStatus === "idle" && dispatch(getAllPosts());
      // dispatch(getPostsByUsername(username));
      // dispatch(getLoggedInUser());
    }
    setShowFollowersModal(false);
    setShowFollowingModal(false);

    if (!token) {
      navigate("/login");
    }

    return () => {
      userStatus === "fulfilled" && dispatch(resetUser());
    };
  }, [userStatus, dispatch, username, allPostsStatus, navigate, token]);

  return (
    <>
      {userStatus === "loading" && (
        // <h2 className="text-center text-2xl pt-60 font-semibold h-screen">
        //   Loading.....
        // </h2>
        <Loader />
      )}
      {userStatus === "fulfilled" && (
        <div className="w-11/12 md:w-1/2 mx-auto md:ml-80 lg:ml-96 pt-4 mb-20 md:pt-12">
          <div className="flex justify-between">
            <div>
              <Avatar
                className="rounded-full"
                color={Avatar.getRandomColor("sitebase", ["red", "green"])}
                name={`${user?.firstName} ${user?.lastName}`}
                size="100"
              />
            </div>

            <div className="mt-2 flex flex-col sm:w-60 lg:w-80 mr-0 lg:mr-12">
              <div className="flex md:justify-between px-2 mb-2 gap-x-3">
                <div className="flex flex-col items-center">
                  <span>{posts?.length}</span> <span>Posts</span>
                </div>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setShowFollowersModal((state) => !state)}
                >
                  <span>{user?.followers.length}</span> <span>Followers</span>
                </div>
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setShowFollowingModal((state) => !state)}
                >
                  <span>{user?.following.length}</span> <span>Following</span>
                </div>
              </div>

              {showFollowersModal && (
                <Modal
                  modalContent={user?.followers}
                  modalType="Followers"
                  setShowModal={setShowFollowersModal}
                />
              )}
              {showFollowingModal && (
                <Modal
                  modalContent={user?.following}
                  modalType="Following"
                  setShowModal={setShowFollowingModal}
                />
              )}

              {loggedInUser?._id === user?._id ? (
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md"
                  onClick={() => {
                    dispatch(logoutUser());
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded-md"
                  onClick={() => followUnfollowHandler()}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-xl font-bold w-40 break-words">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-500">@{user?.username}</p>
          </div>
          <div className="bg-gray-200 h-px my-4"></div>
          {loggedInUser?.username === username && <UserSuggestion />}
          {loggedInUser?.username === username && (
            <div className="bg-gray-200 h-px my-6"></div>
          )}
          <div>
            {sortedPosts.map((post) => (
              <PostCard post={post} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
