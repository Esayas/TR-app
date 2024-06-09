import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";
import SidebarItem from "./Sidebaritem";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaTh />,
    },
    {
      path: "/addtransportrequest",
      name: "Transport Request",
      icon: <FaCommentAlt />,
    },
    {
      path: "/add-employee",
      name: "Employee",
      icon: <FaRegChartBar />,
    },
    {
      path: "/employeetable",
      name: "Employe Table",
      icon: <FaUserAlt />,
    },
    {
      path: "/RegisterTable",
      name: "Register",
      icon: <FaShoppingBag />,
    },
    {
      path: "/Login",
      name: "Login",
      icon: <FaThList />,
    },
    {
      name: "TG",
      icon: <FaThList />,
      childrens: [
        {
          path: "/triptypetable",
          title: "Facebook",
          icon: "bi-facebook",
        },
        {
          path: "/triptypetable",
          title: "Twitter",
          icon: "bi-twitter",
        },
        {
          path: "/triptypetable",
          title: "Instagram",
          icon: "bi-instagram",
        },
      ],
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <FaThList />,
    },
  ];
  return (
    <div className={classes.container}>
      <div
        style={{ width: isOpen ? "250px" : "50px" }}
        className={classes.sidebar}
      >
        <div className={classes.top_section}>
          <h1
            style={{ display: isOpen ? "block" : "none" }}
            className={classes.logo}
          >
            Logo
          </h1>
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className={classes.bars}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={classes.link}
            // activeclassName={classes.active}
          >
            <div className={classes.icon}>{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={classes.link_text}
            >
              {item.name}
            </div>
          </NavLink>
        ))}

        {/* {menuItem.map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))} */}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
