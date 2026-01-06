import React, { useState } from "react";
import {
  FiEye,
  FiCheck,
  FiX,
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiDownload,
  FiTrash2,
} from "react-icons/fi";
import { MdAttachFile } from "react-icons/md";
import styles from "../../../styles/adminProposals.module.css";

export default function ProposalsList({
  proposals,
  onViewProposal,
  onUpdateStatus,
  onDeleteProposal,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showActionMenu, setShowActionMenu] = useState(null);

  const filteredProposals = proposals.filter((proposal) => {
    if (filter !== "all" && proposal.status !== filter) return false;

    const searchTerm = search.toLowerCase();
    return (
      proposal.id.toLowerCase().includes(searchTerm) ||
      proposal.user.toLowerCase().includes(searchTerm) ||
      proposal.businessName.toLowerCase().includes(searchTerm) ||
      proposal.businessType.toLowerCase().includes(searchTerm)
    );
  });

  const statusCounts = {
    total: proposals.length,
    pending: proposals.filter((p) => p.status === "pending").length,
    reviewed: proposals.filter((p) => p.status === "reviewed").length,
    approved: proposals.filter((p) => p.status === "approved").length,
    rejected: proposals.filter((p) => p.status === "rejected").length,
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "reviewed":
        return styles.statusReviewed;
      case "approved":
        return styles.statusApproved;
      case "rejected":
        return styles.statusRejected;
      default:
        return styles.statusDefault;
    }
  };

  const toggleActionMenu = (id, e) => {
    if (e) e.stopPropagation();
    setShowActionMenu(showActionMenu === id ? null : id);
  };

  const handleQuickAction = (proposalId, action, e) => {
    if (e) e.stopPropagation();

    if (action === "view") {
      onViewProposal(proposalId);
    } else if (action === "delete") {
      onDeleteProposal(proposalId);
    } else if (action === "approve") {
      onUpdateStatus(proposalId, "approved");
    } else if (action === "reject") {
      onUpdateStatus(proposalId, "rejected");
    }
    setShowActionMenu(null);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Proposals Management</h1>
          <p className={styles.subtitle}>
            Review and manage submitted business proposals
          </p>
        </div>
        <div className={styles.headerStats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{statusCounts.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{statusCounts.pending}</span>
            <span className={styles.statLabel}>Pending</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statPending}`}>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{statusCounts.pending}</span>
            <span className={styles.statLabel}>Pending Review</span>
          </div>
          <div className={styles.statIcon}>⏳</div>
        </div>

        <div className={`${styles.statCard} ${styles.statReviewed}`}>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{statusCounts.reviewed}</span>
            <span className={styles.statLabel}>Under Review</span>
          </div>
          <div className={styles.statIcon}>📋</div>
        </div>

        <div className={`${styles.statCard} ${styles.statApproved}`}>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{statusCounts.approved}</span>
            <span className={styles.statLabel}>Approved</span>
          </div>
          <div className={styles.statIcon}>✅</div>
        </div>

        <div className={`${styles.statCard} ${styles.statRejected}`}>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{statusCounts.rejected}</span>
            <span className={styles.statLabel}>Rejected</span>
          </div>
          <div className={styles.statIcon}>❌</div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search proposals by ID, name, or business..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <FiFilter className={styles.filterIcon} />
          <select
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Proposal ID</th>
              <th className={styles.th}>Applicant</th>
              <th className={styles.th}>Business</th>
              <th className={styles.th}>Amount</th>
              <th className={styles.th}>Date</th>
              <th className={styles.th}>Status</th>
              <th className={`${styles.th} ${styles.actionsHeader}`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProposals.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.emptyCell}>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📄</div>
                    <h3>No proposals found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredProposals.map((proposal) => (
                <tr key={proposal.id} className={styles.tr}>
                  <td className={styles.td}>
                    <div className={styles.proposalIdCell}>
                      <div className={styles.proposalId}>{proposal.id}</div>
                      {proposal.attachments.length > 0 && (
                        <span className={styles.attachmentBadge}>
                          <MdAttachFile />
                          {proposal.attachments.length}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>
                        {proposal.user.charAt(0)}
                      </div>
                      <div>
                        <div className={styles.userName}>{proposal.user}</div>
                        <div className={styles.userEmail}>{proposal.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.businessCell}>
                      <div className={styles.businessName}>
                        {proposal.businessName}
                      </div>
                      <div className={styles.businessType}>
                        {proposal.businessType}
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.amountCell}>
                      <div className={styles.amount}>
                        {formatCurrency(proposal.amountRequested)}
                      </div>
                      <div className={styles.amountSub}>Requested</div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.dateCell}>
                      <div className={styles.date}>
                        {new Date(proposal.submittedDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                      <div className={styles.year}>
                        {new Date(proposal.submittedDate).getFullYear()}
                      </div>
                    </div>
                  </td>
                  <td className={styles.td}>
                    <div className={styles.statusCell}>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          proposal.status
                        )}`}>
                        {proposal.status.charAt(0).toUpperCase() +
                          proposal.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className={`${styles.td} ${styles.actionsCell}`}>
                    <div className={styles.actions}>
                      <button
                        className={styles.iconButton}
                        onClick={() => onViewProposal(proposal.id)}
                        title="View Details">
                        <FiEye />
                      </button>

                      <div className={styles.actionMenuContainer}>
                        <button
                          className={styles.iconButton}
                          onClick={(e) => toggleActionMenu(proposal.id, e)}
                          title="More Actions">
                          <FiMoreVertical />
                        </button>

                        {showActionMenu === proposal.id && (
                          <div className={styles.actionMenu}>
                            <button
                              className={styles.menuItem}
                              onClick={() => onViewProposal(proposal.id)}>
                              <FiEye />
                              <span>View Details</span>
                            </button>

                            {proposal.status !== "approved" && (
                              <button
                                className={`${styles.menuItem} ${styles.menuApprove}`}
                                onClick={() =>
                                  onUpdateStatus(proposal.id, "approved")
                                }>
                                <FiCheck />
                                <span>Approve</span>
                              </button>
                            )}

                            {proposal.status !== "rejected" && (
                              <button
                                className={`${styles.menuItem} ${styles.menuReject}`}
                                onClick={() =>
                                  onUpdateStatus(proposal.id, "rejected")
                                }>
                                <FiX />
                                <span>Reject</span>
                              </button>
                            )}

                            <button
                              className={`${styles.menuItem} ${styles.menuDelete}`}
                              onClick={() => onDeleteProposal(proposal.id)}>
                              <FiTrash2 />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>

                      {proposal.status !== "approved" && (
                        <button
                          className={`${styles.iconButton} ${styles.quickApprove}`}
                          onClick={(e) =>
                            handleQuickAction(proposal.id, "approve", e)
                          }
                          title="Approve">
                          <FiCheck />
                        </button>
                      )}

                      {proposal.status !== "rejected" && (
                        <button
                          className={`${styles.iconButton} ${styles.quickReject}`}
                          onClick={(e) =>
                            handleQuickAction(proposal.id, "reject", e)
                          }
                          title="Reject">
                          <FiX />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
