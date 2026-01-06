import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarAdmin";
import Navbar from "../components/NavbarAdmin";
import "../styles/admin.css";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // Mobile: < 768px
      // Tablet: 768px - 1024px
      // Desktop: > 1024px

      if (width < 768) {
        setIsMobile(true);
        setSidebarOpen(false); // Sidebar hidden on mobile by default
        setIsCollapsed(false);
      } else if (width >= 768 && width <= 1024) {
        setIsMobile(false);
        setIsCollapsed(true); // Sidebar collapsed on tablet
      } else {
        setIsMobile(false);
        setIsCollapsed(false); // Sidebar expanded on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="admin-container">
      {/* Desktop/Tab Sidebar */}
      {!isMobile && (
        <Sidebar
          isOpen={true}
          isCollapsed={isCollapsed}
          toggleSidebar={toggleSidebar}
          isMobile={false}
          closeSidebar={closeSidebar}
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <>
          <Sidebar
            isOpen={sidebarOpen}
            isCollapsed={false}
            toggleSidebar={toggleSidebar}
            isMobile={true}
            closeSidebar={closeSidebar}
          />
          <div className="sidebar-overlay" onClick={closeSidebar} />
        </>
      )}

      <main
        className={`admin-main ${isCollapsed ? "sidebar-collapsed" : ""} ${
          isMobile ? "mobile-view" : ""
        }`}>
        <Navbar
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
          isCollapsed={isCollapsed}
        />

        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
