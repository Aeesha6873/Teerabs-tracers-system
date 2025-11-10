import React from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/proposal.css";

const Proposal = () => {
  const { loggedInUser } = useOutletContext();

  const proposals = loggedInUser?.proposals || [
    {
      id: 1,
      title: "New Product Launch",
      dateSubmitted: "2025-10-15",
      status: "Approved",
    },
    {
      id: 2,
      title: "Marketing Campaign",
      dateSubmitted: "2025-10-22",
      status: "Pending",
    },
    {
      id: 3,
      title: "Expansion Loan Proposal",
      dateSubmitted: "2025-10-28",
      status: "Rejected",
    },
  ];

  const totalProposals = proposals.length;
  const approved = proposals.filter((p) => p.status === "Approved").length;
  const pending = proposals.filter((p) => p.status === "Pending").length;
  const rejected = proposals.filter((p) => p.status === "Rejected").length;

  return (
    <div className="proposal-page">
      <h2>Your Proposals</h2>

      <div className="proposal-cards">
        <div className="proposal-card">
          <h3>Total Proposals</h3>
          <p>{totalProposals}</p>
        </div>
        <div className="proposal-card">
          <h3>Approved</h3>
          <p>{approved}</p>
        </div>
        <div className="proposal-card">
          <h3>Pending</h3>
          <p>{pending}</p>
        </div>
        <div className="proposal-card">
          <h3>Rejected</h3>
          <p>{rejected}</p>
        </div>
      </div>

      <table className="proposal-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date Submitted</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.id}>
              <td>{proposal.title}</td>
              <td>{proposal.dateSubmitted}</td>
              <td
                className={
                  proposal.status === "Approved"
                    ? "status-approved"
                    : proposal.status === "Rejected"
                    ? "status-rejected"
                    : "status-pending"
                }>
                {proposal.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proposal;
