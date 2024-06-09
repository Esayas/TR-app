import { createSlice } from "@reduxjs/toolkit";

const useraccountSlice = createSlice({
  name: "useraccount",
  initialState: {
    useraccounts: [],
    userstatus: false,
  },
  reducers: {
    getall(state, action) {
      state.useraccounts = action.payload;
      // console.log("33");
      console.log(action.payload);
    },
    createnew(state, action) {},
    editdata(state, action) {},
    removedata(state, action) {},
    userstatus(state, action) {
      state.userstatus = true;
    },
  },
});

export const useraccountActions = useraccountSlice.actions;
export default useraccountSlice;
