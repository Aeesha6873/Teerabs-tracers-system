import React from "react";
import logo from "../../src/image/profile.jpg";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiLayers,
  FiClipboard,
  FiDollarSign,
  FiFileText,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiUser,
  FiPieChart,
  FiCalendar,
  FiBell,
} from "react-icons/fi";
import {
  MdDashboard,
  MdGroup,
  MdBusiness,
  MdPayment,
  MdAssessment,
  MdReceipt,
} from "react-icons/md";

export default function Sidebar({
  isOpen,
  isCollapsed,
  toggleSidebar,
  isMobile,
  closeSidebar,
}) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: <MdDashboard /> },
    { path: "/admin/users", label: "Users", icon: <FiUsers /> },
    { path: "/admin/clusters", label: "Clusters", icon: <MdBusiness /> },
    { path: "/admin/onboarding", label: "Onboarding", icon: <FiClipboard /> },
    { path: "/admin/loans", label: "Loans", icon: <FiDollarSign /> },
    { path: "/admin/repayment", label: "Repayment", icon: <MdPayment /> },
    { path: "/admin/proposals", label: "Proposals", icon: <FiFileText /> },
    { path: "/admin/reports", label: "Reports", icon: <MdAssessment /> },
    { path: "/admin/remittance", label: "Remittance", icon: <MdReceipt /> },
    { path: "/admin/settings", label: "Settings", icon: <FiSettings /> },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`admin-sidebar ${isOpen ? "open" : "closed"} ${
        isCollapsed ? "collapsed" : ""
      }`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isMobile && (
          <button
            className="sidebar-collapse-btn"
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        )}

        {isMobile && (
          <button className="sidebar-close-btn" onClick={closeSidebar}>
            <FiChevronLeft />
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">MAIN MENU</h3>
          <div className="nav-items">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
                onClick={isMobile ? closeSidebar : undefined}>
                <span className="nav-icon">{item.icon}</span>
                {(!isCollapsed || isMobile) && (
                  <span className="nav-label">{item.label}</span>
                )}
                {isActive(item.path) && <span className="nav-indicator"></span>}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <button className="logout-btn">
          <FiLogOut />
          {(!isCollapsed || isMobile) && <span>Logout</span>}
        </button>

        {(!isCollapsed || isMobile) && (
          <div className="sidebar-version">
            <p>v2.1.0</p>
          </div>
        )}
      </div>
    </aside>
  );
}
