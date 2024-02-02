import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employee from "./pages/Employee";
import TripReq from "./pages/TripReq";
import Login from "./pages/Login";
import Layout from "./components/layout/layout";
import AddEmploymentType from "./components/EmploymentType/AddEmploymentType";

function App() {
  return (
    <Layout>
      <Routes>
        {/* <Route path="/tr">
          <Employee />
        </Route>
        <Route path="/employee">
          <Employee />
        </Route> */}
        <Route path="/" element={<TripReq />} />
        <Route path="/emptype" element={<AddEmploymentType />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Employee" element={<Employee />} />
      </Routes>
    </Layout>
  );
}

export default App;
