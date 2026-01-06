import styles from "../../styles/AdminRemittance.module.css";
import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
  FiDollarSign,
  FiCalendar,
  FiGlobe,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";

// Mock data - replace with your actual data
const remittanceData = [
  {
    id: "REM001",
    sender: "John Doe",
    receiver: "Jane Smith",
    amount: 500000,
    currency: "USD",
    status: "completed",
    date: "2024-01-15",
    method: "Bank Transfer",
    country: "USA → Nigeria",
    fee: 2500,
    exchangeRate: 1500,
  },
  {
    id: "REM002",
    sender: "Michael Brown",
    receiver: "Sarah Johnson",
    amount: 250000,
    currency: "GBP",
    status: "pending",
    date: "2024-01-16",
    method: "Mobile Money",
    country: "UK → Ghana",
    fee: 1500,
    exchangeRate: 1300,
  },
  {
    id: "REM003",
    sender: "David Wilson",
    receiver: "Lisa Brown",
    amount: 750000,
    currency: "EUR",
    status: "processing",
    date: "2024-01-14",
    method: "Bank Transfer",
    country: "Germany → Kenya",
    fee: 3500,
    exchangeRate: 1400,
  },
  {
    id: "REM004",
    sender: "Robert Taylor",
    receiver: "Mary Williams",
    amount: 300000,
    currency: "USD",
    status: "failed",
    date: "2024-01-13",
    method: "Cash Pickup",
    country: "USA → Nigeria",
    fee: 2000,
    exchangeRate: 1500,
  },
  {
    id: "REM005",
    sender: "James Miller",
    receiver: "Patricia Jones",
    amount: 1000000,
    currency: "GBP",
    status: "completed",
    date: "2024-01-12",
    method: "Bank Transfer",
    country: "UK → Nigeria",
    fee: 5000,
    exchangeRate: 1300,
  },
];

