import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

const SidebarAdmin = ({ isOpen }) => {
  const menuItems = [
    { name: "Overview", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Evaluation", path: "/admin/evaluation" },
    { name: "Monitoring", path: "/admin/monitoring" },
    { name: "Progress Report", path: "/admin/progress" },
    { name: "Weekly Remittance", path: "/admin/remittance" },
    { name: "Proposals", path: "/admin/proposals" },
    { name: "Onboarding", path: "/admin/onboarding" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <h2 className="logo">Admin Panel</h2>
      <ul className="menu">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAdmin;
