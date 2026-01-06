import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiCreditCard,
  FiCalendar,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";
import styles from "../../../styles/loanRepayment.module.css";

const LoanRepaymentsList = ({ loans, onViewLoan, onUpdateStatus }) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Filter loans
  const filteredLoans = loans.filter((loan) => {
    const matchesSearch =
      loan.user.toLowerCase().includes(search.toLowerCase()) ||
      loan.id.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      loan.repaymentStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: loans.length,
    paid: loans.filter((l) => l.repaymentStatus === "Paid").length,
    unpaid: loans.filter((l) => l.repaymentStatus === "Unpaid").length,
    partial: loans.filter((l) => l.repaymentStatus === "Partial").length,
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${typeof amount === "number" ? amount.toLocaleString() : amount}`;
  };

  // Quick status update
  const handleQuickUpdate = (loanId, status, e) => {
    e.stopPropagation();
    onUpdateStatus(loanId, status);
  };

  return (
    <div className={styles.loanPage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Loan Repayments</h1>
          <p className={styles.pageSubtitle}>
            Track and manage loan repayment status
          </p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.exportContainer}>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => setShowExportOptions(!showExportOptions)}>
              <FiDownload /> Export
            </button>
            {showExportOptions && (
              <div className={styles.exportDropdown}>
                <button className={styles.exportOption}>Export as CSV</button>
                <button className={styles.exportOption}>Export as PDF</button>
                <button className={styles.exportOption}>Export as Excel</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Controls Row */}
      <div className={styles.controlsRow}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by Loan ID or User..."
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
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="partial">Partial</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsContainer}>
        <div className={`${styles.statCard} ${styles.total}`}>
          <div className={styles.statIcon}>
            <FiCreditCard />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.total}</div>
            <div className={styles.statLabel}>Total Loans</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.paid}`}>
          <div className={styles.statIcon}>
            <FiCheck />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.paid}</div>
            <div className={styles.statLabel}>Paid</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.unpaid}`}>
          <div className={styles.statIcon}>
            <FiX />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.unpaid}</div>
            <div className={styles.statLabel}>Unpaid</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.partial}`}>
          <div className={styles.statIcon}>
            <FiTrendingUp />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.partial}</div>
            <div className={styles.statLabel}>Partial</div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      {/* Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitleRow}>
            <h3 className={styles.tableTitle}>Loan Repayments</h3>
            <span className={styles.tableCount}>
              {filteredLoans.length} loans
            </span>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.table}>
            {/* Table Head */}
            <div className={styles.tableHead}>
              <div className={styles.tableHeadRow}>
                <div className={styles.tableHeadCell}>Loan ID</div>
                <div className={styles.tableHeadCell}>User</div>
                <div className={styles.tableHeadCell}>Amount</div>
                <div className={styles.tableHeadCell}>Type</div>
                <div className={styles.tableHeadCell}>Status</div>
                <div className={styles.tableHeadCell}>Date</div>
                <div className={styles.tableHeadCell}>Repayment</div>
                <div className={styles.tableHeadCell}>Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className={styles.tableBody}>
              {filteredLoans.length === 0 ? (
                <div className={styles.emptyRow}>
                  <div className={styles.emptyCell}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📄</div>
                      <h4>No loans found</h4>
                      <p>Try adjusting your search or filters</p>
                    </div>
                  </div>
                </div>
              ) : (
                filteredLoans.map((loan) => (
                  <div key={loan.id} className={styles.tableRow}>
                    <div className={styles.tableCell}>
                      <span className={styles.loanId}>#{loan.id}</span>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.userCell}>
                        <FiUser className={styles.userIcon} />
                        <span className={styles.userName}>{loan.user}</span>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <span className={styles.amount}>
                        {formatCurrency(loan.amount)}
                      </span>
                    </div>
                    <div className={styles.tableCell}>
                      <span className={styles.loanType}>{loan.type}</span>
                    </div>
                    <div className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[loan.status.toLowerCase()]
                        }`}>
                        {loan.status}
                      </span>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.dateCell}>
                        <FiCalendar className={styles.dateIcon} />
                        <span>{loan.appliedDate}</span>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[loan.repaymentStatus.toLowerCase()]
                        }`}>
                        {loan.repaymentStatus}
                      </span>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.viewButton}
                          onClick={() => onViewLoan(loan.id)}>
                          View
                        </button>
                        <div className={styles.quickActions}>
                          <button
                            className={styles.quickAction}
                            onClick={(e) =>
                              handleQuickUpdate(loan.id, "Paid", e)
                            }
                            title="Mark as Paid">
                            <FiCheck />
                          </button>
                          <button
                            className={styles.quickAction}
                            onClick={(e) =>
                              handleQuickUpdate(loan.id, "Partial", e)
                            }
                            title="Mark as Partial">
                            <FiTrendingUp />
                          </button>
                          <button
                            className={styles.quickAction}
                            onClick={(e) =>
                              handleQuickUpdate(loan.id, "Unpaid", e)
                            }
                            title="Mark as Unpaid">
                            <FiX />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards (shown on small screens) */}
      <div className={styles.mobileCards}>
        {filteredLoans.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📄</div>
            <h4>No loans found</h4>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredLoans.map((loan) => (
            <div key={loan.id} className={styles.mobileCard}>
              <div className={styles.mobileCardHeader}>
                <span className={styles.mobileLoanId}>#{loan.id}</span>
                <span
                  className={`${styles.mobileStatusBadge} ${
                    styles[loan.repaymentStatus.toLowerCase()]
                  }`}>
                  {loan.repaymentStatus}
                </span>
              </div>
              <div className={styles.mobileCardBody}>
                <div className={styles.mobileInfoRow}>
                  <FiUser className={styles.mobileIcon} />
                  <span className={styles.mobileLabel}>User:</span>
                  <span className={styles.mobileValue}>{loan.user}</span>
                </div>
                <div className={styles.mobileInfoRow}>
                  <FiDollarSign className={styles.mobileIcon} />
                  <span className={styles.mobileLabel}>Amount:</span>
                  <span className={styles.mobileValue}>
                    {formatCurrency(loan.amount)}
                  </span>
                </div>
                <div className={styles.mobileInfoRow}>
                  <FiCreditCard className={styles.mobileIcon} />
                  <span className={styles.mobileLabel}>Type:</span>
                  <span className={styles.mobileValue}>{loan.type}</span>
                </div>
                <div className={styles.mobileInfoRow}>
                  <FiCalendar className={styles.mobileIcon} />
                  <span className={styles.mobileLabel}>Date:</span>
                  <span className={styles.mobileValue}>{loan.appliedDate}</span>
                </div>
                <div className={styles.mobileInfoRow}>
                  <div className={styles.mobileIcon}></div>
                  <span className={styles.mobileLabel}>Status:</span>
                  <span
                    className={`${styles.mobileStatusBadge} ${
                      styles[loan.status.toLowerCase()]
                    }`}>
                    {loan.status}
                  </span>
                </div>
              </div>
              <div className={styles.mobileCardFooter}>
                <div className={styles.mobileQuickActions}>
                  <button
                    className={`${styles.mobileActionBtn} ${styles.paid}`}
                    onClick={(e) => handleQuickUpdate(loan.id, "Paid", e)}>
                    <FiCheck /> Paid
                  </button>
                  <button
                    className={`${styles.mobileActionBtn} ${styles.partial}`}
                    onClick={(e) => handleQuickUpdate(loan.id, "Partial", e)}>
                    <FiTrendingUp /> Partial
                  </button>
                  <button
                    className={`${styles.mobileActionBtn} ${styles.unpaid}`}
                    onClick={(e) => handleQuickUpdate(loan.id, "Unpaid", e)}>
                    <FiX /> Unpaid
                  </button>
                </div>
                <button
                  className={styles.mobileViewBtn}
                  onClick={() => onViewLoan(loan.id)}>
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LoanRepaymentsList;
