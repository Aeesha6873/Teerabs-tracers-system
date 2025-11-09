import React from "react";
import { FiCheckCircle, FiXCircle, FiPlusCircle } from "react-icons/fi";
import "../styles/overview.css";

export default function Overview({ loggedInUser }) {
  return (
    <div className="overview-page">
      <h1>Welcome, {loggedInUser?.name || "User"}!</h1>
      <p>Here's your loan overview.</p>

      <div className="overview-cards">
        <div className="card">
          <h3>Active Loans</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Pending Approvals</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Completed Loans</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Outstanding Balance</h3>
          <p>$0</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-feed">
          <div className="activity-item approved">
            <div className="icon">
              <FiCheckCircle />
            </div>
            <p>Loan approved</p>
            <span>3 mins ago</span>
          </div>
          <div className="activity-item rejected">
            <div className="icon">
              <FiXCircle />
            </div>
            <p>Loan rejected</p>
            <span>1 hour ago</span>
          </div>
          <div className="activity-item submitted">
            <div className="icon">
              <FiPlusCircle />
            </div>
            <p>New loan submitted</p>
            <span>Yesterday</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="apply-loan">Apply for New Loan</button>
        <button className="make-payment">Make a Repayment</button>
        <button className="view-details">View Loan Details</button>
      </div>
    </div>
  );
}
