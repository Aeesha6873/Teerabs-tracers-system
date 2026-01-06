import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSave,
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiPercent,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import styles from "../../../styles/adminloan.module.css";

const LoanEdit = ({ loan, onSave, onCancel, onBack }) => {
  const [formData, setFormData] = useState({
    ...loan,
    amount: loan.amount.toString(),
    interestRate: loan.interestRate.toString(),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.amount || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Valid amount is required";
    if (!formData.interestRate || parseFloat(formData.interestRate) < 0)
      newErrors.interestRate = "Valid interest rate is required";
    if (!formData.duration || parseInt(formData.duration) <= 0)
      newErrors.duration = "Valid duration is required";
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const updatedLoan = {
        ...formData,
        amount: parseFloat(formData.amount),
        interestRate: parseFloat(formData.interestRate),
        duration: parseInt(formData.duration),
      };
      onSave(updatedLoan);
    }
  };

  const handleReset = () => {
    setFormData({
      ...loan,
      amount: loan.amount.toString(),
      interestRate: loan.interestRate.toString(),
    });
    setErrors({});
  };

  const loanTypes = [
    "Business Loan",
    "Personal Loan",
    "Agricultural Loan",
    "Education Loan",
    "Emergency Loan",
    "Asset Finance",
    "Working Capital",
    "Other",
  ];

  const statusOptions = [
    "Pending",
    "Approved",
    "Rejected",
    "Disbursed",
    "On Hold",
  ];

  const repaymentPlans = [
    "Monthly",
    "Bi-weekly",
    "Weekly",
    "Quarterly",
    "Bullet Payment",
  ];

  return (
    <div className={styles.loanEditContainer}>
      {/* Header */}
      <div className={styles.editHeader}>
        <button onClick={onBack} className={styles.btnBack}>
          <FiArrowLeft /> Back to Loans
        </button>
        <h1>Edit Loan Application</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.editForm}>
        {/* Basic Information Section */}
        <div className={styles.formSection}>
          <h3>Basic Information</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <FiUser /> Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.fullName ? styles.error : ""
                }`}
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <span className={styles.errorMessage}>{errors.fullName}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiMail /> Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.email ? styles.error : ""
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <span className={styles.errorMessage}>{errors.email}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiPhone /> Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.phone ? styles.error : ""
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <span className={styles.errorMessage}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiMapPin /> Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.address ? styles.error : ""
                }`}
                placeholder="Enter address"
              />
              {errors.address && (
                <span className={styles.errorMessage}>{errors.address}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Loan Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.formControl}>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Loan Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={styles.formControl}>
                {loanTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>Loan Purpose *</label>
              <textarea
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.purpose ? styles.error : ""
                }`}
                placeholder="Describe the purpose of the loan..."
                rows="3"
              />
              {errors.purpose && (
                <span className={styles.errorMessage}>{errors.purpose}</span>
              )}
            </div>
          </div>
        </div>

        {/* Loan Details Section */}
        <div className={styles.formSection}>
          <h3>Loan Details</h3>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>
                <FiDollarSign /> Amount (₦) *
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.amount ? styles.error : ""
                }`}
                placeholder="Enter loan amount"
                min="0"
                step="1000"
              />
              {errors.amount && (
                <span className={styles.errorMessage}>{errors.amount}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiPercent /> Interest Rate (%) *
              </label>
              <input
                type="number"
                name="interestRate"
                value={formData.interestRate}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.interestRate ? styles.error : ""
                }`}
                placeholder="Enter interest rate"
                min="0"
                step="0.1"
              />
              {errors.interestRate && (
                <span className={styles.errorMessage}>
                  {errors.interestRate}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiCalendar /> Duration (months) *
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`${styles.formControl} ${
                  errors.duration ? styles.error : ""
                }`}
                placeholder="Enter duration in months"
                min="1"
                max="60"
              />
              {errors.duration && (
                <span className={styles.errorMessage}>{errors.duration}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Repayment Plan</label>
              <select
                name="repaymentPlan"
                value={formData.repaymentPlan}
                onChange={handleChange}
                className={styles.formControl}>
                {repaymentPlans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label>
                <FiFileText /> Admin Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={styles.formControl}
                placeholder="Add any notes or comments..."
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={onCancel}>
            <FiX /> Cancel
          </button>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={handleReset}>
            Reset
          </button>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}>
            <FiSave /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanEdit;
