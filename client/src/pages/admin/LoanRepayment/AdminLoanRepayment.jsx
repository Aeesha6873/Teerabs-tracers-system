import React, { useState } from "react";
import AdminLoanRepaymentsList from "./LoanRepaymentsList";
import LoanRepaymentDetail from "./LoanRepaymentDetail";
import { loanRepaymentsData } from "../../../data/loanRepaymentData";
import styles from "../../../styles/loanRepayment.module.css";

export default function AdminLoanRepayment() {
  const [view, setView] = useState("list"); // "list" or "detail"
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [loans, setLoans] = useState(loanRepaymentsData);

  // Find selected loan
  const selectedLoan = loans.find((loan) => loan.id === selectedLoanId);

  // Handle viewing loan details
  const handleViewLoan = (loanId) => {
    setSelectedLoanId(loanId);
    setView("detail");
  };

  // Go back to list view
  const handleBackToList = () => {
    setView("list");
    setSelectedLoanId(null);
  };

  // Update repayment status
  const handleUpdateStatus = (loanId, newStatus) => {
    if (
      window.confirm(`Are you sure you want to update status to ${newStatus}?`)
    ) {
      setLoans(
        loans.map((loan) =>
          loan.id === loanId ? { ...loan, repaymentStatus: newStatus } : loan
        )
      );

      // Refresh the page or show success message
      alert(`Loan status updated to ${newStatus}`);
    }
  };

  // Update loan data (for admin notes, etc.)
  const handleUpdateLoan = (updatedLoan) => {
    setLoans(
      loans.map((loan) => (loan.id === updatedLoan.id ? updatedLoan : loan))
    );
    setView("detail");
  };

  return (
    <div className={styles.loanRepaymentsContainer}>
      {view === "list" && (
        <AdminLoanRepaymentsList
          loans={loans}
          onViewLoan={handleViewLoan}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {view === "detail" && selectedLoan && (
        <LoanRepaymentDetail
          loan={selectedLoan}
          onBack={handleBackToList}
          onUpdateStatus={handleUpdateStatus}
          onUpdateLoan={handleUpdateLoan}
        />
      )}
    </div>
  );
}
