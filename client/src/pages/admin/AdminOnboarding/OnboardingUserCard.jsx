import styles from "../../../styles/onboarding.module.css";
import React from "react";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const OnboardingUserCard = ({
  user,
  onView,
  onEdit,
  onDelete,
  onApprove,
  onReview,
  onViewMap,
}) => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "#10b981";
    if (progress >= 50) return "#3b82f6";
    return "#f59e0b";
  };

  return (
    <div className={styles.tableRow} onClick={() => onView(user.id)}>
      {/* User Information */}
      <div className={styles.tableCell}>
        <div className={styles.userCell}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: user.avatarColor }}>
            {user.name.charAt(0)}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userType}>
              {user.registrationType === "individual"
                ? "Individual"
                : user.registrationType === "business"
                ? "Business"
                : "Cluster"}
            </div>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className={styles.tableCell}>
        <div className={styles.locationCell}>
          <div className={styles.locationText}>
            {user.state}, {user.lga}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className={styles.tableCell}>
        <div className={styles.progressCell}>
          <div className={styles.progressWrapper}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${user.onboardingProgress}%`,
                  backgroundColor: getProgressColor(user.onboardingProgress),
                }}
              />
            </div>
            <span className={styles.progressText}>
              {user.onboardingProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={styles.tableCell}>
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

      {/* Date */}
      <div className={styles.tableCell}>
        <div className={styles.dateCell}>{formatDate(user.date)}</div>
      </div>

      {/* Actions */}
      <div className={styles.tableCell}>
        <div className={styles.actionButtons}>
          <button
            className={`${styles.actionBtn} ${styles.viewBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onView(user.id);
            }}
            title="View Details">
            <FiEye />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(user.id);
            }}
            title="Edit User">
            <FiEdit />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.mapBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewMap(user.id);
            }}
            title="View Location">
            <FiMapPin />
          </button>
          {user.status !== "Approved" && (
            <button
              className={`${styles.actionBtn} ${styles.approveBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                onApprove(user.id);
              }}
              title="Approve User">
              <FiCheckCircle />
            </button>
          )}
          {user.status === "Pending Verification" && (
            <button
              className={`${styles.actionBtn} ${styles.reviewBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                onReview(user.id);
              }}
              title="Mark for Review">
              <FiClock />
            </button>
          )}
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(user.id);
            }}
            title="Delete User">
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingUserCard;
