import React, { useState } from "react";
import { FiSearch, FiFilter, FiDownload, FiPlus } from "react-icons/fi";
import styles from "../../../styles/adminloan.module.css";

const AdminLoanList = ({
  loans,
  onViewLoan,
  onEditLoan,
  onDeleteLoan,
  onStatusUpdate,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter loans
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.fullName.toLowerCase().includes(search.toLowerCase()) ||
      loan.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || loan.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const stats = {
    total: loans.length,
    pending: loans.filter((l) => l.status === "Pending").length,
    approved: loans.filter((l) => l.status === "Approved").length,
    disbursed: loans.filter((l) => l.status === "Disbursed").length,
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className={styles.loanPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Loan Applications</h1>
          <p className={styles.pageSubtitle}>Review and manage loan requests</p>
        </div>
        <div className={styles.pageHeaderActions}>
          <button className={`${styles.btn} ${styles.btnSecondary}`}>
            <FiDownload /> Export
          </button>
          <button className={`${styles.btn} ${styles.btnPrimary}`}>
            <FiPlus /> New Loan
          </button>
        </div>
      </div>

      {/* Controls Row */}
      <div className={styles.controlsRow}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search loans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterContainer}>
          <select
            className={styles.filterSelect}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="disbursed">Disbursed</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsContainer}>
        <div className={`${styles.statCard} ${styles.total}`}>
          <div className={styles.statIcon}>
            <span>📋</span>
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.total}</div>
            <div className={styles.statLabel}>Total Loans</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.pending}`}>
          <div className={styles.statIcon}>
            <span>⏳</span>
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.pending}</div>
            <div className={styles.statLabel}>Pending</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.approved}`}>
          <div className={styles.statIcon}>
            <span>✅</span>
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.approved}</div>
            <div className={styles.statLabel}>Approved</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.disbursed}`}>
          <div className={styles.statIcon}>
            <span>💰</span>
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.disbursed}</div>
            <div className={styles.statLabel}>Disbursed</div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableWrapper}>
          <table className={styles.loanTable}>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyRow}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📄</div>
                      <h4>No loans found</h4>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => (
                  <tr key={loan.id} className={styles.tableRow}>
                    <td className={styles.cellId}>
                      <span className={styles.loanId}>#{loan.id}</span>
                    </td>
                    <td className={styles.cellUser}>
                      <div className={styles.userWrapper}>
                        <div className={styles.userName}>{loan.fullName}</div>
                        <div className={styles.userEmail}>{loan.email}</div>
                      </div>
                    </td>
                    <td className={styles.cellAmount}>
                      <div className={styles.amountValue}>
                        {formatCurrency(loan.amount)}
                      </div>
                    </td>
                    <td className={styles.cellType}>
                      <span className={styles.loanType}>{loan.type}</span>
                    </td>
                    <td className={styles.cellStatus}>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[loan.status.toLowerCase()]
                        }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className={styles.cellDate}>
                      <div className={styles.dateText}>{loan.dateApplied}</div>
                    </td>
                    <td className={styles.cellActions}>
                      <button
                        className={styles.viewBtn}
                        onClick={() => onViewLoan(loan.id)}>
                        View
                      </button>
                      <button
                        className={styles.editsBtn}
                        onClick={() => onEditLoan(loan.id)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminLoanList;
