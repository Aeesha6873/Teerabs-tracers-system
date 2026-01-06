import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  FiPackage,
  FiAlertCircle,
  FiDollarSign,
  FiDownload,
  FiEye,
  FiTrendingUp,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";
import "../styles/monitoring.css";

const Monitoring = () => {
  const { loggedInUser } = useOutletContext();

  const loans = loggedInUser?.loans || [
    {
      id: 1,
      title: "Business Expansion Loan",
      lastPaymentDate: "2025-10-25",
      nextInstallmentDue: "2025-11-10",
      status: "On Track",
      amount: 50000,
      outstanding: 15000,
    },
    {
      id: 2,
      title: "Startup Loan",
      lastPaymentDate: "2025-10-20",
      nextInstallmentDue: "2025-11-05",
      status: "Overdue",
      amount: 30000,
      outstanding: 10000,
    },
    {
      id: 3,
      title: "Equipment Financing",
      lastPaymentDate: "2025-10-28",
      nextInstallmentDue: "2025-11-15",
      status: "Pending",
      amount: 25000,
      outstanding: 8000,
    },
  ];

  const totalLoans = loans.length;
  const overdueLoans = loans.filter((l) => l.status === "Overdue").length;
  const totalOutstanding = loans.reduce((sum, l) => sum + l.outstanding, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "On Track":
        return <FiCheckCircle size={12} />;
      case "Overdue":
        return <FiXCircle size={12} />;
      case "Pending":
        return <FiClock size={12} />;
      default:
        return <FiCheckCircle size={12} />;
    }
  };

  return (
    <div className="monitoring-page">
      {/* Header - Same as Evaluation/Overview */}
      <div className="monitoring-header">
        <div className="header-content">
          <h1 className="header-title">Loan Monitoring Dashboard 📊</h1>
          <p className="header-subtitle">
            Track your loan portfolio, monitor payments, and stay on top of your
            financial obligations.
          </p>
        </div>
      </div>

      {/* Stats Cards - Matching style */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <span className="stat-value">{totalLoans}</span>
          <span className="stat-label">Total Loans</span>
          <span className="stat-trend">
            <FiTrendingUp /> {loans.length} active
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAlertCircle />
          </div>
          <span className="stat-value">{overdueLoans}</span>
          <span className="stat-label">Overdue Loans</span>
          <span className="stat-trend">
            <FiTrendingUp /> {overdueLoans > 0 ? "Needs attention" : "All good"}
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <span className="stat-value">
            ${totalOutstanding.toLocaleString()}
          </span>
          <span className="stat-label">Total Outstanding</span>
          <span className="stat-trend">
            <FiTrendingUp /> Total balance
          </span>
        </div>
      </div>

      {/* Table Section - Matching details section */}
      <div className="table-section">
        <div className="table-header">
          <h2 className="table-title">
            <FiBarChart2 size={18} /> Loan Portfolio
          </h2>
          <button className="export-btn">
            <FiDownload size={14} /> Export Report
          </button>
        </div>

        {loans.length > 0 ? (
          <table className="monitoring-table">
            <thead>
              <tr>
                <th>Loan Title</th>
                <th>Last Payment</th>
                <th>Next Installment</th>
                <th>Amount</th>
                <th>Outstanding</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td className="loan-title">{loan.title}</td>
                  <td>{formatDate(loan.lastPaymentDate)}</td>
                  <td>{formatDate(loan.nextInstallmentDue)}</td>
                  <td className="loan-amount">
                    ${loan.amount.toLocaleString()}
                  </td>
                  <td className="loan-amount">
                    ${loan.outstanding.toLocaleString()}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        loan.status === "On Track"
                          ? "status-ok"
                          : loan.status === "Overdue"
                          ? "status-overdue"
                          : "status-pending"
                      }`}>
                      {getStatusIcon(loan.status)}
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>No loans found. Apply for your first loan to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monitoring;
