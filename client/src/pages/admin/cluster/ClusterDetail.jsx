import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/AdminCluster.module.css";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiMail,
  FiPhone,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { MdLocationOn, MdBusiness, MdDescription } from "react-icons/md";

const ClusterDetail = ({ cluster, onEdit, onDelete, onBack }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!cluster) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p>No cluster selected. Please select a cluster from the list.</p>
          <button onClick={onBack} className={styles.btnBack}>
            <FiArrowLeft /> Back to Clusters
          </button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.btnBack}>
          <FiArrowLeft /> Back to Clusters
        </button>
        <div className={styles.headerActions}>
          <button onClick={() => onEdit(cluster.id)} className={styles.btnEdit}>
            <FiEdit /> Edit Cluster
          </button>
          <button
            onClick={() => onDelete(cluster.id)}
            className={styles.btnDelete}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      {/* Cluster Header */}
      <div className={styles.clusterHeader}>
        <div className={styles.clusterAvatar}>{cluster.name.charAt(0)}</div>
        <div className={styles.clusterInfo}>
          <h1 className={styles.clusterTitle}>{cluster.name}</h1>
          <div className={styles.clusterMeta}>
            <span className={styles.clusterCode}>{cluster.code}</span>
            <span
              className={`${styles.statusBadge} ${
                styles[cluster.status.toLowerCase()]
              }`}>
              {cluster.status === "Active" ? <FiCheckCircle /> : <FiXCircle />}
              {cluster.status}
            </span>
          </div>
          <div className={styles.clusterDetails}>
            <div className={styles.detailItem}>
              <MdLocationOn /> {cluster.location}
            </div>
            <div className={styles.detailItem}>
              <MdBusiness /> {cluster.businessType}
            </div>
            <div className={styles.detailItem}>
              <FiCalendar /> Created {cluster.created}
            </div>
            <div className={styles.detailItem}>
              <FiClock /> Last active {cluster.lastActivity}
            </div>
          </div>
          {cluster.description && (
            <div className={styles.description}>
              <MdDescription /> {cluster.description}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "overview" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("overview")}>
          Overview
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "members" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("members")}>
          Members ({cluster.stats.totalMembers})
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "loans" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("loans")}>
          Loans ({cluster.stats.activeLoans})
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "activity" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("activity")}>
          Activity
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "overview" && (
          <div className={styles.overview}>
            {/* Stats Cards */}
            <div className={styles.statsSection}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiUsers />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {cluster.stats.totalMembers}
                  </div>
                  <div className={styles.statLabel}>Total Members</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiDollarSign />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {formatCurrency(cluster.stats.totalValue)}
                  </div>
                  <div className={styles.statLabel}>Active Loans</div>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>
                  <FiTrendingUp />
                </div>
                <div className={styles.statContent}>
                  <div className={styles.statValue}>
                    {cluster.stats.repaymentRate}%
                  </div>
                  <div className={styles.statLabel}>Repayment Rate</div>
                </div>
              </div>
            </div>

            {/* Leader Information */}
            <div className={styles.section}>
              <h3>Leader Information</h3>
              <div className={styles.sectionContent}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>Name</label>
                    <div className={styles.value}>{cluster.leader.name}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Email</label>
                    <div className={styles.value}>{cluster.leader.email}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Phone</label>
                    <div className={styles.value}>{cluster.leader.phone}</div>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Role</label>
                    <div className={styles.value}>Cluster Leader</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className={styles.section}>
              <h3>Financial Summary</h3>
              <div className={styles.sectionContent}>
                <div className={styles.financialGrid}>
                  <div className={styles.financialItem}>
                    <div className={styles.financialLabel}>Total Value</div>
                    <div className={styles.financialValue}>
                      {formatCurrency(cluster.stats.totalValue)}
                    </div>
                  </div>
                  <div className={styles.financialItem}>
                    <div className={styles.financialLabel}>Repayment Rate</div>
                    <div className={styles.financialValue}>
                      {cluster.stats.repaymentRate}%
                    </div>
                  </div>
                  <div className={styles.financialItem}>
                    <div className={styles.financialLabel}>Active Loans</div>
                    <div className={styles.financialValue}>
                      {cluster.stats.activeLoans}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "members" && (
          <div className={styles.members}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Cluster Members</h3>
                <button className={styles.btnPrimary}>
                  <FiUser /> Add Member
                </button>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.membersList}>
                  {Array.isArray(cluster.members) &&
                  cluster.members.length > 0 ? (
                    cluster.members.map((member) => (
                      <div key={member.id} className={styles.memberCard}>
                        <div className={styles.memberAvatar}>
                          {member.name.charAt(0)}
                        </div>
                        <div className={styles.memberInfo}>
                          <div className={styles.memberName}>{member.name}</div>
                          <div className={styles.memberDetails}>
                            <div className={styles.memberEmail}>
                              {member.email}
                            </div>
                            <div className={styles.memberRole}>
                              {member.role}
                            </div>
                            <div
                              className={`${styles.memberStatus} ${
                                styles[member.status.toLowerCase()]
                              }`}>
                              {member.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noData}>No members found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "loans" && (
          <div className={styles.loans}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3>Active Loans</h3>
                <button className={styles.btnPrimary}>
                  <FiDollarSign /> New Loan
                </button>
              </div>
              <div className={styles.sectionContent}>
                {cluster.stats.activeLoans > 0 ? (
                  <div className={styles.loansList}>
                    <p>Loans information would be displayed here</p>
                  </div>
                ) : (
                  <p className={styles.noData}>No active loans</p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className={styles.activity}>
            <div className={styles.section}>
              <h3>Recent Activity</h3>
              <div className={styles.sectionContent}>
                <p className={styles.noData}>
                  Activity log would be displayed here
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClusterDetail;
