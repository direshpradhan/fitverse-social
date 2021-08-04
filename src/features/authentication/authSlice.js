import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../../services";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, username, password }) => {
    const response = await loginService(email, username, password);
    return response.data;
  }
);

const initialState = {
  token: JSON.parse(localStorage?.getItem("login"))?.token || null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage?.removeItem("login");
      state.token = null;
      state.status = "idle";
      // return initialState;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.token = action.payload.token;
      localStorage?.setItem("login", JSON.stringify({ token: state.token }));
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
