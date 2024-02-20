import { createSlice } from "@reduxjs/toolkit";

const emptypeSlice = createSlice({
  name: "emptypes",
  initialState: {
    employmenttype: { id: "", employmentTypeName: "" },
    employmenttypes: [],
    isCreating: true,
    changed: false,
  },
  reducers: {
    getall(state, action) {
      //var newemptype = state.employmenttype.concat(action.payload);
      state.employmenttypes = action.payload;

      //console.log(state.employmenttype);
    },
    getdata(state, action) {},
    createnew(state, action) {},
    editdata(state, action) {
      state.isCreating = false;
      state.employmenttype = action.payload;
    },
    removedata(state, action) {
      state.changed = true;
      state.employmenttypes = state.employmenttypes.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const emptypeActions = emptypeSlice.actions;

export default emptypeSlice;
