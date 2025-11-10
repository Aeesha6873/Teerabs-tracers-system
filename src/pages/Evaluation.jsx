import React from "react";
import "../styles/evaluation.css";

const Evaluation = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("logged_in_user"));

  if (!loggedInUser) return <p>No user data found. Please log in.</p>;

  return (
    <div className="evaluation-page">
      <h2>Your Evaluation</h2>

      {loggedInUser.accountType === "individual" && (
        <div className="evaluation-cards">
          <div className="evaluation-card">
            <h3>Full Name</h3>
            <p>{loggedInUser.fullName}</p>
          </div>
          <div className="evaluation-card">
            <h3>Email</h3>
            <p>{loggedInUser.email}</p>
          </div>
          <div className="evaluation-card">
            <h3>Phone</h3>
            <p>{loggedInUser.phone}</p>
          </div>
          <div className="evaluation-card">
            <h3>Business Accepted</h3>
            <p>{loggedInUser.businessAccepted ? "Yes" : "No"}</p>
          </div>
        </div>
      )}

      {loggedInUser.accountType === "cluster" && (
        <div className="cluster-summary">
          <p>
            <strong>Cluster Name:</strong> {loggedInUser.clusterName}
          </p>
          <p>
            <strong>Cluster Leader:</strong> {loggedInUser.clusterLeader}
          </p>
          <p>
            <strong>Number of Members:</strong> {loggedInUser.clusterSize}
          </p>
          <p>
            <strong>Group Savings Verified:</strong>{" "}
            {loggedInUser.savingsVerified ? "Yes" : "No"}
          </p>
        </div>
      )}

      {loggedInUser.accountType === "cluster" && (
        <>
          <h3>Members</h3>
          <table className="evaluation-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {loggedInUser.members.map((member, index) => (
                <tr key={index}>
                  <td>{member.fullName}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Evaluation;
