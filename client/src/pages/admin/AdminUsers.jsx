import React, { useState } from "react";
import Users from "./users/Users";
import ViewUser from "./users/ViewUser";
import EditUser from "./users/EditUser";
import styles from "../../styles/adminUsers.module.css";

const AdminUsers = () => {
  const [view, setView] = useState("list");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmad Rabiu",
      fullName: "Ahmad Rabiu",
      email: "jAhmad@gmail.com",
      phone: "+2348012345678",
      type: "Individual",
      status: "Active",
      joined: "2024-03-15",
      state: "Lagos",
      lga: "Ikeja",
      bvn: "12345678901",
      nin: "12345678901",
      businessName: "Rabiu Enterprises",
      proposal:
        "Retail business expansion focusing on consumer goods distribution in Lagos metropolitan area.",
      bankName: "GTBank",
      accountName: "Ahmad Rabiu",
      accountNumber: "0123456789",
    },
    {
      id: 2,
      name: "Aisha Abdullahi",
      fullName: "Aisha Abdullahi",
      email: "aisha@gmail.com",
      phone: "+2349068738485",
      type: "Business",
      status: "Active",
      joined: "2024-02-20",
      state: "Kaduna",
      lga: "Kaduna North",
      bvn: "23456789012",
      nin: "23456789012",
      businessName: "Aisha Tech Solutions",
      proposal:
        "Software development and digital transformation for SMEs in Northern Nigeria.",
      bankName: "Access Bank",
      accountName: "Aisha Abdullahi",
      accountNumber: "1122334455",
    },
    {
      id: 3,
      name: "Teejay Williams",
      fullName: "Teejay Williams",
      email: "teejay@gmail.com",
      phone: "+2347034567890",
      type: "Individual",
      status: "Pending",
      joined: "2024-04-01",
      state: "Abuja",
      lga: "Abuja Municipal",
      bvn: "34567890123",
      nin: "34567890123",
      businessName: "Williams Consultancy",
      proposal:
        "Business consulting and financial advisory services for startups.",
      bankName: "Zenith Bank",
      accountName: "Teejay Williams",
      accountNumber: "5566778899",
    },
    {
      id: 4,
      name: "Grace Okafor",
      fullName: "Grace Okafor",
      email: "grace@gmail.com",
      phone: "+2348051234567",
      type: "Business",
      status: "Blocked",
      joined: "2024-01-10",
      state: "Port Harcourt",
      lga: "Port Harcourt City",
      bvn: "45678901234",
      nin: "45678901234",
      businessName: "Grace Foods",
      proposal:
        "Food processing and packaging company focusing on local delicacies.",
      bankName: "First Bank",
      accountName: "Grace Okafor",
      accountNumber: "9988776655",
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

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
      if (view !== "list") {
        setView("list");
      }
    }
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

  const handleCreateUser = (newUser) => {
    const newId = Math.max(...users.map((u) => u.id)) + 1;
    const userToAdd = {
      ...newUser,
      id: newId,
      joined: new Date().toISOString().split("T")[0],
      status: "Pending",
    };
    setUsers([...users, userToAdd]);
  };

  return (
    <div className={styles.container}>
      {view === "list" && (
        <Users
          users={users}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          onCreateUser={handleCreateUser}
        />
      )}

      {view === "detail" && selectedUser && (
        <ViewUser
          user={selectedUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onBack={handleBackToList}
        />
      )}

      {view === "edit" && selectedUser && (
        <EditUser
          user={selectedUser}
          onSave={handleSaveEdit}
          onCancel={() => setView("detail")}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default AdminUsers;
