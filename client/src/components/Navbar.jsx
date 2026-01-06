import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiUsers,
  FiLogOut,
  FiHome,
  FiActivity,
  FiBarChart2,
  FiCreditCard,
  FiFileText,
  FiBell,
  FiSettings,
} from "react-icons/fi";
import "../styles/navbar.css";

const Navbar = ({ setAuth, setSidebarOpen, isSidebarOpen }) => {
  const [loanOpen, setLoanOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem("logged_in_user");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Get current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Overview";
    if (path === "/dashboard/evaluation") return "Account Evaluation";
    if (path === "/dashboard/monitoring") return "Loan Monitoring";
    if (path === "/dashboard/progress-report") return "Progress Report";
    if (path === "/dashboard/weekly-remittance") return "Weekly Remittance";
    if (path === "/dashboard/proposal") return "Proposal Management";
    if (path === "/dashboard/onboarding") return "Onboarding";
    return "Dashboard";
  };

  const getPageIcon = () => {
    const path = location.pathname;
    if (path === "/dashboard") return <FiHome />;
    if (path === "/dashboard/evaluation") return <FiUser />;
    if (path === "/dashboard/monitoring") return <FiActivity />;
    if (path === "/dashboard/progress-report") return <FiBarChart2 />;
    if (path === "/dashboard/weekly-remittance") return <FiCreditCard />;
    if (path === "/dashboard/proposal") return <FiFileText />;
    return <FiHome />;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLoanOpen(false);
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className={`menu-btn ${isSidebarOpen ? "close" : ""}`}
          onClick={toggleSidebar}
          aria-label={
            isSidebarOpen ? "Close sidebar menu" : "Open sidebar menu"
          }>
          {isSidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
        <h1 className="navbar-title">
          <span className="title-text">
            <span
              style={{
                marginRight: "0.5rem",
                color: "#2563eb",
                display: "inline-flex",
                alignItems: "center",
              }}>
              {getPageIcon()}
            </span>
            {getPageTitle()}
          </span>
          <span className="title-sub">
            Track, manage, and analyze your loans
          </span>
        </h1>
      </div>

      <div className="navbar-right">
        {/* Notifications Button */}
        <div className="loan-dropdown" style={{ position: "relative" }}>
          <button
            className="loan-btn"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            aria-expanded={notificationsOpen}
            aria-haspopup="true"
            style={{
              background: "transparent",
              border: "1px solid #e2e8f0",
              color: "#64748b",
            }}>
            <FiBell size={18} />
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "#ef4444",
                color: "white",
                fontSize: "0.7rem",
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
              }}>
              3
            </span>
          </button>

          {notificationsOpen && (
            <div
              className="loan-menu-wrapper"
              style={{ right: "auto", left: 0 }}>
              <ul className="loan-menu">
                <li
                  style={{
                    padding: "0.75rem",
                    textAlign: "center",
                    color: "#64748b",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                  }}>
                  Notifications (3)
                </li>
                <li>
                  <a href="#">
                    <span
                      className="loan-icon"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                      }}>
                      <FiHome />
                    </span>
                    <div className="loan-item-content">
                      <span className="loan-item-title">Loan Approved</span>
                      <span className="loan-item-desc">
                        Your application has been approved
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span
                      className="loan-icon"
                      style={{
                        background: "rgba(245, 158, 11, 0.1)",
                        color: "#f59e0b",
                      }}>
                      <FiCreditCard />
                    </span>
                    <div className="loan-item-content">
                      <span className="loan-item-title">Payment Due</span>
                      <span className="loan-item-desc">
                        Payment due in 2 days
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span
                      className="loan-icon"
                      style={{
                        background: "rgba(37, 99, 235, 0.1)",
                        color: "#2563eb",
                      }}>
                      <FiFileText />
                    </span>
                    <div className="loan-item-content">
                      <span className="loan-item-title">Document Update</span>
                      <span className="loan-item-desc">
                        Review required documents
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Loan Dropdown */}
        <div className="loan-dropdown" ref={dropdownRef}>
          <button
            className={`loan-btn ${loanOpen ? "active" : ""}`}
            onClick={() => setLoanOpen(!loanOpen)}
            aria-expanded={loanOpen}
            aria-haspopup="true">
            <span className="loan-text">Loans</span>
            <FiChevronDown className={`arrow ${loanOpen ? "open" : ""}`} />
          </button>

          {loanOpen && (
            <div className="loan-menu-wrapper">
              <ul className="loan-menu" role="menu">
                <li role="none">
                  <Link
                    to="/dashboard/loans/individual"
                    role="menuitem"
                    onClick={() => setLoanOpen(false)}>
                    <span className="loan-icon">
                      <FiUser />
                    </span>
                    <div className="loan-item-content">
                      <span className="loan-item-title">Individual Loans</span>
                      <span className="loan-item-desc">
                        Manage your personal loans
                      </span>
                    </div>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/dashboard/loans/cluster"
                    role="menuitem"
                    onClick={() => setLoanOpen(false)}>
                    <span className="loan-icon">
                      <FiUsers />
                    </span>
                    <div className="loan-item-content">
                      <span className="loan-item-title">Cluster Loans</span>
                      <span className="loan-item-desc">Manage group loans</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          className="loan-btn"
          onClick={() => navigate("/dashboard/settings")}
          style={{
            background: "transparent",
            border: "1px solid #e2e8f0",
            color: "#64748b",
          }}>
          <FiSettings size={18} />
          <span className="loan-text">Settings</span>
        </button>

        {/* Logout Button */}
        <button
          className="navbar-logout"
          onClick={handleLogout}
          aria-label="Logout">
          <span className="logout-text">Logout</span>
          <span className="logout-icon">
            <FiLogOut />
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
