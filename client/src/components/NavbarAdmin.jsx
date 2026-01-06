import React, { useState } from "react";
import logo from "../../src/image/profile.jpg";

import {
  FiSearch,
  FiBell,
  FiMenu,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiSun,
  FiMoon,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { MdNotifications } from "react-icons/md";

export default function NavbarAdmin({ toggleSidebar, isMobile, isCollapsed }) {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    { id: 1, text: "New user registered", time: "5 min ago", unread: true },
    {
      id: 2,
      text: "Loan application approved",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      text: "Weekly report generated",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="admin-navbar">
      {/* Left Section - Menu button + Breadcrumb */}
      <div className="navbar-left">
        {/* Show hamburger only on mobile/tablet */}
        {isMobile && (
          <button
            className="navbar-menu-btn"
            onClick={toggleSidebar}
            aria-label="Toggle menu">
            <FiMenu />
          </button>
        )}

        <div className="navbar-breadcrumb">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, Administrator</p>
        </div>
      </div>

      {/* Center Section - Search (Hidden on mobile) */}
      {!isMobile && (
        <div className="navbar-center">
          <div className={`search-wrapper ${searchFocused ? "focused" : ""}`}>
            <input
              type="text"
              placeholder="Search users, clusters, reports..."
              className="search-input"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <div className="search-shortcut">⌘K</div>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="navbar-right">
        {/* Mobile Search Button */}
        {isMobile && (
          <button className="mobile-search-btn" aria-label="Search">
            <FiSearch />
          </button>
        )}

        {/* Notifications */}
        <div className="notifications-wrapper">
          <button
            className="notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications">
            <FiBell />
            {unreadCount > 0 && (
              <span className="notification-counter">{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className="notifications-panel">
              <div className="panel-header">
                <h3>Notifications</h3>
                <button
                  className="mark-all-read"
                  onClick={() => setShowNotifications(false)}>
                  Mark all as read
                </button>
              </div>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification ${
                      notification.unread ? "unread" : ""
                    }`}>
                    <div className="notification-icon">
                      <MdNotifications />
                    </div>
                    <div className="notification-content">
                      <p>{notification.text}</p>
                      <span>{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all">View all notifications</button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="profile-wrapper">
          <button
            className="profile-trigger"
            onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <div className="logo-icon">
              <img src={logo} alt="logo" />
            </div>
            {!isMobile && (
              <div className="user-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Super Admin</span>
              </div>
            )}
          </button>

          {showProfileMenu && (
            <div className="profile-menu">
              <div className="menu-header">
                <div className="user-preview">
                  <div className="preview-avatar">
                    <FiUser />
                  </div>
                  <div>
                    <h4>Admin User</h4>
                    <p>admin@teerabs.com</p>
                  </div>
                </div>
              </div>
              <div className="menu-items">
                <a href="/admin/profile" className="menu-item">
                  <FiUser /> <span>My Profile</span>
                </a>
                <a href="/admin/settings" className="menu-item">
                  <FiSettings /> <span>Settings</span>
                </a>
                <div className="menu-divider"></div>
                <button className="menu-item logout">
                  <FiLogOut /> <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
