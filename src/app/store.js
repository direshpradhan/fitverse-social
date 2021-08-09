import { configureStore } from "@reduxjs/toolkit";
import postsSliceReducer from "../features/posts/postsSlice";
import authSliceReducer from "../features/authentication/authSlice";
import usersSliceReducer from "../features/users/usersSlice";
import searchSliceReducer from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    posts: postsSliceReducer,
    auth: authSliceReducer,
    users: usersSliceReducer,
    search: searchSliceReducer,
  },
});
