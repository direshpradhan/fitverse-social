import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPostsByUsernameService,
  getUserByUsernameService,
} from "../../services";

const initialState = {
  user: null,
  status: "idle",
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    //****************getPostsByUsername ******************
    [getPostsByUsername.pending]: (state) => {
      state.status = "pending";
    },
    [getPostsByUsername.fulfilled]: (state, action) => {
      state.posts = state.posts.concat(action.payload);
      state.status = "fuldfilled";
    },
    [getPostsByUsername.error]: (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    },
    //****************getUserByUsername ******************
    [getUserByUsername.pending]: (state) => {
      state.status = "pending";
    },
    [getUserByUsername.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "fuldfilled";
    },
    [getUserByUsername.error]: (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    },
  },
});

export default usersSlice.reducer;
