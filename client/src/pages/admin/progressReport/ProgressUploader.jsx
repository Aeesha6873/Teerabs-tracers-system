import React, { useState } from "react";

export default function ProgressUploader({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [files, setFiles] = useState([]);

  function handleFiles(e) {
    const chosen = Array.from(e.target.files).slice(0, 6);
    const readers = chosen.map((file) => {
      return new Promise((res) => {
        const reader = new FileReader();
        reader.onload = () => {
          res({ name: file.name, size: file.size, url: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((arr) => setFiles((prev) => [...prev, ...arr]));
  }

  function removeFile(idx) {
    setFiles((f) => f.filter((_, i) => i !== idx));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please add a title for this report.");
    // create a report object
    const newReport = {
      id: `PR-${Date.now()}`,
      userId: "U-XXXX",
      user: "You (Preview)",
      cluster: "—",
      title,
      description,
      progressPercent: Number(progressPercent),
      files,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      adminNotes: "",
    };
    onSubmit(newReport);
    // reset
    setTitle("");
    setDescription("");
    setProgressPercent(0);
    setFiles([]);
    alert("Progress report created (local preview).");
  }

  return (
    <form className="uploader" onSubmit={handleSubmit}>
      <div className="u-row">
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Short title (e.g., Week 3 progress)"
            required
          />
        </label>

        <label>
          Progress %
          <input
            type="number"
            min="0"
            max="100"
            value={progressPercent}
            onChange={(e) => setProgressPercent(e.target.value)}
          />
        </label>
      </div>

      <label>
        Description
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe activities completed, challenges, next steps..."
        />
      </label>

      <label className="file-label">
        Attach photos / documents (max 6)
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFiles}
          multiple
        />
      </label>

      <div className="file-preview">
        {files.map((f, i) => (
          <div className="file-card" key={i}>
            {f.url.startsWith("data:image") ? (
              <img src={f.url} alt={f.name} />
            ) : (
              <div className="file-icon">PDF</div>
            )}
            <div className="file-meta">
              <div className="file-name">{f.name}</div>
              <button
                type="button"
                className="file-remove"
                onClick={() => removeFile(i)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="u-actions">
        <button className="tt-btn primary" type="submit">
          Submit Report
        </button>
      </div>
    </form>
  );
}
