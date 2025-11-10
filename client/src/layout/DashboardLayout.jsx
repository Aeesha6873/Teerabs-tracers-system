import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

const DashboardLayout = ({ setAuth }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("logged_in_user"));

    if (!user) {
      navigate("/");
    } else {
      setLoggedInUser(user);
    }
  }, []);

  if (!loggedInUser) {
    return <div className="loading-screen">Loading dashboard...</div>;
  }

  return (
    <div className={`dashboard-container ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onLinkClick={() => setSidebarOpen(false)}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="main-content">
        <Navbar
          user={loggedInUser}
          setAuth={setAuth}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="content-area">
          <Outlet context={{ loggedInUser }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
