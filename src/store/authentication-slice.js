import { createSlice } from "@reduxjs/toolkit";

const authenticationSlice = createSlice({
  name: "loginuser",
  initialState: {
    user: {},
    loggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.loggedIn = true;
      console.log("33");
      console.log(action.payload);
    },
    logout(state, action) {
      state.loggedIn = false;
    },
    editdata(state, action) {},
    removedata(state, action) {},
  },
});

export const authenticationActions = authenticationSlice.actions;
export default authenticationSlice;
