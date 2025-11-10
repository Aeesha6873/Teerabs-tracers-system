// src/components/NavbarAdmin.jsx
import React from "react";
// import "../styles/navbar.css";

const NavbarAdmin = ({ setSidebarOpen, sidebarOpen }) => {
  return (
    <nav className="navbar">
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? "Close Menu" : "Open Menu"}
      </button>
      <div className="navbar-right">
        <button>Logout</button>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
