import React, { useState } from "react";
import { Navigate, Route, Redirect } from "react-router-dom";
import { isInRole } from "../helpers/authHeader";
import { Forbidden } from "./Forbidden";

export { PrivateRoute };

function PrivateRoute({ role, children }) {
  console.log(role);
  // console.log(isInRole(role));

  const loginUser = localStorage.getItem("user");

  if (loginUser == null) {
    return <Navigate to="/login" replace />;
  } else if (role == null) {
    return children;
  } else if (isInRole(role)) {
    return children;
  } else {
    return <Forbidden />;
  }

  // localStorage.getItem("user") ? (
  //   role ? (
  //     isInRole(role) ? (
  //       // <Component {...rest} />
  //       <Component />
  //     ) : (
  //       <Forbidden />
  //     )
  //   ) : (
  //     // <Component {...rest} />
  //     <Component />
  //   )
  // ) : (
  //   <Navigate to="/login" replace />
  // );

  // const { user: authUser } = useSelector((x) => x.auth);

  // if (!authUser) {
  //   // not logged in so redirect to login page with the return url
  //   return <Navigate to="/login" state={{ from: history.location }} />;
  // }

  // authorized so return child components
  // return children;
}

// export const PrivateRoute = ({ component: Component, role, ...rest }) => {
//   // Add your authentication logic here
//   console.log(role);
//   console.log(isInRole(role));
//   localStorage.getItem("user") ? (
//     role ? (
//       isInRole(role) ? (
//         // <Component {...rest} />
//         <Component />
//       ) : (
//         <Forbidden />
//       )
//     ) : (
//       // <Component {...rest} />
//       <Component />
//     )
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };
// // export default PrivateRoute;
