import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBriefcase,
  FiCreditCard,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import styles from "../../../styles/adminUsers.module.css";

const EditUser = ({ user, onSave, onCancel, onBack }) => {
  const [formData, setFormData] = useState({
    ...user,
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (formData.type === "Business" && !formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleReset = () => {
    setFormData({ ...user });
    setErrors({});
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to Users
        </button>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>Edit User</h1>
          <p className={styles.subtitle}>Editing user #{user.id}</p>
        </div>
        <button
          className={`${styles.btn} ${styles.cancelBtn}`}
          onClick={onCancel}>
          <FiX /> Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Personal Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiUser className={styles.sectionIcon} />
            <h3>Personal Information</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`${styles.input} ${
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
                className={`${styles.input} ${
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
                className={`${styles.input} ${
                  errors.phone ? styles.error : ""
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <span className={styles.errorMessage}>{errors.phone}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>User Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={styles.select}>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.select}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiMapPin className={styles.sectionIcon} />
            <h3>Location Details</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.state ? styles.error : ""
                }`}
                placeholder="Enter state"
              />
              {errors.state && (
                <span className={styles.errorMessage}>{errors.state}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>LGA</label>
              <input
                type="text"
                name="lga"
                value={formData.lga}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter local government area"
              />
            </div>
          </div>
        </div>

        {/* Identity Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiCreditCard className={styles.sectionIcon} />
            <h3>Identity Details</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>BVN</label>
              <input
                type="text"
                name="bvn"
                value={formData.bvn}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter Bank Verification Number"
                maxLength="11"
              />
            </div>

            <div className={styles.formGroup}>
              <label>NIN</label>
              <input
                type="text"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter National Identification Number"
                maxLength="11"
              />
            </div>
          </div>
        </div>

        {/* Business Details (Conditional) */}
        {formData.type === "Business" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiBriefcase className={styles.sectionIcon} />
              <h3>Business Details</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={`${styles.input} ${
                    errors.businessName ? styles.error : ""
                  }`}
                  placeholder="Enter business name"
                />
                {errors.businessName && (
                  <span className={styles.errorMessage}>
                    {errors.businessName}
                  </span>
                )}
              </div>

              <div
                className={styles.formGroup}
                style={{ gridColumn: "1 / -1" }}>
                <label>Business Proposal</label>
                <textarea
                  name="proposal"
                  value={formData.proposal}
                  onChange={handleChange}
                  className={styles.textarea}
                  placeholder="Describe the business proposal..."
                  rows="4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bank Details */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiDollarSign className={styles.sectionIcon} />
            <h3>Bank Details</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter bank name"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Account Name</label>
              <input
                type="text"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter account name"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter account number"
                maxLength="10"
              />
            </div>
          </div>
        </div>

        {/* Document Status */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiFileText className={styles.sectionIcon} />
            <h3>Document Verification</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>ID Verification</label>
              <select
                name="idVerified"
                value={formData.idVerified || "pending"}
                onChange={handleChange}
                className={styles.select}>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Bank Statement</label>
              <select
                name="bankVerified"
                value={formData.bankVerified || "pending"}
                onChange={handleChange}
                className={styles.select}>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.resetBtn}`}
            onClick={handleReset}>
            Reset Form
          </button>
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={`${styles.btn} ${styles.cancelBtn}`}
              onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
              <FiSave /> Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
