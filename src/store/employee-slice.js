import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employmentTypes: [],
    dutystations: [],
    sections: [],
    newemployee: [],
    employees: [],
  },
  reducers: {
    getall(state, action) {
      state.employees = action.payload;
    },
    getallemploymenttypes(state, action) {
      state.employmentTypes = action.payload;
    },
    getalldutystations(state, action) {
      state.dutystations = action.payload;
    },
    getallsections(state, action) {
      state.sections = action.payload;
    },
    createnew(state, action) {
      state.newemployee = action.payload;
      // console.log(state.newemployee);
    },
    editdata(state, action) {},
    removedata(state, action) {},
  },
});

export const employeeActions = employeeSlice.actions;
export default employeeSlice;
