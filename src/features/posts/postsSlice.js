import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addCommentToPostService,
  addNewPostService,
  deleteCommentFromPostService,
  deletePostService,
  getAllPostsService,
  toggleLikeUnlikePostService,
} from "../../services";

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  const postsResponse = await getAllPostsService();
  if (postsResponse.data.success === false) {
    throw new Error(postsResponse.data.message);
  }
  return postsResponse.data.posts;
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
  posts: [],
  status: "idle",
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // *************getAllPosts***************
    [getAllPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = state.posts.concat(action.payload);
    },
    [getAllPosts.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    // *************addNewPost***************
    [addNewPost.pending]: (state) => {
      state.status = "loading";
    },
    [addNewPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts.push(action.payload);
    },
    [addNewPost.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    // *************deletePost***************
    [deletePost.pending]: (state) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const postToBeDeletedIndex = state.posts.findIndex(
        (post) => post._id === action.payload._id
      );
      if (postToBeDeletedIndex !== -1) {
        state.posts.splice(postToBeDeletedIndex, 1);
      }
    },
    [deletePost.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    // *************toggleLikeUnlike***************
    [toggleLikeUnlikePost.pending]: (state) => {
      state.status = "loading";
    },
    [toggleLikeUnlikePost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const { postId, userId } = action.payload;
      const postToBeLiked = state.posts.find((post) => post._id === postId);
      console.log(postToBeLiked);
      if (postToBeLiked) {
        const isLikedIndex = postToBeLiked.likes.findIndex(
          (id) => id === userId
        );
        console.log(isLikedIndex);
        if (isLikedIndex === -1) {
          postToBeLiked.likes.push(userId);
        } else {
          postToBeLiked.likes.splice(isLikedIndex, 1);
        }
      }
    },
    [toggleLikeUnlikePost.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    // *************addComment***************
    [addCommentToPost.pending]: (state) => {
      state.status = "loading";
    },
    [addCommentToPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const { comment, userId, postId, commentId } = action.payload;
      const postToBeUpdated = state.posts.find((post) => post._id === postId);
      if (postToBeUpdated) {
        postToBeUpdated.comments.unshift({
          _id: commentId,
          comment,
          user: userId,
        });
      }
    },
    [addCommentToPost.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    // *************deleteComment***************
    [deleteCommentFromPost.pending]: (state) => {
      state.status = "pending";
    },
    [deleteCommentFromPost.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      const { postId, commentId } = action.payload;
      const postToBeUpdated = state.posts.find((post) => post._id === postId);
      const commentToBeDeletedIndex = postToBeUpdated.comments.findIndex(
        (comment) => comment._id === commentId
      );
      if (commentToBeDeletedIndex !== -1) {
        postToBeUpdated.comments.splice(commentToBeDeletedIndex, 1);
      }
    },
  },
});

export const { postButtonClicked, likeButtonClicked, commentButtonClicked } =
  postsSlice.actions;

export default postsSlice.reducer;
