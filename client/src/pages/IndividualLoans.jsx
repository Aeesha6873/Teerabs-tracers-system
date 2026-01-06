import React, { useState } from "react";
import "../styles/loans.css";

const IndividualLoan = () => {
  const [formData, setFormData] = useState({
    amount: "",
    purpose: "",
    repayment: "12",
    loanType: "business",
    collateral: "none",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      amount: "",
      purpose: "",
      repayment: "12",
      loanType: "business",
      collateral: "none",
    });
  };

  if (submitted) {
    return (
      <div className="loan-page">
        <div className="loan-page-header">
          <h2>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Individual Loan Application
          </h2>
        </div>

        <div className="loan-card">
          <div className="success-state">
            <div className="success-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3>Application Submitted Successfully!</h3>
            <p>
              Your individual loan application has been received and is under
              review.
            </p>

            <div className="application-summary">
              <div className="loan-card" style={{ marginBottom: "1.5rem" }}>
                <div className="loan-card-content">
                  <h4
                    style={{
                      marginBottom: "1rem",
                      color: "var(--text-secondary)",
                    }}>
                    Application Summary
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1rem",
                    }}>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}>
                        Loan Type
                      </div>
                      <div
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}>
                        {formData.loanType}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}>
                        Amount
                      </div>
                      <div style={{ fontWeight: "500" }}>
                        ₦{parseInt(formData.amount).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}>
                        Repayment Period
                      </div>
                      <div style={{ fontWeight: "500" }}>
                        {formData.repayment} months
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}>
                        Collateral
                      </div>
                      <div
                        style={{
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}>
                        {formData.collateral}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="form-actions"
              style={{ justifyContent: "center", borderTop: "none" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  handleReset();
                }}>
                Apply for Another Loan
              </button>
              <button className="btn btn-secondary">Track Application</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-page">
      <div className="loan-page-header">
        <h2>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Individual Loan Application
        </h2>
      </div>

      <div className="loan-card">
        <div className="loan-card-header">
          <h3>Apply for Individual Loan</h3>
          <p
            style={{
              color: "var(--text-tertiary)",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
            }}>
            Complete this form to apply for a personal or business loan
          </p>
        </div>

        <div className="loan-card-content">
          <form onSubmit={handleSubmit}>
            <div className="loan-form-grid">
              <div className="form-group">
                <label htmlFor="loanType" className="required">
                  Loan Type
                </label>
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  required>
                  <option value="business">Business Loan</option>
                  <option value="personal">Personal Loan</option>
                  <option value="education">Education Loan</option>
                  <option value="medical">Medical Loan</option>
                  <option value="home">Home Improvement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="amount" className="required">
                  Loan Amount
                </label>
                <div className="amount-input-container">
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0"
                    min="1000"
                    step="1000"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="repayment" className="required">
                  Repayment Plan
                </label>
                <select
                  id="repayment"
                  name="repayment"
                  value={formData.repayment}
                  onChange={handleChange}
                  required>
                  <option value="3">3 months</option>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="collateral" className="required">
                  Collateral Type
                </label>
                <select
                  id="collateral"
                  name="collateral"
                  value={formData.collateral}
                  onChange={handleChange}
                  required>
                  <option value="none">No Collateral</option>
                  <option value="property">Property</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="equipment">Equipment</option>
                  <option value="savings">Savings Account</option>
                  <option value="guarantor">Guarantor</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label htmlFor="purpose" className="required">
                  Purpose of Loan
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  placeholder="Please describe in detail how you plan to use the loan..."
                  rows="4"
                  required
                />
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-tertiary)",
                    marginTop: "0.25rem",
                  }}>
                  Be specific about your intended use of funds
                </p>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}>
                {loading ? (
                  <>
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        opacity="0.25"
                      />
                      <path
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                        opacity="0.75"
                      />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                    Submit Application
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleReset}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" />
                  <path d="M9 12h6" />
                </svg>
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IndividualLoan;
