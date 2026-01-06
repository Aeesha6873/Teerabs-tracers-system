import React, { useState } from "react";
import { FiSearch, FiDownload, FiPlus, FiUser } from "react-icons/fi";
import OnboardingUserCard from "./OnboardingUserCard";
import styles from "../../../styles/onboarding.module.css";

const AdminOnboardingDashboard = ({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onUpdateStatus,
  onAddUser,
  onViewMap,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const stats = {
    total: users.length,
    pending: users.filter((u) => u.status === "Pending Verification").length,
    review: users.filter((u) => u.status === "Under Review").length,
    approved: users.filter((u) => u.status === "Approved").length,
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search) ||
      user.nin.includes(search);

    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && user.status === "Pending Verification") ||
      (filter === "review" && user.status === "Under Review") ||
      (filter === "approved" && user.status === "Approved");

    return matchesSearch && matchesFilter;
  });

  const handleApproveUser = (userId) => {
    onUpdateStatus(userId, "Approved");
  };

  const handleMarkForReview = (userId) => {
    onUpdateStatus(userId, "Under Review");
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>User Onboarding</h1>
          <p className={styles.subtitle}>
            Manage user registration and verification process
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            <FiDownload /> Export List
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => onAddUser()}>
            <FiPlus /> Register New User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statTotal}`}>
            <FiUser />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Users</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statPending}`}>
            <span className={styles.statNumber}>{stats.pending}</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.pending}</div>
            <div className={styles.statLabel}>Pending Verification</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statReview}`}>
            <span className={styles.statNumber}>{stats.review}</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.review}</div>
            <div className={styles.statLabel}>Under Review</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statApproved}`}>
            <span className={styles.statNumber}>{stats.approved}</span>
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.approved}</div>
            <div className={styles.statLabel}>Approved</div>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users by name, email, phone or NIN..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterWrapper}>
          <select
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Users</option>
            <option value="pending">Pending Verification</option>
            <option value="review">Under Review</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>User Information</div>
            <div className={styles.headerCell}>Location</div>
            <div className={styles.headerCell}>Onboarding Progress</div>
            <div className={styles.headerCell}>Status</div>
            <div className={styles.headerCell}>Registration Date</div>
            <div className={styles.headerCell}>Actions</div>
          </div>

          <div className={styles.tableBody}>
            {filteredUsers.length === 0 ? (
              <div className={styles.emptyTable}>
                <div className={styles.emptyIcon}>
                  <FiUser />
                </div>
                <h3>No users found</h3>
                <p>Try adjusting your search or filters</p>
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => {
                    setSearch("");
                    setFilter("all");
                  }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <OnboardingUserCard
                  key={user.id}
                  user={user}
                  onView={onViewUser}
                  onEdit={onEditUser}
                  onDelete={onDeleteUser}
                  onApprove={handleApproveUser}
                  onReview={handleMarkForReview}
                  onViewMap={onViewMap}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOnboardingDashboard;
