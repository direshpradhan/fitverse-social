import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersService } from "../../services/usersService/Users.services";

export const getAllUsers = createAsyncThunk("search/getAllUsers", async () => {
  const response = await getAllUsersService();
  return response.data.users;
});

const initialState = {
  searchStatus: "idle",
  allUsers: [],
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.searchStatus = "loading";
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload;
      state.searchStatus = "fulfilled";
    },
    [getAllUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.searchStatus = "error";
    },
  },
});

export default searchSlice.reducer;
