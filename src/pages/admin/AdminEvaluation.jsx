// src/pages/admin/AdminEvaluation.jsx
import React from "react";
// import "../styles/AdminEvaluation.css";

const AdminEvaluation = () => {
  const evaluations = [
    {
      id: 1,
      name: "John Doe",
      age: 28,
      bvn: "12345678901",
      businessAccepted: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 32,
      bvn: "98765432109",
      businessAccepted: false,
    },
  ];

  return (
    <div className="admin-evaluation">
      <h2>Evaluation</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>BVN</th>
            <th>Business Accepted</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{e.age}</td>
              <td>{e.bvn}</td>
              <td>{e.businessAccepted ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEvaluation;
