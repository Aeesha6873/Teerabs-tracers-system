import React, { useState } from "react";
import "../styles/loans.css";

const ClusterLoan = () => {
  const [clusterName, setClusterName] = useState("");
  const [members, setMembers] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    setSubmitted(true);
  };

  return (
    <div className="loan-page">
      <h2>Cluster Loan Application</h2>

      {!submitted ? (
        <form className="loan-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cluster Name</label>
            <input
              type="text"
              value={clusterName}
              onChange={(e) => setClusterName(e.target.value)}
              placeholder="Enter cluster name"
              required
            />
          </div>

          <div className="form-group">
            <label>Number of Members</label>
            <input
              type="number"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Enter number of members"
              required
            />
          </div>

          <div className="form-group">
            <label>Loan Amount (₦)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label>Purpose</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Reason for loan"
              required
            />
          </div>

          <button className="apply-btn" type="submit">
            Apply for Cluster Loan
          </button>
        </form>
      ) : (
        <div className="success-message">
          ✅ Your cluster loan application has been submitted!
        </div>
      )}
    </div>
  );
};

export default ClusterLoan;
