import { createSlice } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [
      {
        id: "1",
        content: "Hello! This is my first post",
        liked: false,
        comments: [],
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
      {
        id: "2",
        content: "This is my second post!!",
        liked: false,
        comments: [],
        date: sub(new Date(), { minutes: 10 }).toISOString(),
      },
    ],
  },
  reducers: {
    postButtonClicked: (state, action) => {
      console.log(action);
      state.posts.push(action.payload);
    },
    likeButtonClicked: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload);
      if (post) {
        post.liked = !post.liked;
      }
    },
    commentButtonClicked: (state, action) => {
      const post = state.posts.find(
        (post) => post.id === action.payload.postId
      );
      if (post) {
        post.comments.push(action.payload.comment);
      }
    },
  },
});

export const { postButtonClicked, likeButtonClicked, commentButtonClicked } =
  postsSlice.actions;

export default postsSlice.reducer;
