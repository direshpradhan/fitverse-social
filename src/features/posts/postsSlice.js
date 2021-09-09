import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCommentToPostService,
  addNewPostService,
  deleteCommentFromPostService,
  deletePostService,
  getAllPostsService,
  getPostsForLoggedInUserService,
  toggleLikeUnlikePostService,
} from "../../services";

export const getPostsForLoggedInUser = createAsyncThunk(
  "posts/getPostsForLoggedInUser",
  async () => {
    const response = await getPostsForLoggedInUserService();
    return response.data.posts;
  }
);

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const response = await getAllPostsService();
  console.log(response);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.posts;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (content) => {
    const response = await addNewPostService(content);
    return response.data.newPost;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    const response = await deletePostService(postId);
    return response.data.post;
  }
);

export const toggleLikeUnlikePost = createAsyncThunk(
  "posts/toggleLikeUnlikePost",
  async (postId) => {
    const response = await toggleLikeUnlikePostService(postId);
    console.log(response);
    return response.data;
  }
);

export const addCommentToPost = createAsyncThunk(
  "posts/addCommentToPost",
  async ({ postId, comment }) => {
    const response = await addCommentToPostService(postId, comment);
    return response.data;
  }
);

export const deleteCommentFromPost = createAsyncThunk(
  "posts/deleteCommentFromPost",
  async ({ postId, commentId }) => {
    const response = await deleteCommentFromPostService(postId, commentId);
    return response.data;
  }
);

const initialState = {
  loggedInUserPosts: [],
  loggedInUserPostsStatus: "idle",
  allPosts: [],
  allPostsStatus: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetloggedInUserPostsStatus: (state) => {
      state.loggedInUserPostsStatus = "idle";
    },
  },
  extraReducers: {
    // *************getAllPosts***************
    [getAllPosts.pending]: (state) => {
      state.allPostsStatus = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPostsStatus = "fulfilled";
      state.allPosts = state.allPosts.concat(action.payload);
    },
    [getAllPosts.rejected]: (state, action) => {
      state.allPostsStatus = "error";
      state.error = action.error.message;
    },

    // *************getPostsForLoggedInUser***************
    [getPostsForLoggedInUser.pending]: (state) => {
      state.loggedInUserPostsStatus = "loading";
    },
    [getPostsForLoggedInUser.fulfilled]: (state, action) => {
      state.loggedInUserPostsStatus = "fulfilled";
      state.loggedInUserPosts = state.loggedInUserPosts.concat(action.payload);
    },
    [getPostsForLoggedInUser.rejected]: (state, action) => {
      state.loggedInUserPostsStatus = "error";
      state.error = action.error.message;
    },

    // *************addNewPost***************
    [addNewPost.pending]: (state) => {
      state.loggedInUserPostsStatus = "loading";
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.loggedInUserPostsStatus = "fulfilled";
      state.loggedInUserPosts.push(action.payload);
      state.allPosts.push(action.payload);
    },
    [addNewPost.rejected]: (state, action) => {
      state.loggedInUserPostsStatus = "error";
      state.error = action.error.message;
    },

    // *************deletePost***************
    [deletePost.pending]: (state) => {
      state.loggedInUserPostsStatus = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loggedInUserPostsStatus = "fulfilled";
      const postToBeDeletedIndex = state.loggedInUserPosts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (postToBeDeletedIndex !== -1) {
        state.loggedInUserPosts.splice(postToBeDeletedIndex, 1);
      }
    },
    [deletePost.rejected]: (state, action) => {
      state.loggedInUserPostsStatus = "error";
      state.error = action.error.message;
    },

    // *************toggleLikeUnlike***************
    [toggleLikeUnlikePost.pending]: (state) => {
      state.loggedInUserPostsStatus = "loading";
    },
    [toggleLikeUnlikePost.fulfilled]: (state, action) => {
      state.loggedInUserPostsStatus = "fulfilled";
      const { postId, userId } = action.payload;
      const loggedInUserPostToBeLiked = state.loggedInUserPosts.find(
        (post) => post._id === postId
      );
      const postToBeLiked = state.allPosts.find((post) => post._id === postId);

      function likePost(post) {
        if (post) {
          const isLikedIndex = post.likes.findIndex((id) => id === userId);
          if (isLikedIndex === -1) {
            post.likes.push(userId);
          } else {
            post.likes.splice(isLikedIndex, 1);
          }
        }
      }
      likePost(postToBeLiked);
      likePost(loggedInUserPostToBeLiked);
    },
    [toggleLikeUnlikePost.rejected]: (state, action) => {
      state.loggedInUserPostsStatus = "error";
      state.error = action.error.message;
    },

    // *************addComment***************
    [addCommentToPost.pending]: (state) => {
      state.loggedInUserPostsStatus = "loading";
    },
    [addCommentToPost.fulfilled]: (state, action) => {
      state.loggedInUserPostsStatus = "fulfilled";
      const { comment, userId, postId, commentId } = action.payload;
      const postToBeUpdated = state.loggedInUserPosts.find(
        (post) => post._id === postId
      );
      if (postToBeUpdated) {
        postToBeUpdated.comments.unshift({
          _id: commentId,
          comment,
          user: userId,
        });
      }
    },
    [addCommentToPost.rejected]: (state, action) => {
      state.loggedInUserPostsStatus = "error";
      state.error = action.error.message;
    },

    // *************deleteComment***************
    [deleteCommentFromPost.pending]: (state) => {
      state.loggedInUserPostsStatus = "loading";
    },
    [deleteCommentFromPost.fulfilled]: (state, action) => {
      state.loggedInUserPostsStatus = "fulfilled";
      const { postId, commentId } = action.payload;
      const postToBeUpdated = state.loggedInUserPosts.find(
        (post) => post._id === postId
      );
      const commentToBeDeletedIndex = postToBeUpdated.comments.findIndex(
        (comment) => comment._id === commentId
      );
      if (commentToBeDeletedIndex !== -1) {
        postToBeUpdated.comments.splice(commentToBeDeletedIndex, 1);
      }
    },
  },
});

export const { resetloggedInUserPostsStatus } = postsSlice.actions;

export default postsSlice.reducer;
