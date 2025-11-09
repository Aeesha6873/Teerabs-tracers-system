import React from "react";
import { useOutletContext } from "react-router-dom";
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
    },
    {
      id: 2,
      loanTitle: "Startup Loan",
      totalAmount: 20000,
      amountPaid: 20000,
      installmentsCompleted: 4,
      totalInstallments: 4,
    },
    {
      id: 3,
      loanTitle: "Equipment Purchase",
      totalAmount: 100000,
      amountPaid: 40000,
      installmentsCompleted: 2,
      totalInstallments: 5,
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

  return (
    <div className="progress-page">
      <h2>Progress Report</h2>

      <div className="progress-cards">
        <div className="progress-card">
          <h3>Total Loans</h3>
          <p>{totalLoans}</p>
        </div>
        <div className="progress-card">
          <h3>Completed Loans</h3>
          <p>{completedLoans}</p>
        </div>
        <div className="progress-card">
          <h3>Total Outstanding</h3>
          <p>₦{totalOutstanding.toLocaleString()}</p>
        </div>
      </div>

      <table className="progress-table">
        <thead>
          <tr>
            <th>Loan Title</th>
            <th>Total Amount</th>
            <th>Amount Paid</th>
            <th>Installments</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => {
            const progressPercent = Math.round(
              (report.amountPaid / report.totalAmount) * 100
            );
            return (
              <tr key={report.id}>
                <td>{report.loanTitle}</td>
                <td>₦{report.totalAmount.toLocaleString()}</td>
                <td>₦{report.amountPaid.toLocaleString()}</td>
                <td>
                  {report.installmentsCompleted}/{report.totalInstallments}
                </td>
                <td>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressReport;
