import React, { useState } from "react";
import "../styles/loans.css";

const IndividualLoan = () => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [repayment, setRepayment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API
    setSubmitted(true);
  };

  return (
    <div className="loan-page">
      <h2>Individual Loan Application</h2>

      {!submitted ? (
        <form className="loan-form" onSubmit={handleSubmit}>
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

          <div className="form-group">
            <label>Repayment Plan (months)</label>
            <input
              type="number"
              value={repayment}
              onChange={(e) => setRepayment(e.target.value)}
              placeholder="Enter months"
              required
            />
          </div>

          <button className="apply-btn" type="submit">
            Apply for Loan
          </button>
        </form>
      ) : (
        <div className="success-message">
          ✅ Your individual loan application has been submitted!
        </div>
      )}
    </div>
  );
};

export default IndividualLoan;
