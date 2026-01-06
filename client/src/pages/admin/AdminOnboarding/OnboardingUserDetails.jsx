import styles from "../../../styles/onboarding.module.css";
// OnboardingUserDetails.jsx - Complete User Details View
import React from "react";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiMail,
  FiPhone,
  FiUser,
  FiBriefcase,
  FiHome,
  FiFileText,
  FiDollarSign,
  FiUsers,
  FiMap,
  FiCalendar,
  FiShield,
  FiPercent,
} from "react-icons/fi";

const OnboardingUserDetail = ({
  user,
  onEdit,
  onDelete,
  onBack,
  onUpdateStatus,
  onViewMap,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "#10b981";
      case "Under Review":
        return "#3b82f6";
      case "Pending Verification":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case "Approved":
        return "rgba(16, 185, 129, 0.1)";
      case "Under Review":
        return "rgba(59, 130, 246, 0.1)";
      case "Pending Verification":
        return "rgba(245, 158, 11, 0.1)";
      default:
        return "rgba(107, 114, 128, 0.1)";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "#10b981";
    if (progress >= 50) return "#3b82f6";
    return "#f59e0b";
  };

  const getRegistrationTypeLabel = (type) => {
    switch (type) {
      case "individual":
        return "Individual User";
      case "business":
        return "Business Account";
      case "cluster":
        return "Cluster Group";
      default:
        return type;
    }
  };

  const handleApprove = () => {
    if (window.confirm(`Approve ${user.name}? This action cannot be undone.`)) {
      onUpdateStatus(user.id, "Approved");
      onBack();
    }
  };

  const handleMarkForReview = () => {
    if (window.confirm(`Mark ${user.name} for review?`)) {
      onUpdateStatus(user.id, "Under Review");
      onBack();
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${user.name}? This action cannot be undone.`
      )
    ) {
      onDelete(user.id);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to Users
        </button>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>User Details</h1>
          <p className={styles.subtitle}>Complete profile information</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => onViewMap(user.id)}>
            <FiMap /> View on Map
          </button>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => onEdit(user.id)}>
            <FiEdit /> Edit User
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div
          className={styles.largeAvatar}
          style={{ backgroundColor: user.avatarColor }}>
          {user.name.charAt(0)}
        </div>
        <div className={styles.profileInfo}>
          <h2>{user.name}</h2>
          <p>{getRegistrationTypeLabel(user.registrationType)}</p>
          <div className={styles.profileMeta}>
            <span
              className={styles.statusBadge}
              style={{
                backgroundColor: getStatusBgColor(user.status),
                color: getStatusColor(user.status),
                borderColor: getStatusColor(user.status),
              }}>
              {user.status}
            </span>
            <span className={styles.dateJoined}>
              <FiCalendar /> Joined {formatDate(user.date)}
            </span>
          </div>
          <div className={styles.detailProgressWrapper}>
            <div className={styles.detailProgressHeader}>
              <span>Onboarding Progress</span>
              <span>{user.onboardingProgress}% Complete</span>
            </div>
            <div className={styles.detailProgressBar}>
              <div
                className={styles.detailProgressFill}
                style={{
                  width: `${user.onboardingProgress}%`,
                  backgroundColor: getProgressColor(user.onboardingProgress),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.statusActions}>
        <div className={styles.statusInfo}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Verification Stage</span>
            <span className={styles.statusValue}>
              {user.verificationStage === "document_upload"
                ? "Document Upload"
                : user.verificationStage === "verification"
                ? "Under Verification"
                : "Completed"}
            </span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Registration Type</span>
            <span className={styles.statusValue}>
              {getRegistrationTypeLabel(user.registrationType)}
            </span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Completion</span>
            <span className={styles.statusValue}>
              {user.onboardingProgress}%
            </span>
          </div>
        </div>
        <div className={styles.detailActionButtons}>
          {user.status !== "Approved" && (
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleApprove}>
              <FiCheckCircle /> Approve User
            </button>
          )}
          {user.status === "Pending Verification" && (
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleMarkForReview}>
              <FiClock /> Mark for Review
            </button>
          )}
          <button
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={() => onViewMap(user.id)}>
            <FiMapPin /> View Location
          </button>
          <button
            className={`${styles.btn} ${styles.cancelBtn}`}
            onClick={handleDelete}
            style={{ background: "#fef2f2", color: "#dc2626" }}>
            <FiTrash2 /> Delete User
          </button>
        </div>
      </div>

      {/* Main Content - ALL User Details */}
      <div className={styles.content}>
        {/* Section 1: Personal Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiUser className={styles.sectionIcon} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>
                <FiUser /> Full Name
              </label>
              <div className={styles.infoValue}>{user.name}</div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiShield /> NIN (National Identification Number)
              </label>
              <div className={styles.infoValue}>{user.nin}</div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiShield /> BVN (Bank Verification Number)
              </label>
              <div className={styles.infoValue}>{user.bvn}</div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiMail /> Email Address
              </label>
              <div className={styles.infoValue}>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiPhone /> Phone Number
              </label>
              <div className={styles.infoValue}>
                <a href={`tel:${user.phone}`}>{user.phone}</a>
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiPercent /> Onboarding Progress
              </label>
              <div className={styles.infoValue}>
                <div
                  className={styles.progressBar}
                  style={{ marginTop: "8px" }}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${user.onboardingProgress}%`,
                      backgroundColor: getProgressColor(
                        user.onboardingProgress
                      ),
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", color: "#64748b" }}>
                  {user.onboardingProgress}% -{" "}
                  {user.onboardingProgress === 100
                    ? "Complete"
                    : user.onboardingProgress >= 50
                    ? "In Progress"
                    : "Started"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Address & Location */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiHome className={styles.sectionIcon} />
            <h3>Address & Location</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>
                <FiHome /> Full Address
              </label>
              <div className={styles.infoValue}>{user.address}</div>
            </div>
            <div className={styles.infoItem}>
              <label>State</label>
              <div className={styles.infoValue}>{user.state}</div>
            </div>
            <div className={styles.infoItem}>
              <label>Local Government Area (LGA)</label>
              <div className={styles.infoValue}>{user.lga}</div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiMap /> Geographic Coordinates
              </label>
              <div className={styles.infoValue}>
                Latitude: {user.location?.lat?.toFixed(6) || "N/A"}
                <br />
                Longitude: {user.location?.lng?.toFixed(6) || "N/A"}
              </div>
            </div>
            <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
              <label>Map Location</label>
              <div className={styles.infoValue}>
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => onViewMap(user.id)}
                  style={{ marginTop: "8px" }}>
                  <FiMapPin /> Open in Maps
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Business Information (Conditional) */}
        {user.registrationType !== "individual" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiBriefcase className={styles.sectionIcon} />
              <h3>Business Information</h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Business Name</label>
                <div className={styles.infoValue}>{user.businessName}</div>
              </div>
              <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                <label>Business Proposal</label>
                <div
                  className={styles.infoValue}
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.6",
                    padding: "12px",
                    background: "#f8fafc",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}>
                  {user.proposal || "No proposal provided"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Cluster Information (Conditional) */}
        {user.registrationType === "cluster" && user.clusterMembers && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiUsers className={styles.sectionIcon} />
              <h3>Cluster Members</h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Cluster Name</label>
                <div className={styles.infoValue}>
                  {user.clusterName || "Unnamed Cluster"}
                </div>
              </div>
              <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                <label>Cluster Members ({user.clusterMembers.length})</label>
                <div
                  className={styles.infoValue}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}>
                  {user.clusterMembers.map((member, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "12px",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <div>
                        <div style={{ fontWeight: "500" }}>{member.name}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>
                          {member.email} • {member.phone}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          background: "#dbeafe",
                          color: "#1d4ed8",
                          padding: "2px 8px",
                          borderRadius: "12px",
                        }}>
                        Member {index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Bank Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiDollarSign className={styles.sectionIcon} />
            <h3>Bank Details</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Bank Name</label>
              <div className={styles.infoValue}>
                {user.bankName || "Not provided"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>Account Name</label>
              <div className={styles.infoValue}>
                {user.accountName || "Not provided"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>Account Number</label>
              <div className={styles.infoValue}>
                {user.accountNumber || "Not provided"}
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Documents & Verification */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiFileText className={styles.sectionIcon} />
            <h3>Documents & Verification</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Status</label>
              <div className={styles.infoValue}>
                <span
                  className={styles.statusBadge}
                  style={{
                    backgroundColor: getStatusBgColor(user.status),
                    color: getStatusColor(user.status),
                    borderColor: getStatusColor(user.status),
                  }}>
                  {user.status}
                </span>
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>Verification Stage</label>
              <div className={styles.infoValue}>
                {user.verificationStage === "document_upload"
                  ? "📄 Document Upload"
                  : user.verificationStage === "verification"
                  ? "🔍 Under Verification"
                  : "✅ Completed"}
              </div>
            </div>
            <div className={styles.infoItem}>
              <label>Registration Date</label>
              <div className={styles.infoValue}>{formatDate(user.date)}</div>
            </div>
            <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
              <label>Uploaded Documents</label>
              <div className={styles.infoValue}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginTop: "8px",
                  }}>
                  {user.documents?.map((doc, index) => (
                    <div
                      key={index}
                      style={{
                        padding: "10px 14px",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}>
                      <FiFileText style={{ color: "#64748b" }} />
                      <span>{doc}</span>
                      <span
                        style={{
                          marginLeft: "auto",
                          fontSize: "11px",
                          color: "#10b981",
                          background: "#d1fae5",
                          padding: "2px 8px",
                          borderRadius: "12px",
                        }}>
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: Admin Actions */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiShield className={styles.sectionIcon} />
            <h3>Admin Actions</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>User ID</label>
              <div
                className={styles.infoValue}
                style={{ fontFamily: "monospace", color: "#6b7280" }}>
                #{user.id.toString().padStart(6, "0")}
              </div>
            </div>
            <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
              <label>Quick Actions</label>
              <div
                className={styles.infoValue}
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginTop: "12px",
                }}>
                <button
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  onClick={() => onEdit(user.id)}>
                  <FiEdit /> Edit User Details
                </button>
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => onViewMap(user.id)}>
                  <FiMapPin /> View on Map
                </button>
                {user.status !== "Approved" && (
                  <button
                    className={`${styles.btn}`}
                    style={{
                      background: "#10b981",
                      color: "white",
                    }}
                    onClick={handleApprove}>
                    <FiCheckCircle /> Approve User
                  </button>
                )}
                {user.status === "Pending Verification" && (
                  <button
                    className={`${styles.btn}`}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                    }}
                    onClick={handleMarkForReview}>
                    <FiClock /> Mark for Review
                  </button>
                )}
                <button
                  className={`${styles.btn}`}
                  style={{
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                  }}
                  onClick={handleDelete}>
                  <FiTrash2 /> Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingUserDetail;
