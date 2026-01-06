import React, { useState } from "react";
import "../../../styles/progressReport.css";

export default function ProgressReportModal({ report, close, onUpdate }) {
  const [notes, setNotes] = useState(report.adminNotes || "");

  return (
    <div className="modal-backdrop admin-modal">
      <div className="modal-box admin-modal-box">
        <button className="modal-close" onClick={close}>
          ×
        </button>

        <h3 className="modal-title">Progress Report — {report.id}</h3>

        <div className="modal-grid">
          <div className="modal-col">
            <h4>Reporter</h4>
            <p>
              <strong>Name:</strong> {report.user}
            </p>
            <p>
              <strong>Cluster:</strong> {report.cluster}
            </p>
            <p>
              <strong>Date:</strong> {report.date}
            </p>
            <p>
              <strong>Progress:</strong> {report.progressPercent}%
            </p>
          </div>

          <div className="modal-col">
            <h4>Details</h4>
            <p className="muted">{report.description}</p>
            <div className="files-grid">
              {report.files.length === 0 && (
                <div className="muted">No files attached.</div>
              )}
              {report.files.map((f, i) => (
                <div key={i} className="file-thumb">
                  {f.url.startsWith("data:image") ? (
                    <img src={f.url} alt={f.name} />
                  ) : (
                    <div className="pdf-file">{f.name}</div>
                  )}
                  <div className="file-name">{f.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-actions">
          <textarea
            placeholder="Admin notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <div className="action-row">
            <button
              className="tt-btn danger"
              onClick={() => {
                if (confirm("Reject this report?")) {
                  onUpdate("Rejected", notes);
                  close();
                }
              }}>
              Reject
            </button>
            <button
              className="tt-btn"
              onClick={() => {
                onUpdate("Needs Info", notes);
                alert("Marked Needs Info");
              }}>
              Request Info
            </button>
            <button
              className="tt-btn primary"
              onClick={() => {
                if (confirm("Approve this report?")) {
                  onUpdate("Approved", notes);
                  close();
                }
              }}>
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
