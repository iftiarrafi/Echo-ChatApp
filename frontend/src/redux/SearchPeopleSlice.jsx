import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const searchPeoplefunc = createAsyncThunk(
  "searchPeople/search",
  async ({ searchFriend, thunkAPI }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v2/user/search-people/?query=${searchFriend}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  people: [],
  status: "idle",
  error: null,
};
const searchPeopleSlice = createSlice({
  name: "searchPeople",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(searchPeoplefunc.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(searchPeoplefunc.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.people = action.payload;
    });
    builder.addCase(searchPeoplefunc.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default searchPeopleSlice.reducer;
