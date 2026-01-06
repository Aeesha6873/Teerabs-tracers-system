import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSave,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHash,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";
import GoogleMapPicker from "./GoogleMapPicker";
import styles from "../../../styles/onboarding.module.css";

const OnboardingUserEdit = ({ user, onSave, onCancel, onBack }) => {
  const [formData, setFormData] = useState({
    ...user,
    status: user.status || "Pending Verification",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLocationChange = (location) => {
    setFormData((prev) => ({
      ...prev,
      location,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.nin.trim()) newErrors.nin = "NIN is required";
    if (!formData.bvn.trim()) newErrors.bvn = "BVN is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.lga.trim()) newErrors.lga = "LGA is required";

    if (formData.registrationType !== "individual") {
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!formData.proposal.trim())
        newErrors.proposal = "Business proposal is required";
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
      {/* Header with Back Button */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to List
        </button>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>Edit User Information</h1>
          <p className={styles.subtitle}>Updating details for {user.name}</p>
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
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${styles.input} ${errors.name ? styles.error : ""}`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
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
              <label>
                <FiHash /> NIN *
              </label>
              <input
                type="text"
                name="nin"
                value={formData.nin}
                onChange={handleChange}
                className={`${styles.input} ${errors.nin ? styles.error : ""}`}
                placeholder="Enter NIN"
                maxLength="11"
              />
              {errors.nin && (
                <span className={styles.errorMessage}>{errors.nin}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>
                <FiHash /> BVN *
              </label>
              <input
                type="text"
                name="bvn"
                value={formData.bvn}
                onChange={handleChange}
                className={`${styles.input} ${errors.bvn ? styles.error : ""}`}
                placeholder="Enter BVN"
                maxLength="11"
              />
              {errors.bvn && (
                <span className={styles.errorMessage}>{errors.bvn}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Registration Type</label>
              <select
                name="registrationType"
                value={formData.registrationType}
                onChange={handleChange}
                className={styles.select}>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="cluster">Cluster</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={styles.select}>
                <option value="Pending Verification">
                  Pending Verification
                </option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiMapPin className={styles.sectionIcon} />
            <h3>Address Information</h3>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`${styles.input} ${
                  errors.address ? styles.error : ""
                }`}
                placeholder="Enter full address"
              />
              {errors.address && (
                <span className={styles.errorMessage}>{errors.address}</span>
              )}
            </div>

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
              <label>LGA *</label>
              <input
                type="text"
                name="lga"
                value={formData.lga}
                onChange={handleChange}
                className={`${styles.input} ${errors.lga ? styles.error : ""}`}
                placeholder="Enter local government"
              />
              {errors.lga && (
                <span className={styles.errorMessage}>{errors.lga}</span>
              )}
            </div>
          </div>
        </div>

        {/* Business Information (Conditional) */}
        {formData.registrationType !== "individual" && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <FiBriefcase className={styles.sectionIcon} />
              <h3>Business Information</h3>
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
                <label>Business Proposal *</label>
                <textarea
                  name="proposal"
                  value={formData.proposal}
                  onChange={handleChange}
                  className={`${styles.textarea} ${
                    errors.proposal ? styles.error : ""
                  }`}
                  placeholder="Describe the business proposal..."
                  rows="4"
                />
                {errors.proposal && (
                  <span className={styles.errorMessage}>{errors.proposal}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Location Map */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FiMapPin className={styles.sectionIcon} />
            <h3>Geographic Location</h3>
          </div>
          <div className={styles.mapSection}>
            <p className={styles.mapDescription}>
              Set the exact geographic location for this user. This will be used
              for verification and service delivery.
            </p>
            <GoogleMapPicker
              location={formData.location}
              setLocation={handleLocationChange}
            />
          </div>
        </div>

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

        {/* Form Actions */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.resetBtn}`}
            onClick={handleReset}>
            Reset Changes
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

export default OnboardingUserEdit;
