import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  FiPackage,
  FiCheckCircle,
  FiDollarSign,
  FiCalendar,
  FiDownload,
  FiTrendingUp,
  FiClock,
  FiRefreshCw,
  FiAlertCircle,
  FiArrowRight,
  FiBarChart2,
} from "react-icons/fi";
import "../styles/weeklyRemittance.css";

const WeeklyRemittance = () => {
  const { loggedInUser } = useOutletContext();
  const [selectedWeek, setSelectedWeek] = useState("current");

  // Sample data - In real app, this would come from API
  const remittances = [
    {
      id: 1,
      title: "Business Expansion Loan",
      lastWeekPayment: 5000,
      dueThisWeek: 5000,
      status: "paid",
      paidDate: "2025-10-25",
    },
    {
      id: 2,
      title: "Startup Loan",
      lastWeekPayment: 2500,
      dueThisWeek: 2500,
      status: "due",
      paidDate: null,
    },
    {
      id: 3,
      title: "Equipment Purchase",
      lastWeekPayment: 8000,
      dueThisWeek: 8000,
      status: "overdue",
      paidDate: null,
    },
    {
      id: 4,
      title: "Home Renovation",
      lastWeekPayment: 3000,
      dueThisWeek: 3000,
      status: "paid",
      paidDate: "2025-10-26",
    },
  ];

  const totalLoans = remittances.length;
  const totalPaid = remittances.reduce((sum, r) => sum + r.lastWeekPayment, 0);
  const totalDue = remittances.reduce((sum, r) => sum + r.dueThisWeek, 0);
  const overdueLoans = remittances.filter((r) => r.status === "overdue").length;
  const hasOverdue = overdueLoans > 0;

  const formatCurrency = (amount) => {
    return `₦${Math.round(amount).toLocaleString()}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <FiCheckCircle size={12} />;
      case "due":
        return <FiClock size={12} />;
      case "overdue":
        return <FiAlertCircle size={12} />;
      default:
        return <FiClock size={12} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "paid":
        return "status-paid";
      case "due":
        return "status-due";
      case "overdue":
        return "status-overdue";
      default:
        return "status-due";
    }
  };

  const getAmountClass = (status) => {
    switch (status) {
      case "paid":
        return "amount-paid";
      case "due":
        return "amount-due";
      case "overdue":
        return "amount-overdue";
      default:
        return "amount-due";
    }
  };

  return (
    <div className="weekly-remittance-page">
      {/* Header - Same as other pages */}
      <div className="remittance-header">
        <div className="header-content">
          <h1 className="header-title">Weekly Remittance 💰</h1>
          <p className="header-subtitle">
            Track your weekly payments, monitor due dates, and manage your
            repayment schedule effectively.
          </p>
          <div className="header-badges">
            <div className="header-badge">
              <FiCalendar size={14} />
              <span>Weekly Tracking</span>
            </div>
            <div className="header-badge">
              <FiClock size={14} />
              <span>Due Date Alerts</span>
            </div>
            <div className="header-badge">
              <FiCheckCircle size={14} />
              <span>Payment History</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Alert Banner */}
      {hasOverdue ? (
        <div className="payment-alert">
          <p>
            ⚠️ You have {overdueLoans} overdue payment
            {overdueLoans > 1 ? "s" : ""}. Please make immediate payment.
          </p>
          <button className="make-payment-btn">Make Payment Now</button>
        </div>
      ) : (
        <div className="payment-alert success">
          <p>✅ All payments are up to date. Great job!</p>
          <button className="make-payment-btn">Make Early Payment</button>
        </div>
      )}

      {/* Stats Cards - Matching style */}
      <div className="remittance-cards">
        <div className="remittance-card">
          <div className="card-icon">
            <FiPackage />
          </div>
          <span className="card-value">{totalLoans}</span>
          <span className="card-label">Total Loans</span>
          <span className="card-trend">
            <FiTrendingUp />{" "}
            {remittances.filter((r) => r.status === "paid").length} paid
          </span>
        </div>

        <div className="remittance-card">
          <div className="card-icon">
            <FiCheckCircle />
          </div>
          <span className="card-value">{formatCurrency(totalPaid)}</span>
          <span className="card-label">Total Paid Last Week</span>
          <span className="card-trend">
            <FiTrendingUp />{" "}
            {Math.round(totalPaid / totalLoans).toLocaleString()} avg
          </span>
        </div>

        <div className="remittance-card">
          <div className="card-icon">
            <FiDollarSign />
          </div>
          <span className="card-value">{formatCurrency(totalDue)}</span>
          <span className="card-label">Due This Week</span>
          <span className="card-trend">
            <FiClock /> Due in 3 days
          </span>
        </div>
      </div>

      {/* Remittance Section - Matching details section */}
      <div className="remittance-section">
        <div className="section-header">
          <h2 className="sections-title">
            <FiBarChart2 size={18} /> Weekly Payment Details
          </h2>
          <button className="week-selector">
            <FiCalendar size={14} /> Week{" "}
            {selectedWeek === "current" ? "44" : "43"} of 2025
          </button>
        </div>

        {remittances.length > 0 ? (
          <table className="remittance-table">
            <thead>
              <tr>
                <th>Loan Title</th>
                <th>Last Week Payment</th>
                <th>Amount Due This Week</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {remittances.map((remit) => (
                <tr key={remit.id}>
                  <td className="loan-title">{remit.title}</td>
                  <td>
                    <span className="amount-paid">
                      <span className="currency">₦</span>
                      {Math.round(remit.lastWeekPayment).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className={getAmountClass(remit.status)}>
                      <span className="currency">₦</span>
                      {Math.round(remit.dueThisWeek).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`payment-status ${getStatusClass(
                        remit.status
                      )}`}>
                      {getStatusIcon(remit.status)}
                      {remit.status === "paid"
                        ? "Paid"
                        : remit.status === "due"
                        ? "Due This Week"
                        : "Overdue"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <p>
              No remittance data found. Start your first loan to track weekly
              payments!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyRemittance;
