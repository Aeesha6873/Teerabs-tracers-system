import React from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/weeklyRemittance.css";

const WeeklyRemittance = () => {
  const { loggedInUser } = useOutletContext();

  const remittances =
    loggedInUser?.loans?.map((loan) => ({
      id: loan.id,
      title: loan.title,
      lastWeekPayment: loan.paid / (loan.totalInstallments || 1),
      dueThisWeek:
        (loan.amount - loan.paid) /
        (loan.totalInstallments - loan.installmentsCompleted || 1),
    })) || [];

  const totalLoans = remittances.length;
  const totalPaid = remittances.reduce((sum, r) => sum + r.lastWeekPayment, 0);
  const totalDue = remittances.reduce((sum, r) => sum + r.dueThisWeek, 0);

  return (
    <div className="weekly-remittance-page">
      <h2>Weekly Remittance</h2>

      <div className="remittance-cards">
        <div className="remittance-card">
          <h3>Total Loans</h3>
          <p>{totalLoans}</p>
        </div>
        <div className="remittance-card">
          <h3>Total Paid Last Week</h3>
          <p>₦{Math.round(totalPaid).toLocaleString()}</p>
        </div>
        <div className="remittance-card">
          <h3>Due This Week</h3>
          <p>₦{Math.round(totalDue).toLocaleString()}</p>
        </div>
      </div>

      <table className="remittance-table">
        <thead>
          <tr>
            <th>Loan Title</th>
            <th>Last Week Payment (₦)</th>
            <th>Amount Due This Week (₦)</th>
          </tr>
        </thead>
        <tbody>
          {remittances.map((remit) => (
            <tr key={remit.id}>
              <td>{remit.title}</td>
              <td>₦{Math.round(remit.lastWeekPayment).toLocaleString()}</td>
              <td>₦{Math.round(remit.dueThisWeek).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyRemittance;
