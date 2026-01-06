// src/admin/pages/Users.jsx
import React from "react";
import AdminLayout from "../AdminLayout";
import "../styles/overview.css";

export default function Users() {
  // Dummy user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "08012345678",
      role: "Individual",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "08087654321",
      role: "Cluster Leader",
    },
    {
      id: 3,
      name: "David Lee",
      email: "david@example.com",
      phone: "08023456789",
      role: "Individual",
    },
  ];

  return (
    <AdminLayout>
      <div className="overview-page">
        <h1>Users</h1>
        <p>Manage all users registered on the Loan Tracer App.</p>

        <div className="table-wrapper">
          <input
            type="text"
            placeholder="Search users..."
            className="table-search"
          />

          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
