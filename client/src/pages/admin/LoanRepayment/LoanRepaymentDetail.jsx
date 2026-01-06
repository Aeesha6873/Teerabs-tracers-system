import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiCheck,
  FiX,
  FiTrendingUp,
  FiCalendar,
  FiUser,
  FiCreditCard,
  FiFileText,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiPercent,
  FiDownload,
  FiEdit,
  FiSave,
  FiTrash2,
} from "react-icons/fi";
import styles from "../../../styles/loanRepayment.module.css";

export default function LoanRepaymentDetail({
  loan,
  onBack,
  onUpdateStatus,
  onUpdateLoan,
}) {
  const [currentLoan, setCurrentLoan] = useState(loan);
  const [adminNotes, setAdminNotes] = useState(loan.notes || "");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setCurrentLoan(loan);
    setAdminNotes(loan.notes || "");
  }, [loan]);

  // Format currency
  const formatCurrency = (amount) => {
    if (typeof amount === "string") return amount;
    return `₦${amount.toLocaleString()}`;
  };

  // Calculate payment details
  const calculatePaymentDetails = () => {
    const monthlyPayment = Math.round(loan.amount / 12);
    const paymentsMade =
      loan.repaymentStatus === "Paid"
        ? 12
        : loan.repaymentStatus === "Partial"
        ? 6
        : 0;
    const remainingBalance = loan.amount - monthlyPayment * paymentsMade;

    return {
      monthlyPayment: formatCurrency(monthlyPayment),
      remainingBalance: formatCurrency(remainingBalance),
      paymentsMade,
      totalPayments: 12,
    };
  };

  const paymentDetails = calculatePaymentDetails();

  // Handle status update
  const handleStatusUpdate = (status) => {
    if (window.confirm(`Mark this loan as ${status}?`)) {
      const updatedLoan = { ...currentLoan, repaymentStatus: status };
      setCurrentLoan(updatedLoan);
      onUpdateStatus(loan.id, status);
    }
  };

  // Handle save notes
  const handleSaveNotes = () => {
    const updatedLoan = {
      ...currentLoan,
      notes: adminNotes,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setCurrentLoan(updatedLoan);
    onUpdateLoan(updatedLoan);
    setIsEditing(false);
  };

  // Payment history data
  const paymentHistory = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const dueDate = `2024-${month.toString().padStart(2, "0")}-15`;
    const status =
      month <= paymentDetails.paymentsMade
        ? loan.repaymentStatus === "Partial" && month > 6
          ? "Partial"
          : "Paid"
        : "Pending";
    return {
      id: i + 1,
      month: `Month ${month}`,
      dueDate,
      amount: paymentDetails.monthlyPayment,
      status,
    };
  });

  return (
    <div className={styles.detailPage}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to Repayments
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.detailTitle}>Loan #{currentLoan.id}</h1>
          <p className={styles.detailSubtitle}>
            {currentLoan.user} • {currentLoan.type}
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={`${styles.btn} ${styles.btnEdit}`}
            onClick={() => setIsEditing(!isEditing)}>
            <FiEdit /> {isEditing ? "Cancel Edit" : "Edit"}
          </button>
          <button
            className={`${styles.btn} ${styles.btnDelete}`}
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this loan record?"
                )
              ) {
                alert("Loan record deleted (this would trigger API call)");
                onBack();
              }
            }}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div className={styles.statusBanner}>
        <div className={styles.statusInfo}>
          <div className={styles.statusMain}>
            <span
              className={`${styles.statusBadgeLarge} ${
                styles[currentLoan.repaymentStatus.toLowerCase()]
              }`}>
              {currentLoan.repaymentStatus}
            </span>
            <div className={styles.statusMeta}>
              <span>Applied: {currentLoan.appliedDate}</span>
              {currentLoan.lastUpdated && (
                <span>Last Updated: {currentLoan.lastUpdated}</span>
              )}
            </div>
          </div>
          <div className={styles.statusQuickActions}>
            <button
              className={`${styles.statusAction} ${
                currentLoan.repaymentStatus === "Paid" ? styles.active : ""
              }`}
              onClick={() => handleStatusUpdate("Paid")}>
              <FiCheck /> Paid
            </button>
            <button
              className={`${styles.statusAction} ${
                currentLoan.repaymentStatus === "Partial" ? styles.active : ""
              }`}
              onClick={() => handleStatusUpdate("Partial")}>
              <FiTrendingUp /> Partial
            </button>
            <button
              className={`${styles.statusAction} ${
                currentLoan.repaymentStatus === "Unpaid" ? styles.active : ""
              }`}
              onClick={() => handleStatusUpdate("Unpaid")}>
              <FiX /> Unpaid
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.detailTabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "overview" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "payments" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("payments")}>
          Payment History
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "documents" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("documents")}>
          Documents
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "notes" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("notes")}>
          Notes
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.overviewContent}>
            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiDollarSign />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {formatCurrency(currentLoan.amount)}
                  </div>
                  <div className={styles.statLabel}>Loan Amount</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiCreditCard />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {paymentDetails.monthlyPayment}
                  </div>
                  <div className={styles.statLabel}>Monthly Payment</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiTrendingUp />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {paymentDetails.remainingBalance}
                  </div>
                  <div className={styles.statLabel}>Remaining Balance</div>
                </div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiClock />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {paymentDetails.paymentsMade}/{paymentDetails.totalPayments}
                  </div>
                  <div className={styles.statLabel}>Payments Made</div>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className={styles.detailSection}>
              <h3>Loan Details</h3>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <label>Loan Type</label>
                  <div className={styles.detailValue}>{currentLoan.type}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Loan Status</label>
                  <div className={styles.detailValue}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[currentLoan.status.toLowerCase()]
                      }`}>
                      {currentLoan.status}
                    </span>
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <label>Interest Rate</label>
                  <div className={styles.detailValue}>
                    {loan.interestRate || "15%"}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <label>Duration</label>
                  <div className={styles.detailValue}>12 months</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Repayment Plan</label>
                  <div className={styles.detailValue}>Monthly</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Total Repayment</label>
                  <div className={styles.detailValue}>
                    {formatCurrency(Math.round(currentLoan.amount * 1.15))}
                  </div>
                </div>
              </div>
            </div>

            {/* Borrower Information */}
            <div className={styles.detailSection}>
              <h3>Borrower Information</h3>
              <div className={styles.borrowerGrid}>
                <div className={styles.borrowerItem}>
                  <div className={styles.borrowerIcon}>
                    <FiUser />
                  </div>
                  <div>
                    <div className={styles.borrowerLabel}>Full Name</div>
                    <div className={styles.borrowerValue}>
                      {currentLoan.user}
                    </div>
                  </div>
                </div>
                <div className={styles.borrowerItem}>
                  <div className={styles.borrowerIcon}>
                    <FiMail />
                  </div>
                  <div>
                    <div className={styles.borrowerLabel}>Email</div>
                    <div className={styles.borrowerValue}>
                      {loan.email || "john@example.com"}
                    </div>
                  </div>
                </div>
                <div className={styles.borrowerItem}>
                  <div className={styles.borrowerIcon}>
                    <FiPhone />
                  </div>
                  <div>
                    <div className={styles.borrowerLabel}>Phone</div>
                    <div className={styles.borrowerValue}>
                      {loan.phone || "+234 801 234 5678"}
                    </div>
                  </div>
                </div>
                <div className={styles.borrowerItem}>
                  <div className={styles.borrowerIcon}>
                    <FiMapPin />
                  </div>
                  <div>
                    <div className={styles.borrowerLabel}>Address</div>
                    <div className={styles.borrowerValue}>
                      {loan.address || "123 Main St, Lagos"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className={styles.paymentsContent}>
            <div className={styles.sectionHeader}>
              <h3>Payment Schedule</h3>
              <button className={styles.exportButton}>
                <FiDownload /> Export Schedule
              </button>
            </div>

            <div className={styles.paymentsTable}>
              <div className={styles.paymentsHeader}>
                <div className={styles.paymentColumn}>Month</div>
                <div className={styles.paymentColumn}>Due Date</div>
                <div className={styles.paymentColumn}>Amount</div>
                <div className={styles.paymentColumn}>Status</div>
                <div className={styles.paymentColumn}>Actions</div>
              </div>

              <div className={styles.paymentsBody}>
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className={styles.paymentRow}>
                    <div className={styles.paymentCell}>{payment.month}</div>
                    <div className={styles.paymentCell}>{payment.dueDate}</div>
                    <div className={styles.paymentCell}>{payment.amount}</div>
                    <div className={styles.paymentCell}>
                      <span
                        className={`${styles.paymentStatus} ${
                          styles[payment.status.toLowerCase()]
                        }`}>
                        {payment.status}
                      </span>
                    </div>
                    <div className={styles.paymentCell}>
                      {payment.status === "Pending" ? (
                        <button
                          className={styles.markPaidButton}
                          onClick={() =>
                            alert(`Mark payment ${payment.id} as paid`)
                          }>
                          Mark Paid
                        </button>
                      ) : (
                        <button className={styles.receiptButton}>
                          View Receipt
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className={styles.documentsContent}>
            <h3>Loan Documents</h3>
            <div className={styles.documentsGrid}>
              {[
                { label: "Loan Agreement", type: "PDF", size: "2.4 MB" },
                { label: "ID Document", type: "PDF", size: "1.8 MB" },
                { label: "Proof of Income", type: "PDF", size: "3.1 MB" },
                { label: "Bank Statement", type: "PDF", size: "4.2 MB" },
                { label: "Collateral Documents", type: "ZIP", size: "8.7 MB" },
                { label: "Credit Report", type: "PDF", size: "1.2 MB" },
              ].map((doc, index) => (
                <div key={index} className={styles.documentCard}>
                  <div className={styles.documentIcon}>📄</div>
                  <div className={styles.documentInfo}>
                    <div className={styles.documentName}>{doc.label}</div>
                    <div className={styles.documentMeta}>
                      <span className={styles.documentType}>{doc.type}</span>
                      <span className={styles.documentSize}>{doc.size}</span>
                    </div>
                  </div>
                  <button className={styles.downloadButton}>
                    <FiDownload /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className={styles.notesContent}>
            <h3>Admin Notes</h3>
            {isEditing ? (
              <div className={styles.notesEditor}>
                <textarea
                  className={styles.notesInput}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this loan repayment..."
                  rows="6"
                />
                <div className={styles.notesActions}>
                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setIsEditing(false);
                      setAdminNotes(currentLoan.notes || "");
                    }}>
                    Cancel
                  </button>
                  <button
                    className={styles.saveButton}
                    onClick={handleSaveNotes}>
                    <FiSave /> Save Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.notesDisplay}>
                {adminNotes ? (
                  <div className={styles.notesText}>{adminNotes}</div>
                ) : (
                  <div className={styles.noNotes}>
                    No notes added yet. Click "Edit" to add notes.
                  </div>
                )}
                <div className={styles.notesMeta}>
                  <span>
                    Last updated: {currentLoan.lastUpdated || "Never"}
                  </span>
                  <span>Added by: {loan.reviewedBy || "System"}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
