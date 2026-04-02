import { configureStore } from "@reduxjs/toolkit";
import searchPeopleSlice from "./SearchPeopleSlice.jsx";
import loginSlice from "./loginSlice.jsx";
import getChatSlice from "./getChatSlice.jsx";

const store = configureStore({
  reducer: {
    searchPeople: searchPeopleSlice,
    login: loginSlice,
    getroomStore: getChatSlice,
  },
});

export default store;
