import { configureStore } from "@reduxjs/toolkit";
import emptypeSlice from "./emptype-slice";
import authSlice from "./auth-slice";
import uiSlice from "./ui-slice";
import triptypeSlice from "./triptype-slice";
import employeeSlice from "./employee-slice";
import useraccountSlice from "./useraccount-slice";
import authenticationSlice from "./authentication-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    emptypes: emptypeSlice.reducer,
    trip_types: triptypeSlice.reducer,
    ui: uiSlice.reducer,
    employee: employeeSlice.reducer,
    useraccount: useraccountSlice.reducer,
    loginuser: authenticationSlice.reducer,
  },
});

export default store;
