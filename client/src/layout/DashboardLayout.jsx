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
  }, [navigate]);

  // Close sidebar when clicking overlay or sidebar link
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  if (!loggedInUser) {
    return <div className="loading-screen">Loading dashboard...</div>;
  }

  return (
    <>
      {/* Sidebar with isOpen prop */}
      <Sidebar
        isOpen={sidebarOpen}
        onLinkClick={closeSidebar}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Overlay - only show on mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Main content area */}
      <div className="main-content">
        <Navbar
          user={loggedInUser}
          setAuth={setAuth}
          setSidebarOpen={setSidebarOpen}
          isSidebarOpen={sidebarOpen}
        />

        <div className="content-area">
          <Outlet context={{ loggedInUser }} />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
