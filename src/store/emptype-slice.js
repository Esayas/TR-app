import { createSlice } from "@reduxjs/toolkit";

const emptypeSlice = createSlice({
  name: "emptype",
  initialState: {
    emptype: [],
    isCreating: false,
  },
  reducers: {
    getall(state, action) {},
    getdata(state, action) {},
    createnew(state, action) {},
    editdata(state, action) {},
    removedata(state, action) {},
  },
});

export const emptypeActions = emptypeSlice.actions;

export default emptypeSlice;
