import React from "react";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, onLinkClick, setSidebarOpen }) => {
  const menuItems = [
    { name: "Overview", path: "/dashboard" },
    { name: "Evaluation", path: "/dashboard/evaluation" },
    { name: "Monitoring", path: "/dashboard/monitoring" },
    { name: "Progress Report", path: "/dashboard/progress-report" },
    { name: "Weekly Remittance", path: "/dashboard/weekly-remittance" },
    { name: "Proposal", path: "/dashboard/proposal" },
    { name: "Onboarding", path: "/dashboard/onboarding" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setSidebarOpen(false)}>
        <FiX size={24} color="white" />
      </button>

      <h2 className="logo">Teerabs Tracker</h2>

      <ul className="menu">
        {menuItems.map((item, i) => (
          <li key={i}>
            <Link to={item.path} onClick={onLinkClick}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
