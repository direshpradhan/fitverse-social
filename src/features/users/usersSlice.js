import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPostsByUsernameService,
  getUserByUsernameService,
} from "../../services";
import {
  followUserService,
  unfollowUserService,
} from "../../services/usersService/Users.services";

const initialState = {
  user: null,
  userStatus: "idle",
  posts: [],
  error: null,
};

export const getPostsByUsername = createAsyncThunk(
  "users/getPostsByUsername",
  async (username) => {
    const response = await getPostsByUsernameService(username);
    return response.data.posts;
  }
);

export const getUserByUsername = createAsyncThunk(
  "users/getUserByUsername",
  async (username) => {
    const response = await getUserByUsernameService(username);
    return response.data.user;
  }
);

export const followButtonClicked = createAsyncThunk(
  "users/followButtonClicked",
  async (usertoFollowId) => {
    const response = await followUserService(usertoFollowId);
    console.log(response);
    return response.data;
  }
);

export const unfollowButtonClicked = createAsyncThunk(
  "users/unfollowButtonClicked",
  async (usertoUnfollowId) => {
    const response = await unfollowUserService(usertoUnfollowId);
    console.log(response);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    //****************getPostsByUsername ******************
    [getPostsByUsername.pending]: (state) => {
      state.userStatus = "pending";
    },
    [getPostsByUsername.fulfilled]: (state, action) => {
      state.posts = state.posts.concat(action.payload);
      state.userStatus = "fuldfilled";
    },
    [getPostsByUsername.error]: (state, action) => {
      state.userStatus = "error";
      state.error = action.payload.message;
    },
    //****************getUserByUsername ******************
    [getUserByUsername.pending]: (state) => {
      state.userStatus = "pending";
    },
    [getUserByUsername.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.userStatus = "fuldfilled";
    },
    [getUserByUsername.error]: (state, action) => {
      state.userStatus = "error";
      state.error = action.payload.message;
    },
    //****************followUser******************
    [followButtonClicked.pending]: (state) => {
      state.userStatus = "pending";
    },
    [followButtonClicked.fulfilled]: (state, action) => {
      const { user } = action.payload;
      state.user.followers.push(user);
      state.userStatus = "fulfilled";
    },
    [followButtonClicked.error]: (state, action) => {
      state.userStatus = "error";
      state.error = action.error.message;
    },
    [unfollowButtonClicked.pending]: (state) => {
      state.userStatus = "pending";
    },
    [unfollowButtonClicked.fulfilled]: (state, action) => {
      const { userToUnfollow } = action.payload;
      state.user.followers = userToUnfollow.followers;
      state.userStatus = "fulfilled";
    },
    [unfollowButtonClicked.error]: (state, action) => {
      state.userStatus = "error";
      state.error = action.error.message;
    },
  },
});

export default usersSlice.reducer;
