import "./App.css";
// import "antd/dist/reset.css";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Employee from "./pages/Employee";
import TripReq from "./pages/TripReq";

import Layout from "./components/layout/layout";
import AddEmploymentType from "./components/EmploymentType/AddEmploymentType";
import EmploymentTypeTable from "./components/EmploymentType/EmploymentTypeTable";
import TripTypeTable from "./components/TripType/TripTypeTable";
import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
import AddTripType from "./components/TripType/AddTripType";
import EditTripType from "./components/TripType/EditTripType";
import Sidebar from "./components/layout/Sidebar";
import AddEmployee from "./components/Employee/AddEmployee";
import EmployeeTable from "./components/Employee/EmployeeTable";
import Register from "./components/Auth/UserAccount/Register";
import RegisterTable from "./components/Auth/UserAccount/RegisterTable";
import RegisterEdit from "./components/Auth/UserAccount/RegisterEdit";
import Login from "./components/Auth/Login";
import UserRole from "./components/Auth/UserAccount/UserRole";
import Unauthorized from "./components/Unauthorized";
import { PrivateRoute } from "./components/PrivateRoute";
import RequireAuth from "./components/RequireAuth";

// import { IdleTimer } from "react-idle-timer";

function App() {
  //idle time out
  // const handleOnIdle = (event) => {
  //   console.log("User is idle", event);
  //   // Actions to perform when the user is idle
  // };

  // const handleOnActive = (event) => {
  //   console.log("User is active", event);
  //   // Actions to perform when the user becomes active again
  // };

  // const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const isLoggedIn = useSelector((state) => state.loginuser.loggedIn);
  //  const employeelist = useSelector((state) => state.employee.employees);
  const notification = useSelector((state) => state.ui.notification);
  console.log("TGTGGGG");
  console.log(isLoggedIn);
  // console.log(isLoggedIn);
  return (
    // <IdleTimer
    //   timeout={1000 * 60 * 1} // 15 minutes
    //   onIdle={handleOnIdle}
    //   onActive={handleOnActive}
    // >
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}

      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <Layout>
          <Sidebar>
            <Routes>
              <Route path="/" element={<TripReq />} />
              <Route path="/add-emptype" element={<AddEmploymentType />} />
              <Route path="/emptype/edit/:id" element={<AddEmploymentType />} />
              <Route path="/emptypetable" element={<EmploymentTypeTable />} />
              <Route path="/add-triptype" element={<AddTripType />} />
              <Route path="/triptype/edit/:id" element={<AddTripType />} />
              <Route path="/triptypetable" element={<TripTypeTable />} />
              <Route path="/login" element={<Login />} />
              <Route path="/Employee" element={<Employee />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/employee/edit/:id" element={<AddEmployee />} />

              {/* <Route path="/employeetable" element={<EmployeeTable />} /> */}
              {/* uses Private route as an example */}
              <Route
                path="/employeetable"
                element={
                  <PrivateRoute role="SuperAdmin">
                    <EmployeeTable />
                  </PrivateRoute>
                }
              />

              <Route element={<RequireAuth allowedRoles={["SuperAdmin"]} />}>
                <Route path="RegisterTable" element={<RegisterTable />} />
              </Route>

              {/* <Route path="/RegisterTable" element={<RegisterTable />} /> */}
              <Route path="/Register" element={<Register />} />
              <Route path="/useraccount/edit/:id" element={<RegisterEdit />} />
              <Route path="/useraccount/user-role/:id" element={<UserRole />} />
              <Route path="/unauthorized" element={<Unauthorized />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Sidebar>
        </Layout>
      )}
      {/* {!isLoggedIn && <Auth />}
      {isLoggedIn && (
        <Layout>
          <Routes>
            <Route path="/" element={<TripReq />} />
            <Route path="/add-emptype" element={<AddEmploymentType />} />
            <Route path="/emptype/edit/:id" element={<AddEmploymentType />} />
            <Route path="/emptypetable" element={<EmploymentTypeTable />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Employee" element={<Employee />} />
          </Routes>
        </Layout>
      )} */}
    </>
    // </IdleTimer>
  );
}

export default App;
