import { configureStore } from "@reduxjs/toolkit";
import emptypeSlice from "./emptype-slice";
import authSlice from "./auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    emptypes: emptypeSlice.reducer,
  },
});

export default store;
