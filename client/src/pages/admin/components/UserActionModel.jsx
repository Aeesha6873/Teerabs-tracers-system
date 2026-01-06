import React, { useState, useEffect } from "react";
import styles from "../../../styles/adminUsers.module.css";

export default function UserActionModal({
  user,
  type,
  close,
  onSave,
  onDelete,
}) {
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (type === "edit" && user) {
      setEditData({ ...user });
    }
  }, [type, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave && editData) onSave(editData);
    close();
  };

  const handleDelete = () => {
    if (onDelete && user) onDelete(user);
    close();
  };

  if (type === "edit" && !editData) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalBox}>
        <button className={styles.modalClose} onClick={close}>
          ×
        </button>

        <h3 className={styles.modalTitle}>
          {type === "view" && "User Details"}
          {type === "edit" && "Edit User"}
          {type === "delete" && "Delete User"}
        </h3>

        <div className={styles.modalContent}>
          {/* VIEW */}
          {type === "view" && (
            <>
              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Personal Information</h4>
                <p>
                  <strong>Full Name:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                  <strong>Registration Type:</strong> {user.registrationType}
                </p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Location</h4>
                <p>
                  <strong>State:</strong> {user.state}
                </p>
                <p>
                  <strong>LGA:</strong> {user.lga}
                </p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Identity Details</h4>
                <p>
                  <strong>BVN:</strong> {user.bvn}
                </p>
                <p>
                  <strong>NIN:</strong> {user.nin}
                </p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Business Details</h4>
                <p>
                  <strong>Business Name:</strong> {user.businessName}
                </p>
                <p>
                  <strong>Proposal:</strong>{" "}
                  {user.proposal || "No proposal added"}
                </p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Bank Details</h4>
                <p>
                  <strong>Bank Name:</strong> {user.bankName}
                </p>
                <p>
                  <strong>Account Name:</strong> {user.accountName}
                </p>
                <p>
                  <strong>Account Number:</strong> {user.accountNumber}
                </p>
              </div>

              {user.registrationType === "cluster" && (
                <>
                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionTitle}>Cluster Information</h4>
                    <p>
                      <strong>Cluster Name:</strong> {user.clusterName}
                    </p>
                    <p>
                      <strong>Total Members:</strong>{" "}
                      {user.clusterMembers?.length || 0}
                    </p>
                  </div>

                  <div className={styles.modalSection}>
                    <h4 className={styles.sectionTitle}>Cluster Members</h4>
                    <div className={styles.clusterMembersList}>
                      {user.clusterMembers?.map((m, i) => (
                        <div key={i} className={styles.clusterMemberCard}>
                          <p>
                            <strong>Name:</strong> {m.fullName}
                          </p>
                          <p>
                            <strong>Email:</strong> {m.email}
                          </p>
                          <p>
                            <strong>Phone:</strong> {m.phone}
                          </p>
                          <p>
                            <strong>NIN:</strong> {m.nin}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* EDIT */}
          {type === "edit" && (
            <form className={styles.modalGrid} onSubmit={handleSubmit}>
              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Personal Info</h4>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={editData.fullName || ""}
                  onChange={handleChange}
                />
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editData.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Location</h4>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={editData.state || ""}
                  onChange={handleChange}
                />
                <label>LGA</label>
                <input
                  type="text"
                  name="lga"
                  value={editData.lga || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Identity</h4>
                <label>BVN</label>
                <input
                  type="text"
                  name="bvn"
                  value={editData.bvn || ""}
                  onChange={handleChange}
                />
                <label>NIN</label>
                <input
                  type="text"
                  name="nin"
                  value={editData.nin || ""}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.sectionTitle}>Business / Proposal</h4>
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={editData.businessName || ""}
                  onChange={handleChange}
                />
                <label>Proposal</label>
                <textarea
                  name="proposal"
                  value={editData.proposal || ""}
                  onChange={handleChange}
                />
              </div>

              <div
                className={styles.modalSection}
                style={{ gridColumn: "1 / -1" }}>
                <h4 className={styles.sectionTitle}>Bank Details</h4>
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={editData.bankName || ""}
                  onChange={handleChange}
                />
                <label>Account Name</label>
                <input
                  type="text"
                  name="accountName"
                  value={editData.accountName || ""}
                  onChange={handleChange}
                />
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={editData.accountNumber || ""}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className={styles.ttBtn}
                style={{ gridColumn: "1 / -1" }}>
                Save Changes
              </button>
            </form>
          )}

          {/* DELETE */}
          {type === "delete" && (
            <>
              <p>Are you sure you want to delete:</p>
              <p className={styles.deleteName}>{user.fullName}?</p>
              <button className={styles.deleteConfirm} onClick={handleDelete}>
                Delete User
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
