import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiX,
  FiHome,
  FiUser,
  FiActivity,
  FiBarChart2,
  FiCreditCard,
  FiFileText,
  FiUsers,
  FiHelpCircle,
  FiLogOut,
  FiBell,
  FiTrendingUp,
  FiDollarSign,
  FiCheckCircle,
} from "react-icons/fi";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, onLinkClick, setSidebarOpen, loggedInUser }) => {
  const location = useLocation();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <FiHome />,
      badge: "3",
    },
    {
      name: "Evaluation",
      path: "/dashboard/evaluation",
      icon: <FiUser />,
      badge: "✓",
    },
    {
      name: "Monitoring",
      path: "/dashboard/monitoring",
      icon: <FiActivity />,
    },
    {
      name: "Progress Report",
      path: "/dashboard/progress-report",
      icon: <FiBarChart2 />,
    },
    {
      name: "Weekly Remittance",
      path: "/dashboard/weekly-remittance",
      icon: <FiCreditCard />,
      badge: "2",
    },
    {
      name: "Proposal",
      path: "/dashboard/proposal",
      icon: <FiFileText />,
    },
    {
      name: "Onboarding",
      path: "/dashboard/onboarding",
      icon: <FiUsers />,
    },
  ];

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem("logged_in_user");
    window.location.href = "/";
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={() => setSidebarOpen(false)}>
        <FiX size={20} />
      </button>

      <div className="sidebar-content">
        {/* Logo Section */}
        <div className="logo-section">
          <h2 className="logo">Teerabs Tracker</h2>
          <div className="logo-subtitle">Loan Management System</div>
        </div>

        {/* User Profile */}
        <div className="user-profile">
          <div className="user-avatar">
            {getInitials(loggedInUser?.name || "User")}
          </div>
          <div className="user-info">
            <h4>{loggedInUser?.name || "User Account"}</h4>
            <p>Member</p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="scrollable-content">
          {/* Main Menu */}
          <div className="menu-section">
            <ul className="menu">
              {menuItems.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={i}>
                    <Link
                      to={item.path}
                      onClick={onLinkClick}
                      className={isActive ? "active" : ""}>
                      <span className="menu-icon">{item.icon}</span>
                      <span className="menu-text">{item.name}</span>
                      {item.badge && (
                        <span className="menu-badge">{item.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer Section - Always visible at bottom */}
        <div className="sidebar-footer">
          <div className="support-section">
            <p>Need help with your loans?</p>
            <button className="support-btn">
              <FiHelpCircle size={14} />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
