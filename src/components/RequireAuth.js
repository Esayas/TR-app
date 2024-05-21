import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  //   const { auth } = useAuth();

  const location = useLocation();
  const auth = useSelector((state) => state.loginuser.user);
  //   console.log(auth);
  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    //   ) : auth?.Username ? (
    //     <Navigate to="/unauthorized" state={{ from: location }} replace />
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default RequireAuth;
