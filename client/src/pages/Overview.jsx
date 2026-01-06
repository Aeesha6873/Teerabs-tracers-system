import React from "react";
import {
  FiCheckCircle,
  FiXCircle,
  FiPlusCircle,
  FiDollarSign,
  FiCreditCard,
  FiEye,
  FiTrendingUp,
  FiPackage,
  FiClock,
  FiArrowRight,
  FiBell,
  FiActivity,
  FiShield,
} from "react-icons/fi";
import "../styles/overview.css";

export default function Overview({ loggedInUser }) {
  return (
    <div className="overview-page">
      {/* Header - Same as Evaluation */}
      <div className="overview-header">
        <div className="header-content">
          <h1 className="header-title">
            Welcome back, {loggedInUser?.name || "User"}! 👋
          </h1>
          <p className="header-subtitle">
            Monitor your loans, track payments, and manage your financial
            journey in one place.
          </p>
          <div className="header-badges">
            <div className="header-badge">
              <FiBell size={14} />
              <span>Real-time updates</span>
            </div>
            <div className="header-badge">
              <FiActivity size={14} />
              <span>Smart insights</span>
            </div>
            <div className="header-badge">
              <FiShield size={14} />
              <span>Secure & reliable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Same style as profile stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <span className="stat-value">0</span>
          <span className="stat-label">Active Loans</span>
          <span className="stat-trend">
            <FiTrendingUp /> No change
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiClock />
          </div>
          <span className="stat-value">0</span>
          <span className="stat-label">Pending Approvals</span>
          <span className="stat-trend">
            <FiTrendingUp /> Stable
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiCheckCircle />
          </div>
          <span className="stat-value">0</span>
          <span className="stat-label">Completed Loans</span>
          <span className="stat-trend">
            <FiTrendingUp /> 100% success
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <span className="stat-value">$0</span>
          <span className="stat-label">Outstanding Balance</span>
          <span className="stat-trend">
            <FiTrendingUp /> $0 total
          </span>
        </div>
      </div>

      {/* Quick Actions - Same style as detail cards */}
      <div className="quick-actions">
        <div className="action-card">
          <div className="actions-icon">
            <FiPlusCircle />
          </div>
          <h3 className="action-title">Apply for Loan</h3>
          <p className="action-description">
            Start a new loan application with competitive rates and flexible
            repayment options.
          </p>
          <button className="action-button">Get Started</button>
        </div>

        <div className="action-card">
          <div className="actions-icon">
            <FiCreditCard />
          </div>
          <h3 className="action-title">Make Payment</h3>
          <p className="action-description">
            Secure payment processing with multiple methods. Schedule or make
            one-time payments.
          </p>
          <button className="action-button">Pay Now</button>
        </div>

        <div className="action-card">
          <div className="actions-icon">
            <FiEye />
          </div>
          <h3 className="action-title">View Analytics</h3>
          <p className="action-description">
            Detailed insights and analytics about your loan portfolio and
            financial health.
          </p>
          <button className="action-button">View Dashboard</button>
        </div>
      </div>

      {/* Activity Section - Same style as details section */}
      <div className="activity-section">
        <div className="activity-header">
          <h2 className="activity-title">
            <FiActivity size={18} /> Recent Activity
          </h2>
          <button className="view-all-btn">
            View All <FiArrowRight />
          </button>
        </div>

        <div className="activity-feed">
          <div className="activities-item approved">
            <div className="activity-icon">
              <FiCheckCircle />
            </div>
            <div className="activity-content">
              <p>Your personal loan application has been approved</p>
              <span className="activity-time">3 mins ago</span>
            </div>
            <span className="activity-status">
              <FiCheckCircle /> Approved
            </span>
          </div>

          <div className="activities-item rejected">
            <div className="activity-icon">
              <FiXCircle />
            </div>
            <div className="activity-content">
              <p>Business loan requires additional documentation</p>
              <span className="activity-time">1 hour ago</span>
            </div>
            <span className="activity-status">
              <FiXCircle /> Action Required
            </span>
          </div>

          <div className="activities-item submitted">
            <div className="activity-icon">
              <FiPlusCircle />
            </div>
            <div className="activity-content">
              <p>New home renovation loan submitted for review</p>
              <span className="activity-time">Yesterday</span>
            </div>
            <span className="activity-status">
              <FiClock /> Under Review
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
