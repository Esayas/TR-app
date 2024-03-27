import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Sidebar.module.css";

export default function SidebarItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  if (item.childrens) {
    return (
      <div className={open ? "sidebar-item open" : "sidebar-item"}>
        <div className="sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.name}
          </span>
          <i
            className="bi-chevron-down toggle-btn"
            onClick={() => setOpen(!open)}
          ></i>
        </div>
        <div className="sidebar-content">
          {item.childrens.map((child, index) => (
            <SidebarItem key={index} item={child} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      //   <a href={item.path || "#"} className="sidebar-item plain">
      //     {item.icon && <i className={item.icon}></i>}
      //     {item.title}
      //   </a>
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
    );
  }
}
