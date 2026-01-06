import React, { useState } from "react";
import {
  FiArrowLeft,
  FiSave,
  FiX,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
} from "react-icons/fi";
import { MdDescription } from "react-icons/md";

const ClusterEdit = ({ cluster, onSave, onCancel, onBack }) => {
  const [formData, setFormData] = useState({
    name: cluster?.name || "",
    code: cluster?.code || "",
    status: cluster?.status || "Active",
    location: cluster?.location || "",
    businessType: cluster?.businessType || "Technology",
    description: cluster?.description || "",
    loanLimit: cluster?.loanLimit || 100000,
    performance: cluster?.performance || "Good",
    leader: {
      name: cluster?.leader?.name || "",
      email: cluster?.leader?.email || "",
      phone: cluster?.leader?.phone || "",
      nin: cluster?.leader?.nin || "",
      role: cluster?.leader?.role || "Leader",
    },
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

  const handleLeaderChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      leader: {
        ...prev.leader,
        [name]: value,
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Cluster name is required";
    if (!formData.code.trim()) newErrors.code = "Cluster code is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.leader.name.trim())
      newErrors["leader.name"] = "Leader name is required";
    if (!formData.leader.email.trim())
      newErrors["leader.email"] = "Email is required";
    if (!formData.leader.phone.trim())
      newErrors["leader.phone"] = "Phone is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.leader.email && !emailRegex.test(formData.leader.email)) {
      newErrors["leader.email"] = "Invalid email format";
    }

    // Phone validation (basic)
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (formData.leader.phone && !phoneRegex.test(formData.leader.phone)) {
      newErrors["leader.phone"] = "Invalid phone number";
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
    setFormData({
      name: cluster?.name || "",
      code: cluster?.code || "",
      status: cluster?.status || "Active",
      location: cluster?.location || "",
      businessType: cluster?.businessType || "Technology",
      description: cluster?.description || "",
      loanLimit: cluster?.loanLimit || 100000,
      performance: cluster?.performance || "Good",
      leader: {
        name: cluster?.leader?.name || "",
        email: cluster?.leader?.email || "",
        phone: cluster?.leader?.phone || "",
        nin: cluster?.leader?.nin || "",
        role: cluster?.leader?.role || "Leader",
      },
    });
    setErrors({});
  };

  if (!cluster) {
    return (
      <div className="cluster-edit">
        <div className="edit-header">
          <button onClick={onBack} className="btn-back">
            <FiArrowLeft /> Back to Clusters
          </button>
          <h1>Edit Cluster</h1>
        </div>
        <div className="empty-state">
          <p>No cluster selected for editing.</p>
          <button onClick={onBack} className="btn btn-primary">
            Return to Clusters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cluster-edit">
      {/* Header */}
      <div className="edit-header">
        <button onClick={onBack} className="btn-back">
          <FiArrowLeft /> Back to Clusters
        </button>
        <h1>Edit Cluster</h1>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FiBriefcase /> Cluster Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? "error" : ""}`}
                placeholder="Enter cluster name"
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Cluster Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className={`form-control ${errors.code ? "error" : ""}`}
                placeholder="Enter cluster code"
              />
              {errors.code && (
                <span className="error-message">{errors.code}</span>
              )}
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control">
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <FiMapPin /> Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`form-control ${errors.location ? "error" : ""}`}
                placeholder="Enter location"
              />
              {errors.location && (
                <span className="error-message">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label>Business Type</label>
              <select
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className="form-control">
                <option value="Technology">Technology</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Services">Services</option>
                <option value="Crafts">Crafts</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Transportation">Transportation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group form-group-full">
              <label>
                <MdDescription /> Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Describe the cluster's activities and goals..."
                rows="4"
              />
            </div>
          </div>
        </div>

        {/* Leader Information Section */}
        <div className="form-section">
          <h3>Leader Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FiUser /> Leader Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.leader.name}
                onChange={handleLeaderChange}
                className={`form-control ${
                  errors["leader.name"] ? "error" : ""
                }`}
                placeholder="Enter leader's full name"
              />
              {errors["leader.name"] && (
                <span className="error-message">{errors["leader.name"]}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FiMail /> Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.leader.email}
                onChange={handleLeaderChange}
                className={`form-control ${
                  errors["leader.email"] ? "error" : ""
                }`}
                placeholder="Enter email address"
              />
              {errors["leader.email"] && (
                <span className="error-message">{errors["leader.email"]}</span>
              )}
            </div>

            <div className="form-group">
              <label>
                <FiPhone /> Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.leader.phone}
                onChange={handleLeaderChange}
                className={`form-control ${
                  errors["leader.phone"] ? "error" : ""
                }`}
                placeholder="Enter phone number"
              />
              {errors["leader.phone"] && (
                <span className="error-message">{errors["leader.phone"]}</span>
              )}
            </div>

            <div className="form-group">
              <label>National ID (NIN)</label>
              <input
                type="text"
                name="nin"
                value={formData.leader.nin}
                onChange={handleLeaderChange}
                className="form-control"
                placeholder="Enter National Identification Number"
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select
                name="role"
                value={formData.leader.role}
                onChange={handleLeaderChange}
                className="form-control">
                <option value="Leader">Leader</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Manager">Manager</option>
                <option value="Chairperson">Chairperson</option>
                <option value="Director">Director</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial Settings Section */}
        <div className="form-section">
          <h3>Financial Settings</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>
                <FiDollarSign /> Loan Limit (NGN)
              </label>
              <input
                type="number"
                name="loanLimit"
                value={formData.loanLimit}
                onChange={handleChange}
                className="form-control"
                min="0"
                step="1000"
                placeholder="Enter maximum loan amount"
              />
            </div>

            <div className="form-group">
              <label>Performance Rating</label>
              <select
                name="performance"
                value={formData.performance}
                onChange={handleChange}
                className="form-control">
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
                <option value="New">New</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}>
            <FiX /> Cancel
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            <FiSave /> Save Changes
          </button>
        </div>
      </form>

      <style jsx>{`
        .cluster-edit {
          padding: 2rem;
          width: 100%;
          margin: 0;
        }

        /* Header */
        .edit-header {
          margin-bottom: 2rem;
        }

        .edit-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: var(--navbar-text);
          margin: 1rem 0;
        }

        /* Form */
        .edit-form {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--navbar-border);
        }

        .form-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--navbar-border);
        }

        .form-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .form-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--navbar-text);
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 500;
          color: var(--gray-600);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group-full {
          grid-column: 1 / -1;
        }

        .form-control {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--navbar-border);
          border-radius: 6px;
          font-size: 0.95rem;
          color: var(--navbar-text);
          background: white;
          font-family: inherit;
          transition: all 0.2s;
        }

        .form-control:focus {
          outline: none;
          border-color: var(--navbar-accent);
          box-shadow: 0 0 0 3px rgba(0, 183, 255, 0.1);
        }

        .form-control.error {
          border-color: var(--primary-red);
        }

        .error-message {
          color: var(--primary-red);
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }

        textarea.form-control {
          min-height: 100px;
          resize: vertical;
        }

        /* Form Actions */
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid var(--navbar-border);
          margin-top: 2rem;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 3rem;
          color: var(--gray-500);
        }

        .empty-state p {
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .cluster-edit {
            padding: 1rem;
          }

          .edit-form {
            padding: 1.5rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .form-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .edit-header h1 {
            font-size: 1.5rem;
          }

          .form-section h3 {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ClusterEdit;
