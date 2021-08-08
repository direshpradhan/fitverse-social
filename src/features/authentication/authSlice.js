import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../../services";
import { signupService } from "../../services/signupService/Signup.services";
import { getLoggedInUserService } from "../../services/usersService/Users.services";

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

export const getLoggedInUser = createAsyncThunk(
  "auth/getLoggedInUser",
  async () => {
    const response = await getLoggedInUserService();
    return response.data.loggedInUser;
  }
);

const initialState = {
  token: JSON.parse(localStorage?.getItem("login"))?.token || null,
  user: JSON.parse(localStorage?.getItem("login"))?.user || null,
  authStatus: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage?.removeItem("login");
      state.token = null;
      state.authStatus = "idle";
      state.user = null;
      // return initialState;
    },
    resetAuthStatus: (state) => {
      console.log("resetting......");
      state.authStatus = "idle";
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.authStatus = "loading";
    },
    [loginUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage?.setItem(
        "login",
        JSON.stringify({ token: state.token, user: state.user })
      );
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.authStatus = "error";
    },
    [signupUser.pending]: (state) => {
      state.authStatus = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.authStatus = "fulfilled";
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage?.setItem(
        "login",
        JSON.stringify({ token: state.token, user: state.user })
      );
    },
    [signupUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.authStatus = "error";
    },
    [getLoggedInUser.pending]: (state) => {
      state.authStatus = "loading";
    },
    [getLoggedInUser.fulfilled]: (state, action) => {
      console.log("getLoggedInUser..............");
      state.authStatus = "fulfilled";
      state.user = action.payload;
    },
    [getLoggedInUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.authStatus = "error";
    },
  },
});

export const { logoutUser, resetAuthStatus } = authSlice.actions;

export default authSlice.reducer;
