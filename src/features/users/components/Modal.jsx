import React from "react";
import Avatar from "react-avatar";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import { unfollowButtonClicked } from "../usersSlice";

export const Modal = ({ modalContent, modalType, setShowModal }) => {
  // const { user: loggedInUser } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.users);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div
        className="fixed z-20 inset-0 flex justify-center"
        onClick={() => setShowModal(false)}
      >
        <div
          className="absolute top-32 shadow-lg bg-white w-4/5 sm:w-3/5 md:2/5 lg:w-1/3 mx-auto max-w-3xl border"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex justify-between items-center pl-4 pr-2 py-3 border-b bg-gray-100">
            <h3 className="text-xl font-semibold">{modalType}</h3>
            <span
              className="material-icons-outlined cursor-pointer"
              onClick={() => setShowModal(() => false)}
            >
              close
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {modalContent.length !== 0 ? (
              modalContent.map((modalUser) => {
                const { firstName, lastName, username } = modalUser;
                return (
                  <div className="flex ml-3 my-3 relative">
                    <Avatar
                      size="50"
                      name={`${firstName} ${lastName}`}
                      className="rounded-full cursor-pointer"
                      onClick={() => navigate(`/user/${username}`)}
                    />
                    <div className="ml-2">
                      <p
                        className="font-medium text-lg cursor-pointer"
                        onClick={() => navigate(`/user/${username}`)}
                      >
                        {firstName} {lastName}
                      </p>
                      <p className="text-gray-500">@{username}</p>
                    </div>
                    {/* {modalType === "Following" &&
                      user.username === loggedInUser.username && (
                        <button
                          className="absolute right-4 top-1  py-2 px-4 bg-blue-700 text-white rounded-md"
                          onClick={() =>
                            dispatch(unfollowButtonClicked(modalUser._id))
                          }
                        >
                          Unfollow
                        </button>
                      )} */}
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-40 font-medium text-lg">
                No {modalType}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="opacity-30 fixed inset-0 z-10 bg-gray-600"></div>
    </>
  );
};
