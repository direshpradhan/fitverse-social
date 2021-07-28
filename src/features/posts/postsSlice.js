import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        id: "1",
        title: "First Post!",
        content: "Hello! This is my first post",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
      {
        id: "2",
        title: "Second Post",
        content: "This is my second post!!",
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
    ],
  },
  reducers: {
    postButtonClicked: (state, action) => {
      console.log(action);
      state.posts.push(action.payload);
    },
  },
});

export const { postButtonClicked } = postsSlice.actions;

export default postsSlice.reducer;
