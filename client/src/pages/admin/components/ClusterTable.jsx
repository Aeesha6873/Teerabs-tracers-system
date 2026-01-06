import React from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default function ClusterTable({ compact = false }) {
  const clusters = [
    {
      id: 1,
      name: "Farmers Co-op",
      members: 15,
      location: "Nairobi",
      status: "active",
      value: "$45,000",
    },
    {
      id: 2,
      name: "Artisans Group",
      members: 8,
      location: "Mombasa",
      status: "active",
      value: "$28,500",
    },
    {
      id: 3,
      name: "Women's Collective",
      members: 12,
      location: "Kisumu",
      status: "pending",
      value: "$15,000",
    },
    {
      id: 4,
      name: "Youth Tech Hub",
      members: 6,
      location: "Nakuru",
      status: "active",
      value: "$32,000",
    },
    {
      id: 5,
      name: "Fishermen Union",
      members: 20,
      location: "Kisii",
      status: "inactive",
      value: "$0",
    },
  ];

  return (
    <div className="admin-table-wrapper">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Cluster Name</th>
            <th>Members</th>
            <th>Location</th>
            <th>Value</th>
            <th>Status</th>
            {!compact && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {clusters.map((cluster) => (
            <tr key={cluster.id}>
              <td>
                <div className="cluster-info">
                  <div className="cluster-name">{cluster.name}</div>
                  <div className="cluster-id">
                    ID: CL-{cluster.id.toString().padStart(3, "0")}
                  </div>
                </div>
              </td>
              <td>{cluster.members}</td>
              <td>{cluster.location}</td>
              <td>{cluster.value}</td>
              <td>
                <span className={`status-badge ${cluster.status}`}>
                  {cluster.status}
                </span>
              </td>
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
