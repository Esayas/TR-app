import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./pages/Employee";
import TripReq from "./pages/TripReq";
import Login from "./pages/Login";
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

function App() {
  // const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  // console.log(isLoggedIn);
  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
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
          </Routes>
        </Sidebar>
      </Layout>

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
  );
}

export default App;
