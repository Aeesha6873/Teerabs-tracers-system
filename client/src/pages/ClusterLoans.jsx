import React, { useState } from "react";
import "../styles/loans.css";

const ClusterLoan = () => {
  const [formData, setFormData] = useState({
    clusterName: "",
    members: "",
    amount: "",
    purpose: "",
    businessType: "agriculture",
    duration: "12",
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
      clusterName: "",
      members: "",
      amount: "",
      purpose: "",
      businessType: "agriculture",
      duration: "12",
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
              <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Cluster Loan Application
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
              Your cluster loan application has been received and is under
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
                        Cluster Name
                      </div>
                      <div style={{ fontWeight: "500" }}>
                        {formData.clusterName}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-tertiary)",
                        }}>
                        Members
                      </div>
                      <div style={{ fontWeight: "500" }}>
                        {formData.members}
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
                        Duration
                      </div>
                      <div style={{ fontWeight: "500" }}>
                        {formData.duration} months
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
              <button className="btn btn-secondary">
                View Application Status
              </button>
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
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          Cluster Loan Application
        </h2>
      </div>

      <div className="loan-card">
        <div className="loan-card-header">
          <h3>Apply for Cluster Loan</h3>
          <p
            style={{
              color: "var(--text-tertiary)",
              fontSize: "0.875rem",
              marginTop: "0.5rem",
            }}>
            Complete this form to apply for a loan for your business cluster
          </p>
        </div>

        <div className="loan-card-content">
          <form onSubmit={handleSubmit}>
            <div className="loan-form-grid">
              <div className="form-group">
                <label htmlFor="clusterName" className="required">
                  Cluster Name
                </label>
                <input
                  type="text"
                  id="clusterName"
                  name="clusterName"
                  value={formData.clusterName}
                  onChange={handleChange}
                  placeholder="Enter your cluster name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="members" className="required">
                  Number of Members
                </label>
                <input
                  type="number"
                  id="members"
                  name="members"
                  value={formData.members}
                  onChange={handleChange}
                  placeholder="0"
                  min="1"
                  required
                />
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
                <label htmlFor="businessType" className="required">
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required>
                  <option value="agriculture">Agriculture</option>
                  <option value="retail">Retail & Trading</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="services">Services</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="duration" className="required">
                  Loan Duration (months)
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required>
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
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
                  placeholder="Please describe the purpose of this loan..."
                  rows="3"
                  required
                />
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
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClusterLoan;
