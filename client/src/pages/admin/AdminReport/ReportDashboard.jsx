import React, { useState } from "react";
import {
  FiDownload,
  FiFilter,
  FiCalendar,
  FiActivity,
  FiEye,
  FiFileText,
  FiTrendingUp,
} from "react-icons/fi";
import styles from "../../../styles/AdminReport.module.css";

export default function ReportDashboard({
  reportsData,
  reportTypes,
  selectedReport,
  currentReport,
  onReportTypeChange,
  onGenerateReport,
  onDownloadReport,
  onViewDetails,
}) {
  const [dateRange, setDateRange] = useState("month");
  const [startDate, setStartDate] = useState("2024-03-01");
  const [endDate, setEndDate] = useState("2024-03-31");

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reports Dashboard</h1>
          <p className={styles.subtitle}>
            Comprehensive analytics and insights for informed decision-making
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.generateButton} onClick={onGenerateReport}>
            <FiActivity className={styles.buttonIcon} />
            Generate Report
          </button>
          <div className={styles.downloadDropdown}>
            <button className={styles.downloadButton}>
              <FiDownload className={styles.buttonIcon} />
              Download
            </button>
            <div className={styles.dropdownMenu}>
              <button onClick={() => onDownloadReport("pdf")}>
                PDF Report
              </button>
              <button onClick={() => onDownloadReport("excel")}>
                Excel Data
              </button>
              <button onClick={() => onDownloadReport("csv")}>
                CSV Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className={styles.reportSelector}>
        {reportTypes.map((report) => (
          <button
            key={report.id}
            className={`${styles.reportTypeButton} ${
              selectedReport === report.id ? styles.active : ""
            }`}
            onClick={() => onReportTypeChange(report.id)}
            style={{ borderLeftColor: report.color }}>
            <span className={styles.reportIcon} style={{ color: report.color }}>
              {getIconComponent(report.icon)}
            </span>
            <span className={styles.reportName}>{report.name}</span>
          </button>
        ))}
      </div>

      {/* Date Range Selector */}
      <div className={styles.dateControls}>
        <div className={styles.dateRangeSelector}>
          <FiCalendar className={styles.calendarIcon} />
          <select
            className={styles.dateRangeSelect}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {dateRange === "custom" && (
          <div className={styles.customDateRange}>
            <input
              type="date"
              className={styles.dateInput}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className={styles.dateSeparator}>to</span>
            <input
              type="date"
              className={styles.dateInput}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}

        <div className={styles.filterGroup}>
          <FiFilter className={styles.filterIcon} />
          <select className={styles.filterSelect}>
            <option value="">All Regions</option>
            <option value="north">Northern Region</option>
            <option value="south">Southern Region</option>
            <option value="east">Eastern Region</option>
            <option value="west">Western Region</option>
          </select>
        </div>
      </div>

      {/* Report Summary */}
      <div className={styles.reportSummary}>
        <div className={styles.summaryHeader}>
          <div className={styles.summaryTitle}>
            {getIconComponent(currentReport.icon)}
            <h2>{currentReport.title}</h2>
          </div>
          <span className={styles.reportPeriod}>
            Period:{" "}
            {dateRange === "custom"
              ? `${startDate} to ${endDate}`
              : `This ${dateRange}`}
          </span>
        </div>
        <p className={styles.summaryDescription}>{currentReport.summary}</p>
      </div>

      {/* Key Metrics */}
      <div className={styles.metricsGrid}>
        {currentReport.metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <span
                className={`${styles.metricChange} ${styles[metric.trend]}`}>
                {metric.change}
              </span>
            </div>
            <div className={styles.metricValue}>{metric.value}</div>
            <button
              className={styles.viewDetailsButton}
              onClick={() => onViewDetails(metric)}>
              <FiEye className={styles.viewIcon} />
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Charts & Visualizations */}
      <div className={styles.visualizationSection}>
        <h3 className={styles.sectionTitle}>Charts & Visualizations</h3>
        <div className={styles.chartsGrid}>
          {currentReport.charts.map((chart, index) => (
            <div key={index} className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <h4>{chart}</h4>
                <select className={styles.chartPeriodSelect}>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className={styles.chartPlaceholder}>
                <div className={styles.chartBars}>
                  {[70, 85, 60, 90, 75, 80].map((height, i) => (
                    <div
                      key={i}
                      className={styles.chartBar}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <div className={styles.chartLabels}>
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className={styles.activitiesSection}>
        <h3 className={styles.sectionTitle}>Recent Activities</h3>
        <div className={styles.activitiesList}>
          {currentReport.recentActivities.map((activity) => (
            <div key={activity.id} className={styles.activityItem}>
              <div className={styles.activityIcon}>
                {getActivityIcon(activity.type)}
              </div>
              <div className={styles.activityContent}>
                <p className={styles.activityText}>{activity.activity}</p>
                <div
                  className={
                    activity.amount
                      ? styles.activityMeta
                      : styles.activityMetaNoAmount
                  }>
                  {activity.amount && (
                    <span className={styles.activityAmount}>
                      {activity.amount}
                    </span>
                  )}
                  {activity.user && (
                    <span className={styles.activityUser}>{activity.user}</span>
                  )}
                  {activity.count && (
                    <span className={styles.activityCount}>
                      {activity.count}
                    </span>
                  )}
                  <span className={styles.activityDate}>{activity.date}</span>
                </div>
              </div>
              <span
                className={`${styles.activityType} ${styles[activity.type]}`}>
                {activity.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className={styles.insightsSection}>
        <h3 className={styles.sectionTitle}>Key Insights</h3>
        <div className={styles.insightsGrid}>
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <span
                className={styles.insightBadge}
                style={{ background: "#d1fae5", color: "#065f46" }}>
                Positive
              </span>
              <h4>Growth Trend</h4>
            </div>
            <p className={styles.insightText}>
              Consistent growth observed across all metrics with a 12.5%
              increase in overall performance compared to last period.
            </p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <span
                className={styles.insightBadge}
                style={{ background: "#fee2e2", color: "#991b1b" }}>
                Attention Needed
              </span>
              <h4>Risk Areas</h4>
            </div>
            <p className={styles.insightText}>
              Slight increase in operating costs observed. Review expense
              allocation for potential optimization opportunities.
            </p>
          </div>
          <div className={styles.insightCard}>
            <div className={styles.insightHeader}>
              <span
                className={styles.insightBadge}
                style={{ background: "#dbeafe", color: "#1e40af" }}>
                Recommendation
              </span>
              <h4>Next Steps</h4>
            </div>
            <p className={styles.insightText}>
              Consider expanding loan products to underserved segments showing
              high repayment rates and low default risk.
            </p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className={styles.exportSection}>
        <h3 className={styles.sectionTitle}>Export Options</h3>
        <div className={styles.exportOptions}>
          <button
            className={styles.exportButton}
            onClick={() => onDownloadReport("pdf")}>
            <FiFileText />
            <span>PDF Report</span>
            <small>Comprehensive report with charts</small>
          </button>
          <button
            className={styles.exportButton}
            onClick={() => onDownloadReport("excel")}>
            <FiTrendingUp />
            <span>Excel Data</span>
            <small>Raw data for analysis</small>
          </button>
          <button
            className={styles.exportButton}
            onClick={() => onDownloadReport("csv")}>
            <FiDownload />
            <span>CSV Export</span>
            <small>Simple data export</small>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to get icon component
function getIconComponent(iconName) {
  const iconMap = {
    FiDollarSign: "💰",
    FiUsers: "👥",
    FiTrendingUp: "📈",
    FiFileText: "📄",
    FiActivity: "📊",
    FiPieChart: "🥧",
  };
  return iconMap[iconName] || "📊";
}

// Helper function to get activity icon
function getActivityIcon(type) {
  switch (type) {
    case "disbursement":
    case "repayment":
    case "revenue":
    case "approval":
      return "💰";
    case "registration":
    case "upgrade":
      return "👤";
    case "milestone":
      return "🏆";
    case "assessment":
      return "📋";
    case "submission":
      return "📤";
    case "processing":
      return "⚙️";
    case "completion":
      return "✅";
    default:
      return "📄";
  }
}
