import styles from "../../../styles/AdminCluster.module.css";
import React, { useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiChevronRight,
  FiCheckCircle,
  FiXCircle,
  FiDownload,
  FiEdit2,
  FiTrash2,
  FiEye,
} from "react-icons/fi";
import { MdLocationOn, MdBusiness } from "react-icons/md";

const AdminClusters = ({ onViewCluster, onEditCluster }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCluster, setNewCluster] = useState({
    name: "",
    businessType: "",
    location: "",
    description: "",
  });

  // Sample data
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
      created: "2024-01-15",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Farmers Cooperative",
      code: "CL-002",
      status: "Active",
      location: "Kano",
      businessType: "Agriculture",
      description:
        "Cooperative of local farmers specializing in rice and maize",
      leader: {
        name: "Ahmad Rabiu",
        email: "ahmad@gmail.com",
        phone: "+234 812 345 6789",
      },
      stats: {
        totalMembers: 24,
        activeLoans: 5,
        totalValue: 32000,
        repaymentRate: 88,
      },
      created: "2023-12-15",
      lastActivity: "Yesterday",
    },
    {
      id: 3,
      name: "Youth Tech Hub",
      code: "CL-003",
      status: "Pending",
      location: "Lagos",
      businessType: "Technology",
      description: "Youth-led tech innovation hub",
      leader: {
        name: "Michael Chen",
        email: "michael@gmail.com",
        phone: "+234 805 678 9012",
      },
      stats: {
        totalMembers: 8,
        activeLoans: 0,
        totalValue: 0,
        repaymentRate: 0,
      },
      created: "2024-01-05",
      lastActivity: "3 days ago",
    },
  ];

  const filteredClusters = clusters.filter((cluster) => {
    const matchesSearch =
      search === "" ||
      cluster.name.toLowerCase().includes(search.toLowerCase()) ||
      cluster.code.toLowerCase().includes(search.toLowerCase()) ||
      cluster.leader.name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      filter === "all" || cluster.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalClusters: clusters.length,
    activeClusters: clusters.filter((c) => c.status === "Active").length,
    totalMembers: clusters.reduce((sum, c) => sum + c.stats.totalMembers, 0),
    totalLoanValue: clusters.reduce((sum, c) => sum + c.stats.totalValue, 0),
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDeleteCluster = (id) => {
    if (window.confirm("Are you sure you want to delete this cluster?")) {
      console.log("Deleting cluster:", id);
    }
  };

  const handleNewClusterChange = (e) => {
    const { name, value } = e.target;
    setNewCluster((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCluster = (e) => {
    e.preventDefault();
    console.log("Creating cluster:", newCluster);
    setShowNewModal(false);
    setNewCluster({
      name: "",
      businessType: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className={styles.adminClusters}>
      {/* Header */}
      <div className={styles.clustersHeader}>
        <div>
          <h1>Clusters</h1>
          <p>Manage business clusters and their members</p>
        </div>
        <div className={styles.clustersHeaderActions}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() => console.log("Export")}>
            <FiDownload /> Export
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setShowNewModal(true)}>
            <FiPlus /> New Cluster
          </button>
        </div>
      </div>

      {/* Stats - Made more compact */}
      <div className={styles.clustersStats}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalClusters}</div>
            <div className={styles.statLabel}>Total Clusters</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
            <FiCheckCircle />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.activeClusters}</div>
            <div className={styles.statLabel}>Active</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPurple}`}>
            <FiUsers />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stats.totalMembers}</div>
            <div className={styles.statLabel}>Total Members</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
            <FiDollarSign />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>
              {formatCurrency(stats.totalLoanValue)}
            </div>
            <div className={styles.statLabel}>Active Loans</div>
          </div>
        </div>
      </div>

      {/* Controls - Made more compact */}
      <div className={styles.clustersControls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search clusters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.filterBox}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className={styles.filterSelect}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Compact Clusters Table */}
      <div className={styles.clustersTableContainer}>
        {filteredClusters.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No clusters found. Try adjusting your search.</p>
          </div>
        ) : (
          <table className={styles.clustersTable}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Cluster</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>Location</th>
                <th className={styles.tableHeader}>Leader</th>
                <th className={styles.tableHeader}>Members</th>
                <th className={styles.tableHeader}>Value</th>
                <th className={styles.tableHeader}>Rate</th>
                <th className={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClusters.map((cluster) => (
                <tr key={cluster.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.clusterInfoCell}>
                      <div className={styles.clusterAvatar}>
                        {cluster.name.charAt(0)}
                      </div>
                      <div className={styles.clusterInfoContent}>
                        <div className={styles.clusterName}>{cluster.name}</div>
                        <div className={styles.clusterMeta}>
                          <span className={styles.clusterCode}>
                            {cluster.code}
                          </span>
                          <span className={styles.clusterType}>
                            {cluster.businessType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div
                      className={`${styles.statusBadge} ${
                        styles[
                          `status${
                            cluster.status.charAt(0).toUpperCase() +
                            cluster.status.slice(1).toLowerCase()
                          }`
                        ]
                      }`}>
                      {cluster.status.charAt(0)}
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.locationCell}>
                      <MdLocationOn />
                      <span>{cluster.location}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.leaderCell}>
                      <div className={styles.leaderName}>
                        {cluster.leader.name.split(" ")[0]}
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.membersCell}>
                      <FiUsers />
                      <span>{cluster.stats.totalMembers}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.loanCell}>
                      <FiDollarSign />
                      <span>{formatCurrency(cluster.stats.totalValue)}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.repaymentCell}>
                      <FiTrendingUp />
                      <span>{cluster.stats.repaymentRate}%</span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.actionButtons}>
                      <button
                        className={styles.btnIcon}
                        onClick={() => onViewCluster(cluster.id)}
                        title="View Details">
                        <FiEye />
                      </button>
                      <button
                        className={styles.btnIcon}
                        onClick={() => onEditCluster(cluster.id)}
                        title="Edit Cluster">
                        <FiEdit2 />
                      </button>
                      <button
                        className={`${styles.btnIcon} ${styles.deleteIcon}`}
                        onClick={() => handleDeleteCluster(cluster.id)}
                        title="Delete Cluster">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* New Cluster Modal */}
      {showNewModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Create New Cluster</h3>
              <button
                className={styles.closeBtn}
                onClick={() => setShowNewModal(false)}>
                &times;
              </button>
            </div>
            <div className={styles.modalContent}>
              <form onSubmit={handleCreateCluster}>
                <div className={styles.formGroup}>
                  <label>Cluster Name *</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    name="name"
                    value={newCluster.name}
                    onChange={handleNewClusterChange}
                    placeholder="Enter cluster name"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Business Type *</label>
                  <select
                    className={styles.formControl}
                    name="businessType"
                    value={newCluster.businessType}
                    onChange={handleNewClusterChange}
                    required>
                    <option value="">Select business type</option>
                    <option value="Technology">Technology</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Services">Services</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Location *</label>
                  <input
                    type="text"
                    className={styles.formControl}
                    name="location"
                    value={newCluster.location}
                    onChange={handleNewClusterChange}
                    placeholder="Enter location"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Description</label>
                  <textarea
                    className={styles.formControl}
                    name="description"
                    value={newCluster.description}
                    onChange={handleNewClusterChange}
                    placeholder="Describe the cluster..."
                    rows="3"
                  />
                </div>
                <div className={styles.modalActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => setShowNewModal(false)}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnPrimary}`}>
                    Create Cluster
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClusters;
