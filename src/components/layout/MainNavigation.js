import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.log}> TRMS</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/tripreq">Trip Request</Link>
          </li>
          <li>
            <Link to="/add-emptype">Employment Type</Link>
          </li>
          <li>
            <Link to="/emptypetable">Employment Type List</Link>
          </li>
          <li>
            <Link to="/triptypetable">Trip Type List</Link>
          </li>
          <li>
            <Link to="/employee">Employee</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
