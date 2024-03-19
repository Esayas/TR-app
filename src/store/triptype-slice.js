import { createSlice } from "@reduxjs/toolkit";

const triptypeSlice = createSlice({
  name: "trip_types",
  initialState: {
    triptype: { id: "", description: "" },
    triptypes: [],
    isCreating: true,
    changed: false,
  },
  reducers: {
    getall(state, action) {
      state.triptypes = action.payload;
    },
    createnew(state, action) {
      state.isCreating = true;
      //   console.log(action);
    },
    editdata(state, action) {
      state.isCreating = false;
      state.triptype = action.payload;
    },
    removedata(state, action) {
      // console.log("actionbb");
      state.changed = true;
      // state.employmenttypes = state.employmenttypes.filter(
      //   (item) => item.id !== action.payload.id
      // );
    },
  },
});

export const triptypeActions = triptypeSlice.actions;
export default triptypeSlice;
