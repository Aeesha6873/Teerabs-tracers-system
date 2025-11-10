// src/pages/admin/AdminUsers.jsx
import React from "react";
// import "../styles/AdminUsers.css";

const AdminUsers = () => {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", loans: 2 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", loans: 1 },
  ];

  return (
    <div className="admin-users">
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Loans</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.loans}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
