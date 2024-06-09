import { createSlice } from "@reduxjs/toolkit";

const transportrequestSlice = createSlice({
  name: "transportrequest",
  initialState: {
    sections: [],
    employees: [],
    servicetypes: [],
    transportrequests: [],
    transportrequest: [],
    employee: {},
    // employeeId: "",
    // sectionId: "",
  },
  reducers: {
    getall(state, action) {
      state.transportrequests = action.payload;
    },

    getallsections(state, action) {
      state.sections = action.payload;
    },

    getallemployees(state, action) {
      state.employees = action.payload;
      // state.employeeId = action.payload.map(({ id }) => id);
      // state.sectionId = action.payload.map(({ sectionId }) => sectionId);
    },

    getallservicetypes(state, action) {
      state.servicetypes = action.payload;
      // console.log("333GGG");
      // console.log(action.payload);
    },

    gettransportrequest(state, action) {
      state.transportrequest = action.payload;
    },

    setEmployeeId_Section(state, action) {
      state.employee = action.payload;
      // state.employeeId = action.payload.map(({ id }) => id);
      // state.sectionId = action.payload.map(({ sectionId }) => sectionId);
      // state.transportrequest = action.payload;
    },
  },
});

export const transportrequestActions = transportrequestSlice.actions;
export default transportrequestSlice;
