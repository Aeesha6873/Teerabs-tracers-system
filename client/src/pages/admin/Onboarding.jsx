import React, { useState } from "react";
import OnboardingDashboard from "../admin/AdminOnboarding/AdminOnboardingDashboard";
import OnboardingUserDetail from "../admin/AdminOnboarding/OnboardingUserDetails";
import OnboardingUserEdit from "../admin/AdminOnboarding/OnbordingUserEdit";
import OnboardingUserMap from "../admin/AdminOnboarding/OnboardingUserMap";
import styles from "../../styles/onboarding.module.css";

const Onboarding = () => {
  const [view, setView] = useState("list");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+234 801 234 5678",
      status: "Pending Verification",
      date: "2024-01-15",
      nin: "12345678901",
      address: "123 Main St, Lagos",
      documents: ["ID Card", "Proof of Address"],
      onboardingProgress: 40,
      avatarColor: "#4f46e5",
      registrationType: "individual",
      state: "Lagos",
      lga: "Ikeja",
      bvn: "12345678901",
      businessName: "",
      proposal: "",
      bankName: "GTBank",
      accountName: "John Doe",
      accountNumber: "0123456789",
      location: { lat: 6.5244, lng: 3.3792 },
      clusterName: "",
      clusterMembers: [],
      verificationStage: "document_upload", // document_upload, verification, completed
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+234 802 345 6789",
      status: "Under Review",
      date: "2024-01-14",
      nin: "23456789012",
      address: "456 Oak Ave, Abuja",
      documents: ["ID Card", "Bank Statement"],
      onboardingProgress: 75,
      avatarColor: "#10b981",
      registrationType: "business",
      state: "Abuja",
      lga: "Garki",
      bvn: "23456789012",
      businessName: "Sarah Tech Solutions",
      proposal: "Tech consulting services",
      bankName: "Access Bank",
      accountName: "Sarah Johnson",
      accountNumber: "1122334455",
      location: { lat: 9.0765, lng: 7.3986 },
      clusterName: "",
      clusterMembers: [],
      verificationStage: "verification",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "+234 803 456 7890",
      status: "Approved",
      date: "2024-01-13",
      nin: "34567890123",
      address: "789 Pine Rd, Port Harcourt",
      documents: ["All Documents Verified"],
      onboardingProgress: 100,
      avatarColor: "#3b82f6",
      registrationType: "cluster",
      state: "Rivers",
      lga: "Port Harcourt",
      bvn: "34567890123",
      businessName: "Chen Enterprises",
      proposal: "Agricultural export business",
      bankName: "Zenith Bank",
      accountName: "Michael Chen",
      accountNumber: "5566778899",
      location: { lat: 4.8156, lng: 7.0498 },
      clusterName: "Chen Cluster",
      clusterMembers: [
        { name: "Member 1", email: "m1@example.com", phone: "08011111111" },
        { name: "Member 2", email: "m2@example.com", phone: "08022222222" },
      ],
      verificationStage: "completed",
    },
  ]);

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    setView("detail");
  };

  const handleEditUser = (userId) => {
    setSelectedUserId(userId);
    setView("edit");
  };

  const handleViewMap = (userId) => {
    setSelectedUserId(userId);
    setView("map");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedUserId(null);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setView("detail");
  };

  const handleUpdateStatus = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: newStatus,
              onboardingProgress:
                newStatus === "Approved"
                  ? 100
                  : newStatus === "Under Review"
                  ? 75
                  : 40,
            }
          : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
      if (view !== "list") {
        setView("list");
      }
    }
  };

  const handleAddUser = (newUser) => {
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const userToAdd = {
      ...newUser,
      id: newId,
      date: new Date().toISOString().split("T")[0],
      status: "Pending Verification",
      onboardingProgress: 20,
      avatarColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
      verificationStage: "document_upload",
    };
    setUsers([...users, userToAdd]);
  };

  return (
    <div className={styles.container}>
      {view === "list" && (
        <OnboardingDashboard
          users={users}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onUpdateStatus={handleUpdateStatus}
          onAddUser={handleAddUser}
          onViewMap={handleViewMap}
        />
      )}

      {view === "detail" && selectedUser && (
        <OnboardingUserDetail
          user={selectedUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onBack={handleBackToList}
          onUpdateStatus={handleUpdateStatus}
          onViewMap={handleViewMap}
        />
      )}

      {view === "edit" && selectedUser && (
        <OnboardingUserEdit
          user={selectedUser}
          onSave={handleSaveEdit}
          onCancel={() => setView("detail")}
          onBack={handleBackToList}
        />
      )}

      {view === "map" && selectedUser && (
        <OnboardingUserMap user={selectedUser} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default Onboarding;
