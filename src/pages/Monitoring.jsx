import React from "react";
import { useOutletContext } from "react-router-dom";
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
  ];

  const totalLoans = loans.length;
  const overdueLoans = loans.filter((l) => l.status === "Overdue").length;
  const totalOutstanding = loans.reduce((sum, l) => sum + l.outstanding, 0);

  return (
    <div className="monitoring-page">
      <h2>Monitoring</h2>

      <div className="monitoring-cards">
        <div className="monitoring-card">
          <h3>Total Loans</h3>
          <p>{totalLoans}</p>
        </div>
        <div className="monitoring-card">
          <h3>Overdue Loans</h3>
          <p>{overdueLoans}</p>
        </div>
        <div className="monitoring-card">
          <h3>Total Outstanding</h3>
          <p>${totalOutstanding.toLocaleString()}</p>
        </div>
      </div>

      <table className="monitoring-table">
        <thead>
          <tr>
            <th>Loan Title</th>
            <th>Last Payment</th>
            <th>Next Installment</th>
            <th>Outstanding</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.title}</td>
              <td>{loan.lastPaymentDate}</td>
              <td>{loan.nextInstallmentDue}</td>
              <td>${loan.outstanding.toLocaleString()}</td>
              <td
                className={
                  loan.status === "Overdue" ? "status-overdue" : "status-ok"
                }>
                {loan.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Monitoring;
