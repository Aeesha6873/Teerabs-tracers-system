import React, { useState } from "react";
import AdminLoanList from "./AdminLoanList";
import LoanDetail from "./LoanDetail";
import LoanEdit from "./LoanEdit";
import "../../../styles/AdminLoan.module.css";

const AdminLoan = () => {
  const [view, setView] = useState("list");
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [loans, setLoans] = useState([
    {
      id: "LN-2024-001",
      fullName: "Aisha Abdullahi",
      email: "aisha@gmail.com",
      phone: "+234 906 873 8485",
      address: "123 Main Street, Kaduna",
      amount: 500000,
      type: "Business Loan",
      status: "Pending",
      purpose: "Expanding my small business operations",
      duration: 12,
      dateApplied: "2024-01-15",
      interestRate: 12.5,
      repaymentPlan: "Monthly",
      idFile: "/documents/id1.pdf",
      addressProof: "/documents/address1.jpg",
      incomeProof: "/documents/income1.pdf",
      proposalFile: "/documents/proposal1.pdf",
      collateralDocs: null,
      notes: "",
      reviewedBy: "",
      reviewDate: "",
      disbursementDate: "",
    },
    {
      id: "LN-2024-002",
      fullName: "Ahmed Rabiu",
      email: "ahmed@gmail.com",
      phone: "+234 812 345 6789",
      address: "456 Market Road, Kano",
      amount: 250000,
      type: "Personal Loan",
      status: "Approved",
      purpose: "Home renovation and repairs",
      duration: 6,
      dateApplied: "2024-01-10",
      interestRate: 15.0,
      repaymentPlan: "Bi-weekly",
      idFile: "/documents/id2.pdf",
      addressProof: "/documents/address2.jpg",
      incomeProof: "/documents/income2.pdf",
      proposalFile: "/documents/proposal2.pdf",
      collateralDocs: "/documents/collateral2.pdf",
      notes: "Good repayment history",
      reviewedBy: "Admin User",
      reviewDate: "2024-01-12",
      disbursementDate: "",
    },
    {
      id: "LN-2024-003",
      fullName: "Grace Okafor",
      email: "grace@gmail.com",
      phone: "+234 805 678 9012",
      address: "789 Tech Street, Lagos",
      amount: 1000000,
      type: "Business Loan",
      status: "Disbursed",
      purpose: "Purchase of equipment for manufacturing",
      duration: 24,
      dateApplied: "2024-01-05",
      interestRate: 10.5,
      repaymentPlan: "Monthly",
      idFile: "/documents/id3.pdf",
      addressProof: "/documents/address3.jpg",
      incomeProof: "/documents/income3.pdf",
      proposalFile: "/documents/proposal3.pdf",
      collateralDocs: "/documents/collateral3.pdf",
      notes: "Collateral provided and verified",
      reviewedBy: "Admin User",
      reviewDate: "2024-01-08",
      disbursementDate: "2024-01-10",
    },
    {
      id: "LN-2024-004",
      fullName: "Michael Chen",
      email: "michael@gmail.com",
      phone: "+234 703 456 7890",
      address: "321 Innovation Road, Abuja",
      amount: 750000,
      type: "Agricultural Loan",
      status: "Rejected",
      purpose: "Purchase of farm equipment and seeds",
      duration: 18,
      dateApplied: "2024-01-03",
      interestRate: 13.0,
      repaymentPlan: "Monthly",
      idFile: "/documents/id4.pdf",
      addressProof: "/documents/address4.jpg",
      incomeProof: "/documents/income4.pdf",
      proposalFile: "/documents/proposal4.pdf",
      collateralDocs: null,
      notes: "Insufficient collateral and unstable income",
      reviewedBy: "Admin User",
      reviewDate: "2024-01-06",
      disbursementDate: "",
    },
  ]);

  const selectedLoan = loans.find((l) => l.id === selectedLoanId);

  const handleViewLoan = (loanId) => {
    setSelectedLoanId(loanId);
    setView("detail");
  };

  const handleEditLoan = (loanId) => {
    setSelectedLoanId(loanId);
    setView("edit");
  };

  const handleUpdateLoan = (updatedLoan) => {
    setLoans(
      loans.map((loan) => (loan.id === updatedLoan.id ? updatedLoan : loan))
    );
    setView("detail");
  };

  const handleDeleteLoan = (loanId) => {
    if (
      window.confirm("Are you sure you want to delete this loan application?")
    ) {
      setLoans(loans.filter((loan) => loan.id !== loanId));
      if (view !== "list") {
        setView("list");
      }
    }
  };

  const handleStatusUpdate = (loanId, newStatus) => {
    if (
      window.confirm(`Are you sure you want to update status to ${newStatus}?`)
    ) {
      setLoans(
        loans.map((loan) =>
          loan.id === loanId ? { ...loan, status: newStatus } : loan
        )
      );
    }
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedLoanId(null);
  };

  return (
    <div className="admin-loan-container">
      {view === "list" && (
        <AdminLoanList
          loans={loans}
          onViewLoan={handleViewLoan}
          onEditLoan={handleEditLoan}
          onDeleteLoan={handleDeleteLoan}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {view === "detail" && selectedLoan && (
        <LoanDetail
          loan={selectedLoan}
          onEdit={handleEditLoan}
          onDelete={handleDeleteLoan}
          onBack={handleBackToList}
          onStatusUpdate={handleStatusUpdate}
        />
      )}

      {view === "edit" && selectedLoan && (
        <LoanEdit
          loan={selectedLoan}
          onSave={handleUpdateLoan}
          onCancel={() => setView("detail")}
          onBack={handleBackToList}
        />
      )}
    </div>
  );
};

export default AdminLoan;
