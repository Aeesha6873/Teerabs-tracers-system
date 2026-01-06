import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiPlus,
  FiEye,
  FiEdit,
  FiDownload,
  FiTrendingUp,
  FiBarChart2,
  FiRefreshCw,
  FiShare2,
  FiTrash2,
} from "react-icons/fi";
import "../styles/proposal.css";

const Proposal = () => {
  const { loggedInUser } = useOutletContext();

  const proposals = [
    {
      id: 1,
      title: "New Product Launch",
      dateSubmitted: "2025-10-15",
      status: "Approved",
      amount: 50000,
      description: "Funding for new product development and marketing",
    },
    {
      id: 2,
      title: "Marketing Campaign",
      dateSubmitted: "2025-10-22",
      status: "Pending",
      amount: 25000,
      description: "Digital marketing campaign for Q4 sales boost",
    },
    {
      id: 3,
      title: "Expansion Loan Proposal",
      dateSubmitted: "2025-10-28",
      status: "Rejected",
      amount: 100000,
      description: "Business expansion into new markets",
    },
    {
      id: 4,
      title: "Equipment Upgrade",
      dateSubmitted: "2025-10-30",
      status: "Draft",
      amount: 35000,
      description: "Modernization of production equipment",
    },
  ];

  const totalProposals = proposals.length;
  const approved = proposals.filter((p) => p.status === "Approved").length;
  const pending = proposals.filter((p) => p.status === "Pending").length;
  const rejected = proposals.filter((p) => p.status === "Rejected").length;
  const approvalRate = Math.round((approved / totalProposals) * 100) || 0;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FiCheckCircle size={12} />;
      case "Pending":
        return <FiClock size={12} />;
      case "Rejected":
        return <FiXCircle size={12} />;
      case "Draft":
        return <FiFileText size={12} />;
      default:
        return <FiClock size={12} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Pending":
        return "status-pending";
      case "Rejected":
        return "status-rejected";
      case "Draft":
        return "status-draft";
      default:
        return "status-pending";
    }
  };

  return (
    <div className="proposal-page">
      {/* Header - Same as other pages */}
      <div className="proposal-header">
        <div className="header-content">
          <h1 className="header-title">Proposal Management 📋</h1>
          <p className="header-subtitle">
            Create, track, and manage your loan proposals. Monitor approval
            status and get insights.
          </p>
          <div className="header-badges">
            <div className="header-badge">
              <FiFileText size={14} />
              <span>Easy Submission</span>
            </div>
            <div className="header-badge">
              <FiCheckCircle size={14} />
              <span>Fast Approval</span>
            </div>
            <div className="header-badge">
              <FiBarChart2 size={14} />
              <span>Real-time Tracking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {approved > 0 ? (
        <div className="proposal-alert">
          <p>
            🎉 You have {approved} approved proposal{approved > 1 ? "s" : ""}{" "}
            with {approvalRate}% approval rate!
          </p>
          <button className="create-proposal-btn">Create New Proposal</button>
        </div>
      ) : (
        <div className="proposal-alert warning">
          <p>📝 Start creating proposals to get approved for funding!</p>
          <button className="create-proposal-btn">
            Create Your First Proposal
          </button>
        </div>
      )}

      {/* Stats Cards - Matching style */}
      <div className="proposal-cards">
        <div className="proposal-card">
          <div className="card-icon">
            <FiFileText />
          </div>
          <span className="card-value">{totalProposals}</span>
          <span className="card-label">Total Proposals</span>
          <span className="card-trend">
            <FiTrendingUp /> All time
          </span>
        </div>

        <div className="proposal-card">
          <div className="card-icon">
            <FiCheckCircle />
          </div>
          <span className="card-value">{approved}</span>
          <span className="card-label">Approved</span>
          <span className="card-trend">
            <FiTrendingUp /> {approvalRate}% rate
          </span>
        </div>

        <div className="proposal-card">
          <div className="card-icon">
            <FiClock />
          </div>
          <span className="card-value">{pending}</span>
          <span className="card-label">Pending</span>
          <span className="card-trend">
            <FiTrendingUp /> Under review
          </span>
        </div>

        <div className="proposal-card">
          <div className="card-icon">
            <FiXCircle />
          </div>
          <span className="card-value">{rejected}</span>
          <span className="card-label">Rejected</span>
          <span className="card-trend">
            <FiTrendingUp /> Can be revised
          </span>
        </div>
      </div>

      {/* Proposal Section - Matching details section */}
      <div className="proposal-section">
        <div className="section-header">
          <h2 className="sections-title">
            <FiBarChart2 size={18} /> Your Proposals
          </h2>
          <button className="new-proposal-btn">
            <FiPlus size={14} /> New Proposal
          </button>
        </div>

        {proposals.length > 0 ? (
          <table className="proposal-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date Submitted</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id}>
                  <td>
                    <div className="proposal-title">{proposal.title}</div>
                    <div className="proposal-date">{proposal.description}</div>
                  </td>
                  <td className="proposal-date">
                    {formatDate(proposal.dateSubmitted)}
                  </td>
                  <td className="proposal-title">
                    ₦{proposal.amount.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`proposal-status ${getStatusClass(
                        proposal.status
                      )}`}>
                      {getStatusIcon(proposal.status)}
                      {proposal.status}
                    </span>
                  </td>
                  <td>
                    <div className="proposal-actions">
                      <div className="action-icon" title="View Details">
                        <FiEye />
                      </div>
                      {proposal.status === "Draft" && (
                        <div className="action-icon" title="Edit">
                          <FiEdit />
                        </div>
                      )}
                      {proposal.status === "Approved" && (
                        <div className="action-icon" title="Download">
                          <FiDownload />
                        </div>
                      )}
                      {proposal.status === "Rejected" && (
                        <div className="action-icon" title="Resubmit">
                          <FiShare2 />
                        </div>
                      )}
                      {proposal.status === "Draft" && (
                        <div className="action-icon" title="Delete">
                          <FiTrash2 />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>
              No proposals found. Create your first proposal to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;
