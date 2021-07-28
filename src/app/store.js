import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    posts:postsSliceReducer,
  },
});
