import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEdit,
  FiTrash2,
  FiEye,
  FiDownload,
} from "react-icons/fi";
import styles from "../../../styles/adminUsers.module.css";

const Users = ({
  users,
  onViewUser,
  onEditUser,
  onDeleteUser,
  onCreateUser,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    type: "Individual",
    state: "",
    businessName: "",
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      search === "" ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.businessName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "all" || user.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "Active").length,
    pendingUsers: users.filter((u) => u.status === "Pending").length,
    blockedUsers: users.filter((u) => u.status === "Blocked").length,
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    onCreateUser(newUser);
    setShowNewModal(false);
    setNewUser({
      name: "",
      email: "",
      phone: "",
      type: "Individual",
      state: "",
      businessName: "",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.adminUsers}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Users</h1>
          <p className={styles.subtitle}>Manage all registered users</p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => console.log("Export")}>
            <FiDownload /> Export
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setShowNewModal(true)}>
            <FiPlus /> Add User
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalUsers}</div>
            <div className={styles.statLabel}>Total Users</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
            <FiCheckCircle />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.activeUsers}</div>
            <div className={styles.statLabel}>Active</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
            <FiClock />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.pendingUsers}</div>
            <div className={styles.statLabel}>Pending</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconRed}`}>
            <FiXCircle />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.blockedUsers}</div>
            <div className={styles.statLabel}>Blocked</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterBox}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>User</th>
              <th className={styles.th}>Type</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Registration Date</th>
              <th className={styles.th}>Location</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.noData}>
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>{user.name.charAt(0)}</div>
                      <div>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.typeBadge} ${
                        user.type === "Business"
                          ? styles.typeBusiness
                          : styles.typeIndividual
                      }`}>
                      {user.type}
                    </span>
                  </td>
                  <td className={styles.td}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[`status${user.status}`]
                      }`}>
                      {user.status === "Active" ? (
                        <FiCheckCircle />
                      ) : user.status === "Pending" ? (
                        <FiClock />
                      ) : (
                        <FiXCircle />
                      )}
                      {user.status}
                    </span>
                  </td>
                  <td className={styles.td}>{formatDate(user.joined)}</td>
                  <td className={styles.td}>{user.state}</td>
                  <td className={styles.td}>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        onClick={() => onViewUser(user.id)}>
                        <FiEye /> View
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.editBtn}`}
                        onClick={() => onEditUser(user.id)}>
                        <FiEdit /> Edit
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.deleteBtn}`}
                        onClick={() => onDeleteUser(user.id)}>
                        <FiTrash2 /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* New User Modal */}
      {showNewModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Add New User</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowNewModal(false)}>
                &times;
              </button>
            </div>
            <div className={styles.modalContent}>
              <form onSubmit={handleCreateUser}>
                <div className={styles.formGroup}>
                  <label>Full Name *</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    name="name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    className={styles.formControl}
                    name="email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    className={styles.formControl}
                    name="phone"
                    value={newUser.phone}
                    onChange={handleNewUserChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>User Type *</label>
                  <select
                    className={styles.formControl}
                    name="type"
                    value={newUser.type}
                    onChange={handleNewUserChange}
                    required>
                    <option value="Individual">Individual</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>State</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    name="state"
                    value={newUser.state}
                    onChange={handleNewUserChange}
                    placeholder="Enter state"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Business Name</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    name="businessName"
                    value={newUser.businessName}
                    onChange={handleNewUserChange}
                    placeholder="Enter business name"
                  />
                </div>
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => setShowNewModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnPrimary}`}>
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
