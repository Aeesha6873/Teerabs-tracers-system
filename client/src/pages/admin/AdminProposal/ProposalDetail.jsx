import React, { useState, useEffect } from "react";
import {
  FiArrowLeft,
  FiEye,
  FiCheck,
  FiX,
  FiDownload,
  FiEdit,
  FiSave,
  FiTrash2,
  FiUser,
  FiMail,
  FiBriefcase,
  FiDollarSign,
  FiCalendar,
  FiFileText,
  FiPercent,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { MdAttachFile } from "react-icons/md";
import styles from "../../../styles/adminProposals.module.css";

export default function ProposalDetail({
  proposal,
  onBack,
  onUpdate,
  onUpdateStatus,
  onDelete,
}) {
  const [currentProposal, setCurrentProposal] = useState(proposal);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(proposal);
  const [reviewNotes, setReviewNotes] = useState(proposal.notes || "");

  useEffect(() => {
    setCurrentProposal(proposal);
    setEditForm(proposal);
    setReviewNotes(proposal.notes || "");
  }, [proposal]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { bg: "#fef3c7", text: "#92400e", icon: "⏳" };
      case "reviewed":
        return { bg: "#dbeafe", text: "#1e40af", icon: "📋" };
      case "approved":
        return { bg: "#d1fae5", text: "#065f46", icon: "✅" };
      case "rejected":
        return { bg: "#fee2e2", text: "#991b1b", icon: "❌" };
      default:
        return { bg: "#e5e7eb", text: "#374151", icon: "📄" };
    }
  };

  const statusColor = getStatusColor(currentProposal.status);

  const handleStatusUpdate = (newStatus) => {
    if (window.confirm(`Mark this proposal as ${newStatus}?`)) {
      const updated = {
        ...currentProposal,
        status: newStatus,
        reviewDate: new Date().toISOString().split("T")[0],
        reviewedBy: "Admin User",
        notes: reviewNotes || currentProposal.notes,
      };

      if (newStatus === "approved") {
        updated.decisionDate = new Date().toISOString().split("T")[0];
      }

      setCurrentProposal(updated);
      onUpdateStatus(
        proposal.id,
        newStatus,
        reviewNotes || currentProposal.notes
      );
    }
  };

  const handleSaveEdit = () => {
    onUpdate(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm(currentProposal);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      onDelete(proposal.id);
    }
  };

  const handleSaveNotes = () => {
    const updated = { ...currentProposal, notes: reviewNotes };
    setCurrentProposal(updated);
    onUpdate(updated);
  };

  return (
    <div className={styles.detailPage}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to Proposals
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.detailTitle}>
            Proposal #{currentProposal.id}
            <span
              className={styles.statusBadgeLarge}
              style={{
                backgroundColor: statusColor.bg,
                color: statusColor.text,
              }}>
              {statusColor.icon}{" "}
              {currentProposal.status.charAt(0).toUpperCase() +
                currentProposal.status.slice(1)}
            </span>
          </h1>
          <p className={styles.detailSubtitle}>
            {currentProposal.businessName} • {currentProposal.businessType}
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
            onClick={handleDelete}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className={styles.proposalStats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiDollarSign />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {formatCurrency(currentProposal.amountRequested)}
            </div>
            <div className={styles.statLabel}>Amount Requested</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiCalendar />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {formatDate(currentProposal.submittedDate)}
            </div>
            <div className={styles.statLabel}>Submitted Date</div>
          </div>
        </div>

        {currentProposal.loanAmount && (
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <FiPercent />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {currentProposal.interestRate || 12.5}%
              </div>
              <div className={styles.statLabel}>Interest Rate</div>
            </div>
          </div>
        )}

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FiClock />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {currentProposal.loanDuration || "N/A"}
            </div>
            <div className={styles.statLabel}>Duration (months)</div>
          </div>
        </div>
      </div>

      {/* Status Actions */}
      <div className={styles.statusActions}>
        <div className={styles.statusInfo}>
          <div className={styles.statusMeta}>
            {currentProposal.reviewDate && (
              <span>
                <FiCalendar /> Reviewed:{" "}
                {formatDate(currentProposal.reviewDate)}
              </span>
            )}
            {currentProposal.reviewedBy && (
              <span>
                <FiUser /> By: {currentProposal.reviewedBy}
              </span>
            )}
            {currentProposal.decisionDate && (
              <span>
                <FiCheckCircle /> Decided:{" "}
                {formatDate(currentProposal.decisionDate)}
              </span>
            )}
          </div>
        </div>

        <div className={styles.statusButtons}>
          {currentProposal.status !== "approved" && (
            <button
              className={`${styles.statusAction} ${
                currentProposal.status === "approved" ? styles.active : ""
              }`}
              onClick={() => handleStatusUpdate("approved")}>
              <FiCheck /> Approve
            </button>
          )}

          {currentProposal.status !== "reviewed" &&
            currentProposal.status !== "pending" && (
              <button
                className={`${styles.statusAction} ${
                  currentProposal.status === "reviewed" ? styles.active : ""
                }`}
                onClick={() => handleStatusUpdate("reviewed")}>
                <FiEye /> Mark Reviewed
              </button>
            )}

          {currentProposal.status !== "rejected" && (
            <button
              className={`${styles.statusAction} ${
                currentProposal.status === "rejected" ? styles.active : ""
              }`}
              onClick={() => handleStatusUpdate("rejected")}>
              <FiX /> Reject
            </button>
          )}

          {currentProposal.status !== "pending" && (
            <button
              className={`${styles.statusAction} ${
                currentProposal.status === "pending" ? styles.active : ""
              }`}
              onClick={() => handleStatusUpdate("pending")}>
              ⏳ Mark Pending
            </button>
          )}
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
            activeTab === "applicant" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("applicant")}>
          Applicant Info
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "attachments" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("attachments")}>
          Attachments ({currentProposal.attachments.length})
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "review" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("review")}>
          Review & Notes
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.overviewContent}>
            {isEditing ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Business Name</label>
                  <input
                    type="text"
                    value={editForm.businessName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, businessName: e.target.value })
                    }
                    className={styles.formControl}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Business Type</label>
                  <select
                    value={editForm.businessType}
                    onChange={(e) =>
                      setEditForm({ ...editForm, businessType: e.target.value })
                    }
                    className={styles.formControl}>
                    <option value="Retail">Retail</option>
                    <option value="Technology">Technology</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Services">Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Amount Requested (₦)</label>
                  <input
                    type="number"
                    value={editForm.amountRequested}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        amountRequested: parseInt(e.target.value),
                      })
                    }
                    className={styles.formControl}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Business Summary</label>
                  <textarea
                    value={editForm.summary}
                    onChange={(e) =>
                      setEditForm({ ...editForm, summary: e.target.value })
                    }
                    className={styles.formControl}
                    rows="4"
                  />
                </div>

                <div className={styles.formActions}>
                  <button
                    className={styles.cancelBtn}
                    onClick={handleCancelEdit}>
                    Cancel
                  </button>
                  <button className={styles.saveBtn} onClick={handleSaveEdit}>
                    <FiSave /> Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.section}>
                  <h3>Business Summary</h3>
                  <div className={styles.summaryCard}>
                    <p>{currentProposal.summary}</p>
                  </div>
                </div>

                <div className={styles.section}>
                  <h3>Proposal Details</h3>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <label>Business Type</label>
                      <div className={styles.value}>
                        {currentProposal.businessType}
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Amount Requested</label>
                      <div className={styles.value}>
                        {formatCurrency(currentProposal.amountRequested)}
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Submitted Date</label>
                      <div className={styles.value}>
                        {formatDate(currentProposal.submittedDate)}
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <label>Current Status</label>
                      <div className={styles.value}>
                        <span
                          className={styles.statusBadge}
                          style={{
                            backgroundColor: statusColor.bg,
                            color: statusColor.text,
                          }}>
                          {currentProposal.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {currentProposal.loanAmount && (
                  <div className={styles.section}>
                    <h3>Approved Loan Details</h3>
                    <div className={styles.loanDetails}>
                      <div className={styles.loanItem}>
                        <div className={styles.loanLabel}>Approved Amount</div>
                        <div className={styles.loanValue}>
                          {formatCurrency(currentProposal.loanAmount)}
                        </div>
                      </div>
                      <div className={styles.loanItem}>
                        <div className={styles.loanLabel}>Interest Rate</div>
                        <div className={styles.loanValue}>
                          {currentProposal.interestRate}%
                        </div>
                      </div>
                      <div className={styles.loanItem}>
                        <div className={styles.loanLabel}>Duration</div>
                        <div className={styles.loanValue}>
                          {currentProposal.loanDuration} months
                        </div>
                      </div>
                      <div className={styles.loanItem}>
                        <div className={styles.loanLabel}>Monthly Payment</div>
                        <div className={styles.loanValue}>
                          {formatCurrency(
                            Math.round(
                              (currentProposal.loanAmount *
                                (1 + currentProposal.interestRate / 100)) /
                                currentProposal.loanDuration
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "applicant" && (
          <div className={styles.applicantContent}>
            <div className={styles.section}>
              <h3>Applicant Information</h3>
              <div className={styles.applicantGrid}>
                <div className={styles.applicantItem}>
                  <div className={styles.applicantIcon}>
                    <FiUser />
                  </div>
                  <div>
                    <div className={styles.applicantLabel}>Full Name</div>
                    <div className={styles.applicantValue}>
                      {currentProposal.user}
                    </div>
                  </div>
                </div>

                <div className={styles.applicantItem}>
                  <div className={styles.applicantIcon}>
                    <FiMail />
                  </div>
                  <div>
                    <div className={styles.applicantLabel}>Email Address</div>
                    <div className={styles.applicantValue}>
                      <a href={`mailto:${currentProposal.email}`}>
                        {currentProposal.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className={styles.applicantItem}>
                  <div className={styles.applicantIcon}>
                    <FiBriefcase />
                  </div>
                  <div>
                    <div className={styles.applicantLabel}>Business Name</div>
                    <div className={styles.applicantValue}>
                      {currentProposal.businessName}
                    </div>
                  </div>
                </div>

                <div className={styles.applicantItem}>
                  <div className={styles.applicantIcon}>
                    <FiBriefcase />
                  </div>
                  <div>
                    <div className={styles.applicantLabel}>Business Type</div>
                    <div className={styles.applicantValue}>
                      {currentProposal.businessType}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "attachments" && (
          <div className={styles.attachmentsContent}>
            <h3>Proposal Attachments</h3>
            <div className={styles.attachmentsGrid}>
              {currentProposal.attachments.map((attachment, index) => (
                <div key={index} className={styles.attachmentCard}>
                  <div className={styles.attachmentIcon}>
                    <MdAttachFile />
                  </div>
                  <div className={styles.attachmentInfo}>
                    <div className={styles.attachmentName}>
                      {attachment.name}
                    </div>
                    <div className={styles.attachmentMeta}>
                      {attachment.name.split(".").pop().toUpperCase()} •{" "}
                      {Math.floor(Math.random() * 5) + 1} MB
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

        {activeTab === "review" && (
          <div className={styles.reviewContent}>
            <h3>Review & Notes</h3>

            <div className={styles.reviewForm}>
              <div className={styles.formGroup}>
                <label>Review Notes</label>
                <textarea
                  className={styles.textarea}
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add your review notes, comments, or feedback..."
                  rows="6"
                />
              </div>

              <div className={styles.formActions}>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setReviewNotes(currentProposal.notes || "")}>
                  Reset
                </button>
                <button className={styles.saveBtn} onClick={handleSaveNotes}>
                  <FiSave /> Save Notes
                </button>
              </div>
            </div>

            {currentProposal.reviewDate && (
              <div className={styles.reviewHistory}>
                <h4>Review History</h4>
                <div className={styles.reviewItem}>
                  <div className={styles.reviewDate}>
                    {formatDate(currentProposal.reviewDate)}
                  </div>
                  <div className={styles.reviewer}>
                    Reviewed by: {currentProposal.reviewedBy || "Admin"}
                  </div>
                  {currentProposal.notes && (
                    <div className={styles.reviewNotes}>
                      {currentProposal.notes}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
