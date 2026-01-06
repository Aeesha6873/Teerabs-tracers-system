import React from "react";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiUser,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import styles from "../../../styles/adminUsers.module.css";

const ViewUser = ({ user, onEdit, onDelete, onBack }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
          <p className={styles.subtitle}>User ID: {user.id}</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={`${styles.btn} ${styles.editBtn}`}
            onClick={() => onEdit(user.id)}>
            <FiEdit /> Edit User
          </button>
          <button
            className={`${styles.btn} ${styles.deleteBtn}`}
            onClick={() => onDelete(user.id)}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>{user.name.charAt(0)}</div>
        <div className={styles.profileInfo}>
          <h2>{user.fullName}</h2>
          <p>{user.email}</p>
          <div className={styles.profileMeta}>
            <span
              className={`${styles.statusBadge} ${
                styles[`status${user.status}`]
              }`}>
              {user.status}
            </span>
            <span className={styles.typeBadge}>{user.type} User</span>
            <span className={styles.dateJoined}>
              Joined {formatDate(user.joined)}
            </span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className={styles.content}>
        {/* Personal Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiUser className={styles.sectionIcon} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Full Name</label>
              <div className={styles.infoValue}>{user.fullName}</div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiMail /> Email Address
              </label>
              <div className={styles.infoValue}>{user.email}</div>
            </div>
            <div className={styles.infoItem}>
              <label>
                <FiPhone /> Phone Number
              </label>
              <div className={styles.infoValue}>{user.phone}</div>
            </div>
            <div className={styles.infoItem}>
              <label>User Type</label>
              <div className={styles.infoValue}>{user.type}</div>
            </div>
            <div className={styles.infoItem}>
              <label>Registration Date</label>
              <div className={styles.infoValue}>{formatDate(user.joined)}</div>
            </div>
            <div className={styles.infoItem}>
              <label>Status</label>
              <div className={styles.infoValue}>
                <span
                  className={`${styles.statusBadge} ${
                    styles[`status${user.status}`]
                  }`}>
                  {user.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiMapPin className={styles.sectionIcon} />
            <h3>Location Details</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>State</label>
              <div className={styles.infoValue}>{user.state}</div>
            </div>
            <div className={styles.infoItem}>
              <label>LGA</label>
              <div className={styles.infoValue}>{user.lga}</div>
            </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiCreditCard className={styles.sectionIcon} />
            <h3>Identity Details</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>BVN</label>
              <div className={styles.infoValue}>{user.bvn}</div>
            </div>
            <div className={styles.infoItem}>
              <label>NIN</label>
              <div className={styles.infoValue}>{user.nin}</div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        {user.type === "Business" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiBriefcase className={styles.sectionIcon} />
              <h3>Business Details</h3>
            </div>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Business Name</label>
                <div className={styles.infoValue}>{user.businessName}</div>
              </div>
              <div className={styles.infoItem} style={{ gridColumn: "1 / -1" }}>
                <label>Business Proposal</label>
                <div className={styles.infoValue}>{user.proposal}</div>
              </div>
            </div>
          </div>
        )}

        {/* Bank Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiDollarSign className={styles.sectionIcon} />
            <h3>Bank Details</h3>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Bank Name</label>
              <div className={styles.infoValue}>{user.bankName}</div>
            </div>
            <div className={styles.infoItem}>
              <label>Account Name</label>
              <div className={styles.infoValue}>{user.accountName}</div>
            </div>
            <div className={styles.infoItem}>
              <label>Account Number</label>
              <div className={styles.infoValue}>{user.accountNumber}</div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiFileText className={styles.sectionIcon} />
            <h3>Documents</h3>
          </div>
          <div className={styles.documents}>
            <div className={styles.documentItem}>
              <div className={styles.documentIcon}>📄</div>
              <div className={styles.documentInfo}>
                <div className={styles.documentName}>ID Verification</div>
                <div className={styles.documentStatus}>Verified</div>
              </div>
            </div>
            <div className={styles.documentItem}>
              <div className={styles.documentIcon}>🏦</div>
              <div className={styles.documentInfo}>
                <div className={styles.documentName}>Bank Statement</div>
                <div className={styles.documentStatus}>Pending</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
