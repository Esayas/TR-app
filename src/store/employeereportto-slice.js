import { createSlice } from "@reduxjs/toolkit";

const employeereporttoSlice = createSlice({
  name: "employeereportto",
  initialState: {
    employeereportto: [],
  },
  reducers: {
    getall(state, action) {},
    getallemploymenttypes(state, action) {},
    getalldutystations(state, action) {},
    getallsections(state, action) {},
    createnew(state, action) {},
    editdata(state, action) {},
    removedata(state, action) {},
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice;
