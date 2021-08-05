import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../../services";
import { signupService } from "../../services/signupService/Signup.services";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, username, password }) => {
    const loginResponse = await loginService(email, username, password);
    return loginResponse.data;
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userDetails) => {
    const signupResponse = await signupService(userDetails);
    return signupResponse.data;
  }
);

const initialState = {
  token: JSON.parse(localStorage?.getItem("login"))?.token || null,
  user: JSON.parse(localStorage?.getItem("login"))?.user || null,
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
      state.user = null;
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
      state.user = action.payload.user;
      localStorage?.setItem(
        "login",
        JSON.stringify({ token: state.token, user: state.user })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
    [signupUser.pending]: (state) => {
      state.status = "pending";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage?.setItem(
        "login",
        JSON.stringify({ token: state.token, user: state.user })
      );
    },
    [signupUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
