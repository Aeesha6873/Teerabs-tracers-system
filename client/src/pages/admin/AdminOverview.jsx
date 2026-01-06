// src/pages/AdminOverview.jsx
import React from "react";
import {
  FiUsers,
  FiLayers,
  FiDollarSign,
  FiFileText,
  FiTrendingUp,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiChevronRight,
} from "react-icons/fi";
import UserTable from "../admin/components/AdminUserTable";
import ClusterTable from "../admin/components/ClusterTable";
import ActivityFeed from "../admin/components/ActivityFeed";
import "../../styles/admin.css";

export default function AdminOverview() {
  const stats = [
    {
      title: "Total Individuals",
      value: "1,245",
      change: "+12.5%",
      trend: "up",
      icon: <FiUsers />,
      color: "var(--primary)",
      bgColor: "rgba(79, 70, 229, 0.1)",
    },
    {
      title: "Active Clusters",
      value: "48",
      change: "+3.2%",
      trend: "up",
      icon: <FiLayers />,
      color: "var(--success)",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Active Loans",
      value: "$184.5K",
      change: "-2.1%",
      trend: "down",
      icon: <FiDollarSign />,
      color: "var(--warning)",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      title: "Pending Proposals",
      value: "18",
      change: "+5",
      trend: "neutral",
      icon: <FiFileText />,
      color: "var(--accent)",
      bgColor: "rgba(139, 92, 246, 0.1)",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "applied for a loan",
      time: "10 min ago",
      type: "loan",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      action: "created a new cluster",
      time: "25 min ago",
      type: "cluster",
    },
    {
      id: 3,
      user: "Mike Wilson",
      action: "submitted a proposal",
      time: "1 hour ago",
      type: "proposal",
    },
    {
      id: 4,
      user: "Emma Davis",
      action: "completed repayment",
      time: "2 hours ago",
      type: "repayment",
    },
  ];

  return (
    <div className="admin-overview">
      {/* Header */}
      <div className="overview-header">
        <div className="header-content">
          <h1 className="overview-title">Dashboard Overview</h1>
          <p className="overview-subtitle">
            Welcome back! Here's what's happening with your platform today.
          </p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary">
            <FiActivity /> Generate Report
          </button>
          <button className="btn btn-secondary">
            <FiClock /> View Timeline
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div
                className="stat-icon-wrapper"
                style={{ backgroundColor: stat.bgColor, color: stat.color }}>
                {stat.icon}
              </div>
              <div className={`stat-change ${stat.trend}`}>
                {stat.change}
                {stat.trend === "up" && " ↗"}
                {stat.trend === "down" && " ↘"}
              </div>
            </div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
            <div className="stat-progress">
              <div
                className="progress-bar"
                style={{
                  width:
                    stat.trend === "up"
                      ? "75%"
                      : stat.trend === "down"
                      ? "40%"
                      : "60%",
                  backgroundColor: stat.color,
                }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="overview-content">
        {/* Left Column - Tables */}
        <div className="content-column">
          {/* Recent Users Table */}
          <div className="content-card">
            <div className="card-header">
              <div className="card-title">
                <FiUsers /> Recent Individual Users
              </div>
              <a href="/admin/users" className="card-action">
                View All <FiChevronRight />
              </a>
            </div>
            <div className="card-content">
              <UserTable compact={true} />
            </div>
          </div>

          {/* Recent Clusters Table */}
          <div className="content-card">
            <div className="card-header">
              <div className="card-title">
                <FiLayers /> Recent Clusters
              </div>
              <a href="/admin/clusters" className="card-action">
                View All <FiChevronRight />
              </a>
            </div>
            <div className="card-content">
              <ClusterTable compact={true} />
            </div>
          </div>
        </div>

        {/* Right Column - Widgets */}
        <div className="sidebar-column">
          {/* Activity Feed */}
          <div className="sidebar-card">
            <div className="card-header">
              <div className="card-title">
                <FiActivity /> Recent Activity
              </div>
              <button className="card-action">Refresh</button>
            </div>
            <div className="card-content">
              <ActivityFeed activities={recentActivities} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="sidebar-card">
            <div className="card-header">
              <div className="card-title">
                <FiTrendingUp /> Platform Health
              </div>
            </div>
            <div className="card-content">
              <div className="quick-stats">
                <div className="quick-stat-item">
                  <div className="stat-icon success">
                    <FiCheckCircle />
                  </div>
                  <div className="stat-details">
                    <div className="stat-number">98.5%</div>
                    <div className="stat-label">Success Rate</div>
                  </div>
                </div>
                <div className="quick-stat-item">
                  <div className="stat-icon warning">
                    <FiClock />
                  </div>
                  <div className="stat-details">
                    <div className="stat-number">2.4 hrs</div>
                    <div className="stat-label">Avg Response Time</div>
                  </div>
                </div>
                <div className="quick-stat-item">
                  <div className="stat-icon primary">
                    <FiUsers />
                  </div>
                  <div className="stat-details">
                    <div className="stat-number">92%</div>
                    <div className="stat-label">User Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Announcements */}
      <div className="sidebar-card">
        <div className="card-header">
          <div className="card-title">
            <FiFileText /> Announcements
          </div>
        </div>
        <div className="card-content">
          <div className="announcements-list">
            <div className="announcement-item">
              <span className="announcement-badge new">New</span>
              <p className="announcement-text">
                New loan categories added for agriculture sector.
              </p>
              <span className="announcement-time">Yesterday</span>
            </div>
            <div className="announcement-item">
              <span className="announcement-badge update">Update</span>
              <p className="announcement-text">
                System maintenance scheduled for Sunday, 2 AM - 4 AM.
              </p>
              <span className="announcement-time">2 days ago</span>
            </div>
            <div className="announcement-item">
              <span className="announcement-badge feature">Feature</span>
              <p className="announcement-text">
                New reporting dashboard available for cluster leaders.
              </p>
              <span className="announcement-time">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
