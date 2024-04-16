import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticationActions } from "../../store/authentication-slice";

function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function logoutHandler() {
    dispatch(authenticationActions.logout());
    navigate("/login");
  }
  return (
    <header className={classes.header}>
      <div className={classes.log}> TRMS</div>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tripreq">Trip Request</Link>
          </li>
          <li>
            <Link to="/add-emptype">Employment Type</Link>
          </li> */}
          {/* <li>
            <Link to="/emptypetable">Employment Type List</Link>
          </li>
          <li>
            <Link to="/triptypetable">Trip Type List</Link>
          </li> */}
          <li>
            <button
              className="btn btn-secondary btn-sm"
              onClick={logoutHandler}
            >
              Logout
            </button>
            {/* <Link to="/Login" onClick={logoutHandler}>
              Logout
            </Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
