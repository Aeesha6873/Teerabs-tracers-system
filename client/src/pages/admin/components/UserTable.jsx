// src/admin/components/UserTable.jsx
import React from "react";

export default function UserTable() {
  const users = [
    {
      id: 1,
      name: "Ahmad Rabiu",
      email: "ahmad@gmail.com",
      type: "Individual",
      status: "active",
    },
    {
      id: 2,
      name: "Aisha Abdul",
      email: "aesha@gmail.com",
      type: "Cluster Leader",
      status: "pending",
    },
  ];

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>User Type</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.type}</td>
            <td>
              <span className={`status-badge ${user.status.toLowerCase()}`}>
                {user.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