export default function RemittanceDashboard() {
  const [view, setView] = useState("list"); // "list" or "detail"
  const [selectedRemittance, setSelectedRemittance] = useState(null);
  const [remittances, setRemittances] = useState(remittanceData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter remittances
  const filteredRemittances = remittances.filter((remit) => {
    const matchesSearch =
      remit.id.toLowerCase().includes(search.toLowerCase()) ||
      remit.sender.toLowerCase().includes(search.toLowerCase()) ||
      remit.receiver.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || remit.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: remittances.length,
    completed: remittances.filter((r) => r.status === "completed").length,
    pending: remittances.filter((r) => r.status === "pending").length,
    processing: remittances.filter((r) => r.status === "processing").length,
    failed: remittances.filter((r) => r.status === "failed").length,
    totalAmount: remittances.reduce((sum, r) => sum + r.amount, 0),
    totalFees: remittances.reduce((sum, r) => sum + r.fee, 0),
  };

  // Calculate amount by status
  const amountByStatus = {
    completed: remittances
      .filter((r) => r.status === "completed")
      .reduce((sum, r) => sum + r.amount, 0),
    pending: remittances
      .filter((r) => r.status === "pending")
      .reduce((sum, r) => sum + r.amount, 0),
    processing: remittances
      .filter((r) => r.status === "processing")
      .reduce((sum, r) => sum + r.amount, 0),
  };

  // Format currency
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // View remittance details
  const viewRemittanceDetails = (remittance) => {
    setSelectedRemittance(remittance);
    setView("detail");
  };

  // Go back to list
  const goBackToList = () => {
    setView("list");
    setSelectedRemittance(null);
  };

  // Update remittance status
  const updateRemittanceStatus = (id, status) => {
    if (window.confirm(`Change status to ${status}?`)) {
      setRemittances(
        remittances.map((remit) =>
          remit.id === id ? { ...remit, status } : remit
        )
      );

      if (selectedRemittance && selectedRemittance.id === id) {
        setSelectedRemittance({ ...selectedRemittance, status });
      }
    }
  };

  // Delete remittance
  const deleteRemittance = (id) => {
    if (window.confirm("Are you sure you want to delete this remittance?")) {
      setRemittances(remittances.filter((remit) => remit.id !== id));
      if (selectedRemittance && selectedRemittance.id === id) {
        goBackToList();
      }
    }
  };

  // ===== DETAIL VIEW =====
  if (view === "detail" && selectedRemittance) {
    return (
      <div className={styles.detailPage}>
        {/* Header */}
        <div className={styles.detailHeader}>
          <button className={styles.backButton} onClick={goBackToList}>
            ← Back to Remittances
          </button>

          <div className={styles.headerInfo}>
            <h1 className={styles.detailTitle}>
              Remittance #{selectedRemittance.id}
            </h1>
            <p className={styles.detailSubtitle}>
              {formatDate(selectedRemittance.date)} •{" "}
              {selectedRemittance.method}
            </p>
          </div>

          <span
            className={`${styles.statusBadge} ${
              styles[selectedRemittance.status]
            }`}>
            {selectedRemittance.status.charAt(0).toUpperCase() +
              selectedRemittance.status.slice(1)}
          </span>
        </div>

        {/* Stats */}
        <div className={styles.detailStats}>
          <div className={styles.statRow}>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Amount Sent</div>
              <div className={styles.statValue}>
                {formatCurrency(
                  selectedRemittance.amount,
                  selectedRemittance.currency
                )}
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Transfer Fee</div>
              <div className={styles.statValue}>
                {formatCurrency(
                  selectedRemittance.fee,
                  selectedRemittance.currency
                )}
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Exchange Rate</div>
              <div className={styles.statValue}>
                1 {selectedRemittance.currency} = ₦
                {selectedRemittance.exchangeRate}
              </div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statLabel}>Total Received</div>
              <div className={styles.statValue}>
                ₦
                {(
                  selectedRemittance.amount * selectedRemittance.exchangeRate
                ).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={styles.detailContent}>
          <div className={styles.contentGrid}>
            {/* Left Column */}
            <div className={styles.contentColumn}>
              {/* Sender Info */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <FiUser className={styles.sectionIcon} />
                  Sender Information
                </h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiUser />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Full Name</div>
                      <div className={styles.infoValue}>
                        {selectedRemittance.sender}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiGlobe />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>From Country</div>
                      <div className={styles.infoValue}>
                        {selectedRemittance.country.split(" → ")[0]}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiDollarSign />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Currency</div>
                      <div className={styles.infoValue}>
                        {selectedRemittance.currency}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiTrendingUp />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Payment Method</div>
                      <div className={styles.infoValue}>
                        {selectedRemittance.method}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.contentColumn}>
              {/* Receiver Info */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <FiUser className={styles.sectionIcon} />
                  Receiver Information
                </h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiUser />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Full Name</div>
                      <div className={styles.infoValue}>
                        {selectedRemittance.receiver}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiGlobe />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>To Country</div>
                      <div className={styles.infoValue}>
                        {selectedRemittance.country.split(" → ")[1]}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiCalendar />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Transfer Date</div>
                      <div className={styles.infoValue}>
                        {formatDate(selectedRemittance.date)}
                      </div>
                    </div>
                  </div>
                  <div className={styles.infoCard}>
                    <div className={styles.infoIcon}>
                      <FiDollarSign />
                    </div>
                    <div>
                      <div className={styles.infoLabel}>Amount Received</div>
                      <div className={styles.infoValue}>
                        ₦
                        {(
                          selectedRemittance.amount *
                          selectedRemittance.exchangeRate
                        ).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.detailSection}>
                <h3 className={styles.sectionTitle}>
                  <FiEdit className={styles.sectionIcon} />
                  Actions
                </h3>
                <div className={styles.actionButtons}>
                  {selectedRemittance.status !== "completed" && (
                    <button
                      className={`${styles.actionButton} ${styles.completeButton}`}
                      onClick={() =>
                        updateRemittanceStatus(
                          selectedRemittance.id,
                          "completed"
                        )
                      }>
                      <FiCheckCircle /> Mark as Complete
                    </button>
                  )}
                  {selectedRemittance.status !== "processing" && (
                    <button
                      className={`${styles.actionButton} ${styles.processButton}`}
                      onClick={() =>
                        updateRemittanceStatus(
                          selectedRemittance.id,
                          "processing"
                        )
                      }>
                      <FiClock /> Mark as Processing
                    </button>
                  )}
                  {selectedRemittance.status !== "failed" && (
                    <button
                      className={`${styles.actionButton} ${styles.failButton}`}
                      onClick={() =>
                        updateRemittanceStatus(selectedRemittance.id, "failed")
                      }>
                      <FiXCircle /> Mark as Failed
                    </button>
                  )}
                  <button
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => deleteRemittance(selectedRemittance.id)}>
                    <FiTrash2 /> Delete Remittance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== LIST VIEW =====
  return (
    <div className={styles.remittancePage}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Remittance Management</h1>
          <p className={styles.pageSubtitle}>
            Track and manage international money transfers
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportButton}>
            <FiDownload /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsContainer}>
        <div className={`${styles.statCard} ${styles.total}`}>
          <div className={styles.statIcon}>
            <FiDollarSign />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.total}</div>
            <div className={styles.statLabel}>Total Transfers</div>
            <div className={styles.statAmount}>
              {formatCurrency(stats.totalAmount, "USD")}
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.completed}`}>
          <div className={styles.statIcon}>
            <FiCheckCircle />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.completed}</div>
            <div className={styles.statLabel}>Completed</div>
            <div className={styles.statAmount}>
              {formatCurrency(amountByStatus.completed, "USD")}
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.pending}`}>
          <div className={styles.statIcon}>
            <FiClock />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.pending}</div>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statAmount}>
              {formatCurrency(amountByStatus.pending, "USD")}
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.processing}`}>
          <div className={styles.statIcon}>
            <FiTrendingUp />
          </div>
          <div className={styles.statInfo}>
            <div className={styles.statNumber}>{stats.processing}</div>
            <div className={styles.statLabel}>Processing</div>
            <div className={styles.statAmount}>
              {formatCurrency(amountByStatus.processing, "USD")}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controlsRow}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by ID, Sender, or Receiver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <FiFilter className={styles.filterIcon} />
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clean Table - No Overflow */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitleRow}>
            <h3 className={styles.tableTitle}>Recent Remittances</h3>
            <span className={styles.tableCount}>
              {filteredRemittances.length} transfers
            </span>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.table}>
            {/* Table Head - Clean & Balanced */}
            <div className={styles.tableHead}>
              <div className={styles.tableHeadCell}>ID</div>
              <div className={styles.tableHeadCell}>Sender</div>
              <div className={styles.tableHeadCell}>Receiver</div>
              <div className={styles.tableHeadCell}>Amount</div>
              <div className={styles.tableHeadCell}>Date</div>
              <div className={styles.tableHeadCell}>Status</div>
              <div className={styles.tableHeadCell}>Actions</div>
            </div>

            {/* Table Body */}
            {filteredRemittances.length === 0 ? (
              <div className={styles.emptyTable}>
                <div className={styles.emptyIcon}>
                  <FiAlertCircle />
                </div>
                <h4>No remittances found</h4>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={styles.tableBody}>
                {filteredRemittances.map((remit) => (
                  <div key={remit.id} className={styles.tableRow}>
                    <div className={styles.tableCell}>
                      <span className={styles.remittanceId}>#{remit.id}</span>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.partyCell}>
                        <FiUser className={styles.partyIcon} />
                        <span className={styles.partyName}>{remit.sender}</span>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.partyCell}>
                        <FiUser className={styles.partyIcon} />
                        <span className={styles.partyName}>
                          {remit.receiver}
                        </span>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.amountCell}>
                        <div className={styles.amount}>
                          {formatCurrency(remit.amount, remit.currency)}
                        </div>
                        <div className={styles.currency}>{remit.currency}</div>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.dateCell}>
                        <FiCalendar className={styles.dateIcon} />
                        <span>{formatDate(remit.date)}</span>
                      </div>
                    </div>
                    <div className={styles.tableCell}>
                      <span
                        className={`${styles.statusBadge} ${
                          styles[remit.status]
                        }`}>
                        {remit.status.charAt(0).toUpperCase() +
                          remit.status.slice(1)}
                      </span>
                    </div>
                    <div className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <button
                          className={styles.viewButton}
                          onClick={() => viewRemittanceDetails(remit)}>
                          <FiEye /> View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
