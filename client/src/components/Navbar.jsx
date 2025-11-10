import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu, FiChevronDown, FiUser, FiUsers } from "react-icons/fi";
import "../styles/navbar.css";

const Navbar = ({ setAuth, setSidebarOpen }) => {
  const [loanOpen, setLoanOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLoanOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <FiMenu size={22} color="#1b263b" />
        </button>
        <h1 className="navbar-title">Teerabs Dashboard</h1>
      </div>

      <div className="navbar-right">
        <div className="loan-dropdown" ref={dropdownRef}>
          <button
            className={`loan-btn ${loanOpen ? "active" : ""}`}
            onClick={() => setLoanOpen(!loanOpen)}>
            Loans
            <FiChevronDown className={`arrow ${loanOpen ? "open" : ""}`} />
          </button>

          {loanOpen && (
            <ul className="loan-menu">
              <li>
                <Link to="/dashboard/loans/individual">
                  <FiUser /> Individual Loans
                </Link>
              </li>
              <li>
                <Link to="/dashboard/loans/cluster">
                  <FiUsers /> Cluster Loans
                </Link>
              </li>
            </ul>
          )}
        </div>

        <button className="navbar-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
