import React, { useState } from "react";
import styles from "../../styles/progressReport.module.css";

import { progressReportsData } from "../../data/progress";
import { FiEye } from "react-icons/fi";

export default function AdminProgressReports() {
  const [reports, setReports] = useState(progressReportsData);
  const [selectedReport, setSelectedReport] = useState(null);

  const openModal = (report) => setSelectedReport(report);
  const closeModal = () => setSelectedReport(null);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Progress Reports</h2>

      {/* Desktop Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span>ID</span>
          <span>User</span>
          <span>Title</span>
          <span>Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {reports.map((report) => (
          <div key={report.id} className={styles.tableRow}>
            <span>{report.id}</span>
            <span>{report.user}</span>
            <span>{report.title}</span>
            <span>{report.date}</span>
            <span
              className={`${styles.status} ${
                styles[report.status.toLowerCase()]
              }`}>
              {report.status}
            </span>
            <span>
              <button
                className={styles.viewBtn}
                onClick={() => openModal(report)}>
                <FiEye /> View
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className={styles.cardContainer}>
        {reports.map((report) => (
          <div key={report.id} className={styles.card}>
            <p>
              <strong>User:</strong> {report.user}
            </p>
            <p>
              <strong>Title:</strong> {report.title}
            </p>
            <p>
              <strong>Date:</strong> {report.date}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`${styles.status} ${
                  styles[report.status.toLowerCase()]
                }`}>
                {report.status}
              </span>
            </p>

            <button
              className={styles.viewBtn}
              onClick={() => openModal(report)}>
              <FiEye /> View
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedReport && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={closeModal}>
              ×
            </button>

            <h3 className={styles.modalTitle}>{selectedReport.title}</h3>

            <div className={styles.modalBody}>
              <p>
                <strong>User:</strong> {selectedReport.user}
              </p>
              <p>
                <strong>Date:</strong> {selectedReport.date}
              </p>
              <p>
                <strong>Status:</strong> {selectedReport.status}
              </p>

              <div className={styles.fileBox}>
                <p>Attached File:</p>
                <a href={selectedReport.file} download>
                  Click to download
                </a>
              </div>

              <label>Admin Review</label>
              <textarea placeholder="Write your review here..." />

              <button className={styles.submitBtn}>Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
