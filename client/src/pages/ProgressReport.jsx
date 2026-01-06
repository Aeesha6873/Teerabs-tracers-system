import React from "react";
import { useOutletContext } from "react-router-dom";
import {
  FiPackage,
  FiCheckCircle,
  FiDollarSign,
  FiDownload,
  FiTrendingUp,
  FiBarChart2,
  FiRefreshCw,
  FiPrinter,
  FiPercent,
} from "react-icons/fi";
import "../styles/progressReport.css";

const ProgressReport = () => {
  const { loggedInUser } = useOutletContext();

  const reports = loggedInUser?.loans || [
    {
      id: 1,
      loanTitle: "Business Expansion Loan",
      totalAmount: 50000,
      amountPaid: 20000,
      installmentsCompleted: 2,
      totalInstallments: 5,
      status: "Active",
    },
    {
      id: 2,
      loanTitle: "Startup Loan",
      totalAmount: 20000,
      amountPaid: 20000,
      installmentsCompleted: 4,
      totalInstallments: 4,
      status: "Complete",
    },
    {
      id: 3,
      loanTitle: "Equipment Purchase",
      totalAmount: 100000,
      amountPaid: 40000,
      installmentsCompleted: 2,
      totalInstallments: 5,
      status: "Active",
    },
    {
      id: 4,
      loanTitle: "Home Renovation",
      totalAmount: 75000,
      amountPaid: 15000,
      installmentsCompleted: 1,
      totalInstallments: 6,
      status: "Pending",
    },
  ];

  const totalLoans = reports.length;
  const completedLoans = reports.filter(
    (r) => r.amountPaid >= r.totalAmount
  ).length;
  const totalOutstanding = reports.reduce(
    (sum, r) => sum + (r.totalAmount - r.amountPaid),
    0
  );

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getProgressClass = (percent) => {
    if (percent >= 100) return "progress-complete";
    if (percent >= 70) return "progress-high";
    if (percent >= 40) return "progress-medium";
    return "progress-low";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Complete":
        return <FiCheckCircle size={12} />;
      case "Active":
        return <FiTrendingUp size={12} />;
      case "Pending":
        return <FiPercent size={12} />;
      default:
        return <FiTrendingUp size={12} />;
    }
  };

  return (
    <div className="progress-page">
      {/* Header - Same as other pages */}
      <div className="progress-header">
        <div className="header-content">
          <h1 className="header-title">Progress Report 📈</h1>
          <p className="header-subtitle">
            Track your loan repayment progress, monitor completion rates, and
            stay updated on your financial journey.
          </p>
          <div className="header-badges">
            <div className="header-badge">
              <FiPercent size={14} />
              <span>Real-time Progress</span>
            </div>
            <div className="header-badge">
              <FiCheckCircle size={14} />
              <span>Completion Tracking</span>
            </div>
            <div className="header-badge">
              <FiTrendingUp size={14} />
              <span>Performance Analytics</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Matching style */}
      <div className="progress-cards">
        <div className="progress-card">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <span className="card-value">{totalLoans}</span>
          <span className="card-label">Total Loans</span>
          <span className="card-trend">
            <FiTrendingUp /> {completedLoans} completed
          </span>
        </div>

        <div className="progress-card">
          <div className="stat-icon">
            <FiCheckCircle />
          </div>
          <span className="card-value">{completedLoans}</span>
          <span className="card-label">Completed Loans</span>
          <span className="card-trend">
            <FiTrendingUp /> {Math.round((completedLoans / totalLoans) * 100)}%
            rate
          </span>
        </div>

        <div className="progress-card">
          <div className="stat-icon">
            <FiDollarSign />
          </div>
          <span className="card-value">{formatCurrency(totalOutstanding)}</span>
          <span className="card-label">Total Outstanding</span>
          <span className="card-trend">
            <FiTrendingUp /> Outstanding balance
          </span>
        </div>
      </div>

      {/* Table Section - Matching details section */}
      <div className="progress-section">
        <div className="section-header">
          <h2 className="sections-title">
            <FiBarChart2 size={18} /> Loan Progress Details
          </h2>
          <button className="download-btn">
            <FiDownload size={14} /> Download Report
          </button>
        </div>

        {reports.length > 0 ? (
          <table className="progress-table">
            <thead>
              <tr>
                <th>Loan Title</th>
                <th>Total Amount</th>
                <th>Amount Paid</th>
                <th>Installments</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const progressPercent = Math.round(
                  (report.amountPaid / report.totalAmount) * 100
                );
                const isComplete = report.amountPaid >= report.totalAmount;

                return (
                  <tr key={report.id}>
                    <td className="loan-title">{report.loanTitle}</td>
                    <td className="loan-amount">
                      {formatCurrency(report.totalAmount)}
                    </td>
                    <td className="loan-amount">
                      {formatCurrency(report.amountPaid)}
                    </td>
                    <td>
                      <span className="loan-amount">
                        {report.installmentsCompleted}/
                        {report.totalInstallments}
                      </span>
                    </td>
                    <td>
                      <div className="progress-bar-container">
                        <div
                          className={`progress-bar ${getProgressClass(
                            progressPercent
                          )}`}
                          style={{
                            width: `${Math.min(progressPercent, 100)}%`,
                          }}
                        />
                        <span className="progress-percent">
                          {progressPercent}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`loan-status ${
                          isComplete
                            ? "status-complete"
                            : report.status === "Active"
                            ? "status-active"
                            : "status-pending"
                        }`}>
                        {getStatusIcon(isComplete ? "Complete" : report.status)}
                        {isComplete ? "Complete" : report.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>
              No progress reports found. Start your first loan to track
              progress!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressReport;
