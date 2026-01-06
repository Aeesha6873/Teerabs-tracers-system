import React, { useState } from "react";
import ReportDashboard from "./ReportDashboard";
import ReportDetailView from "./ReportDetailView";
import "../../../styles/AdminReport.module.css";

export default function AdminReports() {
  const [view, setView] = useState("dashboard");
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [selectedReport, setSelectedReport] = useState("financial");

  // Sample reports data
  const reportsData = {
    financial: {
      title: "Financial Summary",
      icon: "FiDollarSign",
      summary: "Comprehensive financial performance and revenue analysis",
      metrics: [
        {
          label: "Total Revenue",
          value: "₦4,850,000",
          change: "+12.5%",
          trend: "up",
          detail: {
            description: "Total revenue generated from all business activities",
            category: "Revenue",
            unit: "₦",
            target: "₦4,500,000",
            variance: "+7.8%",
            frequency: "Monthly",
          },
        },
        {
          label: "Total Loans Disbursed",
          value: "₦8,200,000",
          change: "+8.2%",
          trend: "up",
          detail: {
            description: "Total amount of loans disbursed to all users",
            category: "Loans",
            unit: "₦",
            target: "₦7,800,000",
            variance: "+5.1%",
            frequency: "Monthly",
          },
        },
        {
          label: "Average Loan Size",
          value: "₦420,000",
          change: "+3.1%",
          trend: "up",
          detail: {
            description: "Average amount per loan disbursed",
            category: "Loans",
            unit: "₦",
            target: "₦410,000",
            variance: "+2.4%",
            frequency: "Monthly",
          },
        },
        {
          label: "Repayment Rate",
          value: "94.2%",
          change: "+2.3%",
          trend: "up",
          detail: {
            description: "Percentage of loans repaid on time",
            category: "Performance",
            unit: "%",
            target: "92.5%",
            variance: "+1.8%",
            frequency: "Monthly",
          },
        },
        {
          label: "Default Rate",
          value: "2.8%",
          change: "-0.4%",
          trend: "down",
          detail: {
            description: "Percentage of loans that have defaulted",
            category: "Risk",
            unit: "%",
            target: "3.0%",
            variance: "-6.7%",
            frequency: "Monthly",
          },
        },
        {
          label: "Operating Costs",
          value: "₦650,000",
          change: "+1.2%",
          trend: "up",
          detail: {
            description: "Total operational expenses",
            category: "Expenses",
            unit: "₦",
            target: "₦620,000",
            variance: "+4.8%",
            frequency: "Monthly",
          },
        },
      ],
      charts: ["Revenue Trend", "Loan Distribution", "Repayment Performance"],
      recentActivities: [
        {
          id: 1,
          activity: "Loan disbursed to Ahmad Rabiu",
          amount: "₦500,000",
          date: "2024-03-15",
          type: "disbursement",
        },
        {
          id: 2,
          activity: "Weekly repayment collected",
          amount: "₦850,000",
          date: "2024-03-14",
          type: "repayment",
        },
        {
          id: 3,
          activity: "New user registration fee",
          amount: "₦50,000",
          date: "2024-03-13",
          type: "revenue",
        },
      ],
    },
    users: {
      title: "User Analytics",
      icon: "FiUsers",
      summary: "User growth, engagement, and demographic analysis",
      metrics: [
        {
          label: "Total Users",
          value: "1,245",
          change: "+15.3%",
          trend: "up",
          detail: {
            description: "Total number of registered users",
            category: "Users",
            unit: "users",
            target: "1,100",
            variance: "+13.2%",
            frequency: "Monthly",
          },
        },
        {
          label: "Active Users",
          value: "892",
          change: "+8.7%",
          trend: "up",
          detail: {
            description: "Users active in the last 30 days",
            category: "Engagement",
            unit: "users",
            target: "850",
            variance: "+4.9%",
            frequency: "Monthly",
          },
        },
        {
          label: "New Registrations",
          value: "156",
          change: "+22.1%",
          trend: "up",
          detail: {
            description: "New user registrations this month",
            category: "Growth",
            unit: "users",
            target: "140",
            variance: "+11.4%",
            frequency: "Monthly",
          },
        },
        {
          label: "User Retention Rate",
          value: "78.4%",
          change: "+4.2%",
          trend: "up",
          detail: {
            description: "Percentage of users retained after 90 days",
            category: "Engagement",
            unit: "%",
            target: "75.0%",
            variance: "+4.5%",
            frequency: "Quarterly",
          },
        },
        {
          label: "Cluster Leaders",
          value: "45",
          change: "+10.0%",
          trend: "up",
          detail: {
            description: "Active cluster leaders managing groups",
            category: "Leadership",
            unit: "leaders",
            target: "42",
            variance: "+7.1%",
            frequency: "Monthly",
          },
        },
        {
          label: "Individual Users",
          value: "1,200",
          change: "+15.8%",
          trend: "up",
          detail: {
            description: "Individual users not in clusters",
            category: "Users",
            unit: "users",
            target: "1,050",
            variance: "+14.3%",
            frequency: "Monthly",
          },
        },
      ],
      charts: ["User Growth", "User Distribution", "Activity Heatmap"],
      recentActivities: [
        {
          id: 1,
          activity: "New cluster leader registered",
          user: "Aisha Abdullahi",
          date: "2024-03-15",
          type: "registration",
        },
        {
          id: 2,
          activity: "User upgraded to premium",
          user: "Chinedu Obi",
          date: "2024-03-14",
          type: "upgrade",
        },
        {
          id: 3,
          activity: "Monthly active user milestone",
          count: "850+",
          date: "2024-03-13",
          type: "milestone",
        },
      ],
    },
    loans: {
      title: "Loan Portfolio",
      icon: "FiTrendingUp",
      summary: "Loan performance, risk assessment, and portfolio analysis",
      metrics: [
        {
          label: "Active Loans",
          value: "58",
          change: "+6.8%",
          trend: "up",
          detail: {
            description: "Currently active loans being serviced",
            category: "Portfolio",
            unit: "loans",
            target: "55",
            variance: "+5.5%",
            frequency: "Monthly",
          },
        },
        {
          label: "Total Portfolio Value",
          value: "₦24,300,000",
          change: "+9.4%",
          trend: "up",
          detail: {
            description: "Total value of all active loans",
            category: "Portfolio",
            unit: "₦",
            target: "₦22,500,000",
            variance: "+8.0%",
            frequency: "Monthly",
          },
        },
        {
          label: "Average Interest Rate",
          value: "12.5%",
          change: "+0.2%",
          trend: "up",
          detail: {
            description: "Average interest rate across all loans",
            category: "Financial",
            unit: "%",
            target: "12.3%",
            variance: "+1.6%",
            frequency: "Monthly",
          },
        },
        {
          label: "On-time Repayments",
          value: "92.7%",
          change: "+1.8%",
          trend: "up",
          detail: {
            description: "Loans with timely repayments",
            category: "Performance",
            unit: "%",
            target: "91.5%",
            variance: "+1.3%",
            frequency: "Monthly",
          },
        },
        {
          label: "Delinquent Loans",
          value: "4",
          change: "-1",
          trend: "down",
          detail: {
            description: "Loans overdue by more than 30 days",
            category: "Risk",
            unit: "loans",
            target: "3",
            variance: "+33.3%",
            frequency: "Monthly",
          },
        },
        {
          label: "Loan Approval Rate",
          value: "78.9%",
          change: "+3.2%",
          trend: "up",
          detail: {
            description: "Percentage of loan applications approved",
            category: "Performance",
            unit: "%",
            target: "76.5%",
            variance: "+3.1%",
            frequency: "Monthly",
          },
        },
      ],
      charts: [
        "Loan Status Distribution",
        "Risk Assessment",
        "Approval Trends",
      ],
      recentActivities: [
        {
          id: 1,
          activity: "New loan application approved",
          amount: "₦750,000",
          date: "2024-03-15",
          type: "approval",
        },
        {
          id: 2,
          activity: "Loan repayment completed",
          amount: "₦1,200,000",
          date: "2024-03-14",
          type: "completion",
        },
        {
          id: 3,
          activity: "Risk assessment updated",
          loans: "12 loans",
          date: "2024-03-13",
          type: "assessment",
        },
      ],
    },
    proposals: {
      title: "Proposal Analytics",
      icon: "FiFileText",
      summary: "Business proposal submission and approval analysis",
      metrics: [
        {
          label: "Total Proposals",
          value: "89",
          change: "+18.5%",
          trend: "up",
          detail: {
            description: "Total business proposals submitted",
            category: "Volume",
            unit: "proposals",
            target: "85",
            variance: "+4.7%",
            frequency: "Monthly",
          },
        },
        {
          label: "Approved Proposals",
          value: "45",
          change: "+12.3%",
          trend: "up",
          detail: {
            description: "Proposals approved for funding",
            category: "Approvals",
            unit: "proposals",
            target: "42",
            variance: "+7.1%",
            frequency: "Monthly",
          },
        },
        {
          label: "Pending Review",
          value: "22",
          change: "+5.6%",
          trend: "up",
          detail: {
            description: "Proposals awaiting review",
            category: "Workflow",
            unit: "proposals",
            target: "20",
            variance: "+10.0%",
            frequency: "Weekly",
          },
        },
        {
          label: "Rejection Rate",
          value: "18.5%",
          change: "-2.1%",
          trend: "down",
          detail: {
            description: "Percentage of proposals rejected",
            category: "Performance",
            unit: "%",
            target: "20.0%",
            variance: "-7.5%",
            frequency: "Monthly",
          },
        },
        {
          label: "Average Processing Time",
          value: "3.2 days",
          change: "-0.8 days",
          trend: "down",
          detail: {
            description: "Average time to process a proposal",
            category: "Efficiency",
            unit: "days",
            target: "4.0",
            variance: "-20.0%",
            frequency: "Monthly",
          },
        },
        {
          label: "Funding Rate",
          value: "50.6%",
          change: "+4.7%",
          trend: "up",
          detail: {
            description: "Percentage of proposals that receive funding",
            category: "Conversion",
            unit: "%",
            target: "48.0%",
            variance: "+5.4%",
            frequency: "Monthly",
          },
        },
      ],
      charts: ["Proposal Status", "Approval Timeline", "Business Categories"],
      recentActivities: [
        {
          id: 1,
          activity: "Proposal submitted for review",
          business: "Tech Solutions",
          date: "2024-03-15",
          type: "submission",
        },
        {
          id: 2,
          activity: "Proposal approved for funding",
          amount: "₦1,200,000",
          date: "2024-03-14",
          type: "approval",
        },
        {
          id: 3,
          activity: "Batch processing completed",
          count: "15 proposals",
          date: "2024-03-13",
          type: "processing",
        },
      ],
    },
  };

  const reportTypes = [
    {
      id: "financial",
      name: "Financial Report",
      icon: "FiDollarSign",
      color: "#10b981",
    },
    {
      id: "users",
      name: "User Analytics",
      icon: "FiUsers",
      color: "#3b82f6",
    },
    {
      id: "loans",
      name: "Loan Portfolio",
      icon: "FiTrendingUp",
      color: "#8b5cf6",
    },
    {
      id: "proposals",
      name: "Proposal Analytics",
      icon: "FiFileText",
      color: "#f59e0b",
    },
    {
      id: "performance",
      name: "Performance",
      icon: "FiActivity",
      color: "#ef4444",
    },
    {
      id: "geographic",
      name: "Geographic",
      icon: "FiPieChart",
      color: "#06b6d4",
    },
  ];

  const currentReport = reportsData[selectedReport] || reportsData.financial;

  // Handle view metric details
  const handleViewDetails = (metric) => {
    setSelectedMetric({
      ...metric,
      reportType: selectedReport,
      reportTitle: currentReport.title,
    });
    setView("detail");
  };

  // Handle back to dashboard
  const handleBackToDashboard = () => {
    setView("dashboard");
    setSelectedMetric(null);
  };

  // Handle report generation
  const handleGenerateReport = () => {
    console.log(`Generating ${currentReport.title} report`);
    // In a real app, this would trigger API call to generate report
  };

  // Handle report download
  const handleDownloadReport = (format) => {
    console.log(`Downloading ${currentReport.title} as ${format}`);
    // In a real app, this would trigger file download
  };

  // Handle report type change
  const handleReportTypeChange = (reportId) => {
    setSelectedReport(reportId);
  };

  if (view === "detail" && selectedMetric) {
    return (
      <ReportDetailView
        metric={selectedMetric}
        onBack={handleBackToDashboard}
        onDownload={handleDownloadReport}
      />
    );
  }

  return (
    <ReportDashboard
      reportsData={reportsData}
      reportTypes={reportTypes}
      selectedReport={selectedReport}
      currentReport={currentReport}
      onReportTypeChange={handleReportTypeChange}
      onGenerateReport={handleGenerateReport}
      onDownloadReport={handleDownloadReport}
      onViewDetails={handleViewDetails}
    />
  );
}
