import React, { useState } from "react";
import AdminClusters from "./cluster/AdminCluster";
import ClusterDetail from "./cluster/ClusterDetail";
import ClusterEdit from "./cluster/ClusterEdit";
import "../../styles/AdminCluster.module.css";

const Cluster = () => {
  const [view, setView] = useState("list");
  const [selectedClusterId, setSelectedClusterId] = useState(null);

  const clusters = [
    {
      id: 1,
      name: "Teerabs Venture",
      code: "CL-001",
      status: "Active",
      location: "Kaduna",
      businessType: "Technology",
      description: "Tech startup focused on digital solutions for SMEs",
      leader: {
        name: "Aisha Abdullahi",
        email: "aisha@gmail.com",
        phone: "+234 906 873 8485",
      },
      stats: {
        totalMembers: 12,
        activeLoans: 3,
        totalValue: 18500,
        repaymentRate: 94,
      },
      members: [
        {
          id: 1,
          name: "Aisha Abdullahi",
          email: "aisha@gmail.com",
          role: "Leader",
          status: "Active",
        },
        {
          id: 2,
          name: "Teejay Williams",
          email: "teejay@gmail.com",
          role: "Co-founder",
          status: "Active",
        },
        {
          id: 3,
          name: "Grace Okafor",
          email: "grace@gmail.com",
          role: "Developer",
          status: "Active",
        },
      ],
      created: "2024-01-15",
      lastActivity: "2 hours ago",
    },
    // ... more clusters
  ];

  const selectedCluster = clusters.find((c) => c.id === selectedClusterId);

  const handleViewCluster = (clusterId) => {
    setSelectedClusterId(clusterId);
    setView("detail");
  };

  const handleEditCluster = (clusterId) => {
    setSelectedClusterId(clusterId);
    setView("edit");
  };

  const handleDeleteCluster = (clusterId) => {
    if (window.confirm("Are you sure you want to delete this cluster?")) {
      // Delete logic here
      console.log("Deleting cluster:", clusterId);
      if (view !== "list") {
        setView("list");
      }
    }
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedClusterId(null);
  };

  const handleSaveEdit = () => {
    // Save logic here
    alert("Cluster updated successfully!");
    setView("detail");
  };

  return (
    <div className="admin-container">
      {view === "list" && (
        <AdminClusters
          onViewCluster={handleViewCluster}
          onEditCluster={handleEditCluster}
        />
      )}

      {view === "detail" && (
        <ClusterDetail
          cluster={selectedCluster}
          onEdit={handleEditCluster}
          onDelete={handleDeleteCluster}
          onBack={handleBackToList}
        />
      )}

      {view === "edit" && selectedCluster && (
        <ClusterEdit
          cluster={selectedCluster}
          onSave={handleSaveEdit}
          onCancel={() => setView("detail")}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default Cluster;
