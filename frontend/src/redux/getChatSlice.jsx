import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const getChatsRedux = createAsyncThunk(
  "chat/getChat",
  async ({ friendId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/v2/chatroom/get-room/${friendId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getChatSlice = createSlice({
  name: "chat",
  initialState: {
    error: null,
    status: "idle",
    room: null,
    messages: [],
  },
  reducers: {
    clearChat: (state) => {
      state.room = null;
      state.status = "idle";
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsRedux.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getChatsRedux.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.room = action.payload.room;
      state.messages = action.payload.messages;
      state.error = "null";
    });
    builder.addCase(getChatsRedux.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { clearChat } = getChatSlice.actions;
export default getChatSlice.reducer;
