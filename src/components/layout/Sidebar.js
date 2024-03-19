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
      path: "/triptypetable",
      name: "Trip Type",
      icon: <FaCommentAlt />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <FaRegChartBar />,
    },
    {
      path: "/about",
      name: "About",
      icon: <FaUserAlt />,
    },
    {
      path: "/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/productList",
      name: "Product List",
      icon: <FaThList />,
    },
    {
      name: "TG",
      icon: <FaThList />,
      childrens: [
        {
          title: "Facebook",
          icon: "bi-facebook",
        },
        {
          title: "Twitter",
          icon: "bi-twitter",
        },
        {
          title: "Instagram",
          icon: "bi-instagram",
        },
      ],
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
            activeclassName={classes.active}
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
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
