import React from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiDownload,
  FiEdit3,
  FiRefreshCw,
  FiShield,
  FiCalendar,
  FiCreditCard,
  FiBriefcase,
  FiBarChart2,
  FiLock,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import "../styles/evaluation.css";

const Evaluation = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  if (!loggedInUser) {
    return (
      <div className="evaluation-page">
        <div className="evaluation-header">
          <div className="header-content">
            <h2 className="header-title">Account Evaluation</h2>
            <p className="header-subtitle">
              Please log in to view your profile
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="evaluation-page">
      <div className="evaluation-header">
        <div className="header-content">
          <h2 className="header-title">Account Evaluation</h2>
          <p className="header-subtitle">
            Last updated: {formatDate()} • Real-time monitoring
          </p>
        </div>
      </div>

      {loggedInUser.accountType === "individual" && (
        <div className="profile-hero">
          <div className="profile-card-modern">
            <div className="avatar-container">
              <div className="avatar-3d">
                <div className="avatar-main">
                  {getInitials(loggedInUser.fullName)}
                </div>
                <div className="avatar-ring" />
              </div>
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{loggedInUser.fullName}</h2>
              <div className="profile-tag">
                <FiZap size={12} />
                Individual Premium Account
              </div>

              <div className="stats-grid-modern">
                <div className="stat-modern">
                  <span className="stat-value-modern">0</span>
                  <span className="stat-label-modern">Active Loans</span>
                </div>
                <div className="stat-modern">
                  <span className="stat-value-modern">0</span>
                  <span className="stat-label-modern">Completed</span>
                </div>
                <div className="stat-modern">
                  <span className="stat-value-modern">100%</span>
                  <span className="stat-label-modern">Success Rate</span>
                </div>
                <div className="stat-modern">
                  <span className="stat-value-modern">$0</span>
                  <span className="stat-label-modern">Total Balance</span>
                </div>
              </div>

              <div
                className={`status-glow ${
                  loggedInUser.businessAccepted
                    ? "status-active"
                    : "status-pending"
                }`}>
                <FiShield size={10} />
                {loggedInUser.businessAccepted
                  ? "Verified Account"
                  : "Verification Pending"}
              </div>
            </div>
          </div>

          <div className="details-section">
            <div className="details-header">
              <h3 className="details-title">
                <FiTarget size={16} /> Account Details
              </h3>
              <button className="btn-modern btn-secondary-glass">
                <FiEdit3 size={12} /> Edit Profile
              </button>
            </div>

            <div className="details-grid-neon">
              <div className="detail-card-neon">
                <div className="detail-icon-neon">
                  <FiUser size={16} />
                </div>
                <div className="detail-label-neon">Full Name</div>
                <div className="detail-value-neon">{loggedInUser.fullName}</div>
              </div>

              <div className="detail-card-neon">
                <div className="detail-icon-neon">
                  <FiMail size={16} />
                </div>
                <div className="detail-label-neon">Email Address</div>
                <div className="detail-value-neon">{loggedInUser.email}</div>
              </div>

              <div className="detail-card-neon">
                <div className="detail-icon-neon">
                  <FiPhone size={16} />
                </div>
                <div className="detail-label-neon">Phone Number</div>
                <div className="detail-value-neon">{loggedInUser.phone}</div>
              </div>

              <div className="detail-card-neon">
                <div className="detail-icon-neon">
                  <FiBriefcase size={16} />
                </div>
                <div className="detail-label-neon">Business Status</div>
                <div className="detail-value-neon">
                  {loggedInUser.businessAccepted ? "Approved" : "Under Review"}
                </div>
                <div
                  className={`status-glow ${
                    loggedInUser.businessAccepted
                      ? "status-active"
                      : "status-pending"
                  }`}>
                  {loggedInUser.businessAccepted ? "✓ Active" : "⏳ Processing"}
                </div>
              </div>

              <div className="detail-card-neon">
                <div className="detail-icon-neon">
                  <FiCalendar size={16} />
                </div>
                <div className="detail-label-neon">Member Since</div>
                <div className="detail-value-neon">{formatDate()}</div>
              </div>

              <div className="detail-card-neon">
                <div className="detail-icon-neon">
                  <FiLock size={16} />
                </div>
                <div className="detail-label-neon">Security Level</div>
                <div className="detail-value-neon">Enhanced Protection</div>
                <div className="status-glow status-active">
                  <FiCheckCircle size={10} /> Secured
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Evaluation;
