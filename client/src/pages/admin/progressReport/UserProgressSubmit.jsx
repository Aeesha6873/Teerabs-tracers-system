import React, { useState } from "react";
import styles from "../../../styles/progressReport.module.css";

export default function UserProgressUpload() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Progress report submitted!");
  };

  return (
    <div className={styles.uploadPage}>
      <h2>Submit Progress Report</h2>

      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          placeholder="Enter report title..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Description</label>
        <textarea
          placeholder="Describe your progress..."
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Upload File</label>
        <input
          type="file"
          onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
        />

        <button className={styles.submitBtn}>Submit Report</button>
      </form>
    </div>
  );
}
