import React, { useState } from "react";
import ProposalsList from "./ProposalsList";
import ProposalDetail from "./ProposalDetail";
import "../../../styles/adminProposals.module.css";

export default function Proposals() {
  const [view, setView] = useState("list"); // "list" or "detail"
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [proposals, setProposals] = useState([
    {
      id: "PRO-001",
      user: "Ahmad Rabiu",
      email: "ahmad@example.com",
      businessName: "Rabiu Enterprises",
      businessType: "Retail",
      amountRequested: 500000,
      submittedDate: "2024-03-15",
      status: "pending",
      summary:
        "Expanding retail store operations to include e-commerce platform and inventory management system.",
      attachments: [
        { name: "Business Plan.pdf", url: "#" },
        { name: "Financial Projections.xlsx", url: "#" },
      ],
      notes: "",
      reviewedBy: "",
      reviewDate: "",
      decisionDate: "",
      loanAmount: null,
      loanDuration: null,
      interestRate: null,
    },
    {
      id: "PRO-002",
      user: "Aisha Abdullahi",
      email: "aisha@example.com",
      businessName: "Aisha's Fashion Hub",
      businessType: "Fashion",
      amountRequested: 750000,
      submittedDate: "2024-03-14",
      status: "reviewed",
      summary:
        "Establishing a fashion design studio with training program for local tailors and seamstresses.",
      attachments: [
        { name: "Portfolio.pdf", url: "#" },
        { name: "Market Analysis.docx", url: "#" },
      ],
      notes: "Strong market potential, needs more financial details",
      reviewedBy: "Admin User",
      reviewDate: "2024-03-16",
      decisionDate: "",
      loanAmount: null,
      loanDuration: null,
      interestRate: null,
    },
    {
      id: "PRO-003",
      user: "Chinedu Obi",
      email: "chinedu@example.com",
      businessName: "Tech Solutions NG",
      businessType: "Technology",
      amountRequested: 1200000,
      submittedDate: "2024-03-10",
      status: "approved",
      summary:
        "Developing mobile banking solution for rural communities without bank access.",
      attachments: [
        { name: "Technical Specs.pdf", url: "#" },
        { name: "Team CVs.pdf", url: "#" },
        { name: "Prototype Demo.mp4", url: "#" },
      ],
      notes: "Approved for phase 1 funding",
      reviewedBy: "Admin User",
      reviewDate: "2024-03-12",
      decisionDate: "2024-03-13",
      loanAmount: 1000000,
      loanDuration: 24,
      interestRate: 12.5,
    },
    {
      id: "PRO-004",
      user: "Fatima Yusuf",
      email: "fatima@example.com",
      businessName: "Farm Fresh Produce",
      businessType: "Agriculture",
      amountRequested: 850000,
      submittedDate: "2024-03-08",
      status: "rejected",
      summary:
        "Cold storage facility for perishable agricultural products to reduce post-harvest losses.",
      attachments: [
        { name: "Land Documents.pdf", url: "#" },
        { name: "Feasibility Study.pdf", url: "#" },
      ],
      notes: "Incomplete documentation, requested for resubmission",
      reviewedBy: "Admin User",
      reviewDate: "2024-03-09",
      decisionDate: "2024-03-10",
      loanAmount: null,
      loanDuration: null,
      interestRate: null,
    },
  ]);

  const selectedProposal = proposals.find((p) => p.id === selectedProposalId);

  const handleViewProposal = (proposalId) => {
    setSelectedProposalId(proposalId);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedProposalId(null);
  };

  const handleUpdateProposal = (updatedProposal) => {
    setProposals(
      proposals.map((p) => (p.id === updatedProposal.id ? updatedProposal : p))
    );
    setView("detail");
  };

  const handleUpdateStatus = (proposalId, newStatus, notes = "") => {
    if (
      window.confirm(
        `Are you sure you want to mark this proposal as ${newStatus}?`
      )
    ) {
      setProposals(
        proposals.map((p) =>
          p.id === proposalId
            ? {
                ...p,
                status: newStatus,
                notes: notes || p.notes,
                reviewDate: notes
                  ? new Date().toISOString().split("T")[0]
                  : p.reviewDate,
                reviewedBy: notes ? "Admin User" : p.reviewedBy,
              }
            : p
        )
      );
    }
  };

  const handleDeleteProposal = (proposalId) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      setProposals(proposals.filter((p) => p.id !== proposalId));
      if (view !== "list") {
        setView("list");
      }
    }
  };

  return (
    <div className="proposals-container">
      {view === "list" && (
        <ProposalsList
          proposals={proposals}
          onViewProposal={handleViewProposal}
          onUpdateStatus={handleUpdateStatus}
          onDeleteProposal={handleDeleteProposal}
        />
      )}

      {view === "detail" && selectedProposal && (
        <ProposalDetail
          proposal={selectedProposal}
          onBack={handleBackToList}
          onUpdate={handleUpdateProposal}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDeleteProposal}
        />
      )}
    </div>
  );
}
