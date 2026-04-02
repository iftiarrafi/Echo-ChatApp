import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v2/user/login",
        { username, password }
      );
      localStorage.setItem("userToken", JSON.stringify(response?.data?.token));
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: JSON.parse(localStorage.getItem("userToken")) || null,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
