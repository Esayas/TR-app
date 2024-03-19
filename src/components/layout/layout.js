import MainNavigation from "./MainNavigation";
// import Sidebar from "./Sidebar";
import classes from "./layout.module.css";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      {/* <Sidebar></Sidebar> */}
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
