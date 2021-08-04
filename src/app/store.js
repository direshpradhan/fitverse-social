import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "../features/posts/postsSlice";
import authSliceReducer from "../features/authentication/authSlice";

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    auth: authSliceReducer,
  },
});
