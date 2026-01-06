import React, { useState } from "react";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiPercent,
  FiFileText,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
} from "react-icons/fi";
import styles from "../../../styles/adminloan.module.css";

const LoanDetail = ({ loan, onEdit, onDelete, onBack, onStatusUpdate }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!loan) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>No loan selected. Please select a loan from the list.</p>
          <button onClick={onBack} className={styles.btnBack}>
            <FiArrowLeft /> Back to Loans
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const calculateMonthlyPayment = () => {
    const principal = loan.amount;
    const monthlyRate = loan.interestRate / 100 / 12;
    const months = loan.duration;

    if (monthlyRate === 0) {
      return principal / months;
    }

    return (
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );
  };

  const monthlyPayment = calculateMonthlyPayment();

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#f59e0b";
      case "Approved":
        return "#10b981";
      case "Rejected":
        return "#ef4444";
      case "Disbursed":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className={styles.loanDetailContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.btnBack}>
          <FiArrowLeft /> Back to Loans
        </button>
        <div className={styles.headerActions}>
          <button onClick={() => onEdit(loan.id)} className={styles.btnEdit}>
            <FiEdit /> Edit Loan
          </button>
          <button
            onClick={() => onDelete(loan.id)}
            className={styles.btnDelete}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* Loan Header */}
      <div className={styles.loanHeader}>
        <div className={styles.loanAvatar}>{loan.fullName.charAt(0)}</div>
        <div className={styles.loanInfo}>
          <h1 className={styles.loanTitle}>
            Loan #{loan.id}
            <span
              className={styles.statusBadge}
              style={{ backgroundColor: getStatusColor(loan.status) }}>
              {loan.status}
            </span>
          </h1>
          <div className={styles.loanMeta}>
            <div className={styles.applicantName}>
              <FiUser /> {loan.fullName}
            </div>
            <div className={styles.loanAmount}>
              <FiDollarSign /> {formatCurrency(loan.amount)}
            </div>
            <div className={styles.loanType}>{loan.type}</div>
            <div className={styles.loanDate}>
              <FiCalendar /> Applied: {loan.dateApplied}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "overview" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("overview")}>
          Overview
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
            activeTab === "timeline" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("timeline")}>
          Timeline
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "actions" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("actions")}>
          Actions
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.overview}>
            {/* Quick Stats */}
            <div className={styles.quickStats}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiPercent />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{loan.interestRate}%</div>
                  <div className={styles.statLabel}>Interest Rate</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiClock />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>{loan.duration} months</div>
                  <div className={styles.statLabel}>Duration</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiDollarSign />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {formatCurrency(Math.round(monthlyPayment))}
                  </div>
                  <div className={styles.statLabel}>Monthly Payment</div>
                </div>
              </div>
            </div>

            {/* Applicant Information */}
            <div className={styles.section}>
              <h3>Applicant Information</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <label>
                    <FiUser /> Full Name
                  </label>
                  <div className={styles.value}>{loan.fullName}</div>
                </div>
                <div className={styles.infoItem}>
                  <label>
                    <FiMail /> Email Address
                  </label>
                  <div className={styles.value}>
                    <a href={`mailto:${loan.email}`}>{loan.email}</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <label>
                    <FiPhone /> Phone Number
                  </label>
                  <div className={styles.value}>
                    <a href={`tel:${loan.phone}`}>{loan.phone}</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <label>
                    <FiMapPin /> Address
                  </label>
                  <div className={styles.value}>{loan.address}</div>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className={styles.section}>
              <h3>Loan Details</h3>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <label>Loan Type</label>
                  <div className={styles.value}>{loan.type}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Amount Requested</label>
                  <div className={styles.value}>
                    {formatCurrency(loan.amount)}
                  </div>
                </div>
                <div className={styles.detailItem}>
                  <label>Interest Rate</label>
                  <div className={styles.value}>{loan.interestRate}%</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Duration</label>
                  <div className={styles.value}>{loan.duration} months</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Repayment Plan</label>
                  <div className={styles.value}>{loan.repaymentPlan}</div>
                </div>
                <div className={styles.detailItem}>
                  <label>Total Repayment</label>
                  <div className={styles.value}>
                    {formatCurrency(Math.round(monthlyPayment * loan.duration))}
                  </div>
                </div>
              </div>
            </div>

            {/* Loan Purpose */}
            <div className={styles.section}>
              <h3>Loan Purpose</h3>
              <div className={styles.purposeCard}>
                <p>{loan.purpose}</p>
              </div>
            </div>

            {/* Admin Notes */}
            {loan.notes && (
              <div className={styles.section}>
                <h3>Admin Notes</h3>
                <div className={styles.notesCard}>
                  <p>{loan.notes}</p>
                  {loan.reviewedBy && (
                    <div className={styles.notesMeta}>
                      <span>Reviewed by: {loan.reviewedBy}</span>
                      {loan.reviewDate && <span>Date: {loan.reviewDate}</span>}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className={styles.documents}>
            <div className={styles.section}>
              <h3>Supporting Documents</h3>
              <div className={styles.documentsGrid}>
                {loan.idFile && (
                  <div className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <FiFileText />
                      <span>ID Document</span>
                    </div>
                    <a
                      href={loan.idFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.documentLink}>
                      <FiDownload /> Download
                    </a>
                  </div>
                )}

                {loan.addressProof && (
                  <div className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <FiFileText />
                      <span>Proof of Address</span>
                    </div>
                    <a
                      href={loan.addressProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.documentLink}>
                      <FiDownload /> Download
                    </a>
                  </div>
                )}

                {loan.incomeProof && (
                  <div className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <FiFileText />
                      <span>Proof of Income</span>
                    </div>
                    <a
                      href={loan.incomeProof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.documentLink}>
                      <FiDownload /> Download
                    </a>
                  </div>
                )}

                {loan.proposalFile && (
                  <div className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <FiFileText />
                      <span>Business Proposal</span>
                    </div>
                    <a
                      href={loan.proposalFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.documentLink}>
                      <FiDownload /> Download
                    </a>
                  </div>
                )}

                {loan.collateralDocs && (
                  <div className={styles.documentCard}>
                    <div className={styles.documentHeader}>
                      <FiFileText />
                      <span>Collateral Documents</span>
                    </div>
                    <a
                      href={loan.collateralDocs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.documentLink}>
                      <FiDownload /> Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "timeline" && (
          <div className={styles.timeline}>
            <div className={styles.section}>
              <h3>Loan Timeline</h3>
              <div className={styles.timelineSteps}>
                <div className={`${styles.timelineStep} ${styles.completed}`}>
                  <div className={styles.stepIcon}>1</div>
                  <div className={styles.stepContent}>
                    <h4>Application Submitted</h4>
                    <p>{loan.dateApplied}</p>
                  </div>
                </div>

                <div
                  className={`${styles.timelineStep} ${
                    loan.reviewDate ? styles.completed : styles.pending
                  }`}>
                  <div className={styles.stepIcon}>2</div>
                  <div className={styles.stepContent}>
                    <h4>Under Review</h4>
                    {loan.reviewDate ? (
                      <p>Reviewed on {loan.reviewDate}</p>
                    ) : (
                      <p>Pending review</p>
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.timelineStep} ${
                    loan.status === "Approved" || loan.status === "Disbursed"
                      ? styles.completed
                      : styles.pending
                  }`}>
                  <div className={styles.stepIcon}>3</div>
                  <div className={styles.stepContent}>
                    <h4>Approval</h4>
                    {loan.status === "Approved" ||
                    loan.status === "Disbursed" ? (
                      <p>Approved on {loan.reviewDate}</p>
                    ) : (
                      <p>Pending approval</p>
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.timelineStep} ${
                    loan.status === "Disbursed"
                      ? styles.completed
                      : styles.pending
                  }`}>
                  <div className={styles.stepIcon}>4</div>
                  <div className={styles.stepContent}>
                    <h4>Disbursement</h4>
                    {loan.disbursementDate ? (
                      <p>Disbursed on {loan.disbursementDate}</p>
                    ) : loan.status === "Disbursed" ? (
                      <p>Awaiting disbursement</p>
                    ) : (
                      <p>Pending</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "actions" && (
          <div className={styles.actions}>
            <div className={styles.section}>
              <h3>Loan Actions</h3>
              <div className={styles.actionButtons}>
                {loan.status === "Pending" && (
                  <>
                    <button
                      className={`${styles.actionButton} ${styles.approveButton}`}
                      onClick={() => onStatusUpdate(loan.id, "Approved")}>
                      <FiCheckCircle /> Approve Loan
                    </button>
                    <button
                      className={`${styles.actionButton} ${styles.rejectButton}`}
                      onClick={() => onStatusUpdate(loan.id, "Rejected")}>
                      <FiXCircle /> Reject Loan
                    </button>
                  </>
                )}

                {loan.status === "Approved" && (
                  <button
                    className={`${styles.actionButton} ${styles.disburseButton}`}
                    onClick={() => onStatusUpdate(loan.id, "Disbursed")}>
                    💰 Disburse Funds
                  </button>
                )}

                <button
                  className={`${styles.actionButton} ${styles.editButton}`}
                  onClick={() => onEdit(loan.id)}>
                  <FiEdit /> Edit Details
                </button>

                <button
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                  onClick={() => onDelete(loan.id)}>
                  <FiTrash2 /> Delete Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanDetail;
