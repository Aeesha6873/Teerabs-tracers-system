import React from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default function UserTable({ compact = false }) {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      status: "active",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567891",
      status: "active",
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1234567892",
      status: "pending",
      date: "2024-01-13",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1234567893",
      status: "inactive",
      date: "2024-01-12",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert@example.com",
      phone: "+1234567894",
      status: "active",
      date: "2024-01-11",
    },
  ];

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Joined</th>
            {!compact && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-info">
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>
              </td>
              <td>{user.phone}</td>
              <td>
                <span className={`status-badge ${user.status}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.date}</td>
              {!compact && (
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view">
                      <FiEye /> View
                    </button>
                    <button className="action-btn edit">
                      <FiEdit /> Edit
                    </button>
                    <button className="action-btn delete">
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
