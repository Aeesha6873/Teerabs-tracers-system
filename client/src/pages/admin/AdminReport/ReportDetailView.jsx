import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiAlertCircle,
  FiCalendar,
  FiFilter,
  FiShare2,
  FiPrinter,
  FiRefreshCw,
} from "react-icons/fi";
import { MdAttachFile, MdInsights } from "react-icons/md";
import styles from "../../../styles/AdminReport.module.css";

const ReportDetailView = ({ metric, onBack }) => {
  const [dateRange, setDateRange] = useState("month");
  const [viewMode, setViewMode] = useState("daily");

  // Sample data for different metric types
  const getMetricData = () => {
    const baseData = {
      current: metric.value,
      change: metric.change,
      trend: metric.trend,
      category: metric.category || "general",
      description: `Detailed analysis of ${metric.label.toLowerCase()} showing performance trends, insights, and recommendations.`,
    };

    // Add specific data based on metric type
    if (metric.label.includes("Revenue") || metric.label.includes("Amount")) {
      return {
        ...baseData,
        unit: "₦",
        target: metric.label.includes("Revenue") ? "₦5,000,000" : "₦400,000",
        period: "Monthly",
        benchmarks: [
          { label: "Industry Average", value: "₦3,200,000" },
          { label: "Last Year", value: "₦2,800,000" },
          { label: "Quarter Target", value: "₦4,500,000" },
        ],
      };
    } else if (metric.label.includes("Rate") || metric.label.includes("%")) {
      return {
        ...baseData,
        unit: "%",
        target: "95%",
        period: "Monthly",
        benchmarks: [
          { label: "Industry Average", value: "88%" },
          { label: "Last Year", value: "82%" },
          { label: "Target", value: "95%" },
        ],
      };
    } else {
      return {
        ...baseData,
        unit: "",
        target: "1,500",
        period: "Monthly",
        benchmarks: [
          { label: "Industry Average", value: "1,100" },
          { label: "Last Year", value: "950" },
          { label: "Target", value: "1,500" },
        ],
      };
    }
  };

  const metricData = getMetricData();

  // Generate trend data
  const generateTrendData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseValue = parseFloat(metric.value.replace(/[^0-9.]/g, ""));
    const isPercentage = metric.value.includes("%");

    return months.map((month, index) => {
      let value;
      if (isPercentage) {
        value = Math.min(100, baseValue * (0.8 + index * 0.08));
      } else {
        value = baseValue * (0.7 + index * 0.1);
      }

      const target = value * (0.9 + Math.random() * 0.2);

      return {
        month,
        value: isPercentage ? Math.round(value) : Math.round(value),
        target: isPercentage ? Math.round(target) : Math.round(target),
        growth:
          index === 0
            ? 0
            : Math.round(
                (value / (baseValue * (0.7 + (index - 1) * 0.1)) - 1) * 100
              ),
      };
    });
  };

  const trendData = generateTrendData();

  // Insights based on metric category
  const insights = {
    revenue: [
      "Revenue growth is exceeding industry average by 15%",
      "Seasonal patterns show peak performance in Q2 and Q4",
      "Customer acquisition cost has decreased by 8% this quarter",
      "Premium tier subscriptions contribute 45% of total revenue",
    ],
    loans: [
      "Loan portfolio shows healthy diversification across sectors",
      "Default rate is 2.3% below industry average",
      "Average loan processing time has improved by 18%",
      "Repeat borrowers represent 65% of active loans",
    ],
    users: [
      "User retention rate improved by 12% this quarter",
      "Active user growth is outpacing new registrations",
      "Mobile app usage increased by 35% compared to web",
      "User satisfaction score is 4.2/5.0",
    ],
    performance: [
      "All key performance indicators show positive trends",
      "System uptime has been 99.8% this quarter",
      "Customer support response time improved by 40%",
      "Error rate decreased by 65% since last quarter",
    ],
    general: [
      "Metric shows consistent improvement over last 6 months",
      "Performance exceeds target by 8.5%",
      "Quarter-over-quarter growth of 12.3%",
      "Forecast predicts continued growth in next quarter",
    ],
  };

  const currentInsights = insights[metricData.category] || insights.general;

  const handleExport = (format) => {
    console.log(`Exporting ${metric.label} analysis as ${format}`);
    // In a real app, this would trigger file download
  };

  const handleShare = () => {
    console.log("Sharing analysis");
    // In a real app, this would open share dialog
  };

  const handlePrint = () => {
    console.log("Printing analysis");
    window.print();
  };

  const handleRefresh = () => {
    console.log("Refreshing data");
    // In a real app, this would refresh data
  };

  return (
    <div className={styles.detailPage}>
      {/* Header */}
      <div className={styles.detailHeader}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to Reports
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.detailTitle}>
            {metric.label} Analysis
            <span className={`${styles.trendBadge} ${styles[metric.trend]}`}>
              {metric.trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
              {metric.change}
            </span>
          </h1>
          <p className={styles.detailSubtitle}>
            Detailed performance metrics and trend analysis for{" "}
            {metric.label.toLowerCase()}
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.iconButton}
            onClick={handleRefresh}
            title="Refresh">
            <FiRefreshCw />
          </button>
          <button
            className={styles.iconButton}
            onClick={handleShare}
            title="Share">
            <FiShare2 />
          </button>
          <button
            className={styles.iconButton}
            onClick={handlePrint}
            title="Print">
            <FiPrinter />
          </button>
          <div className={styles.downloadDropdown}>
            <button className={styles.downloadButton}>
              <FiDownload /> Export
            </button>
            <div className={styles.dropdownMenu}>
              <button onClick={() => handleExport("pdf")}>PDF Report</button>
              <button onClick={() => handleExport("excel")}>Excel Data</button>
              <button onClick={() => handleExport("csv")}>CSV Export</button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className={styles.detailStats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#d1fae5" }}>
            <FiBarChart2 style={{ color: "#065f46" }} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{metric.value}</div>
            <div className={styles.statLabel}>Current Value</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#dbeafe" }}>
            <FiTrendingUp style={{ color: "#1e40af" }} />
          </div>
          <div className={styles.statContent}>
            <div className={`${styles.statValue} ${styles[metric.trend]}`}>
              {metric.change}
            </div>
            <div className={styles.statLabel}>Change</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#fef3c7" }}>
            <FiClock style={{ color: "#92400e" }} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{metricData.period}</div>
            <div className={styles.statLabel}>Reporting Period</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: "#f1f5f9" }}>
            <MdInsights style={{ color: "#475569" }} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>Good</div>
            <div className={styles.statLabel}>Performance Rating</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.detailControls}>
        <div className={styles.controlGroup}>
          <FiCalendar className={styles.icon} />
          <select
            className={styles.select}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">Last 12 months</option>
          </select>
        </div>

        <div className={styles.controlGroup}>
          <FiFilter className={styles.icon} />
          <select
            className={styles.select}
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}>
            <option value="daily">Daily View</option>
            <option value="weekly">Weekly View</option>
            <option value="monthly">Monthly View</option>
            <option value="quarterly">Quarterly View</option>
          </select>
        </div>

        <div className={styles.viewOptions}>
          <button
            className={`${styles.viewBtn} ${
              viewMode === "daily" ? styles.active : ""
            }`}
            onClick={() => setViewMode("daily")}>
            Daily
          </button>
          <button
            className={`${styles.viewBtn} ${
              viewMode === "weekly" ? styles.active : ""
            }`}
            onClick={() => setViewMode("weekly")}>
            Weekly
          </button>
          <button
            className={`${styles.viewBtn} ${
              viewMode === "monthly" ? styles.active : ""
            }`}
            onClick={() => setViewMode("monthly")}>
            Monthly
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.detailGrid}>
        {/* Trend Chart */}
        <div className={styles.trendSection}>
          <div className={styles.sectionHeader}>
            <h3>Performance Trend</h3>
            <span className={styles.sectionSubtitle}>
              6-month performance overview
            </span>
          </div>
          <div className={styles.trendChart}>
            <div className={styles.chartBars}>
              {trendData.map((item, index) => (
                <div key={index} className={styles.trendBarGroup}>
                  <div className={styles.barContainer}>
                    <div
                      className={styles.targetBar}
                      style={{
                        height: `${Math.min(100, (item.target / 150) * 100)}%`,
                      }}
                      title={`Target: ${item.target}${metricData.unit}`}
                    />
                    <div
                      className={styles.valueBar}
                      style={{
                        height: `${Math.min(100, (item.value / 150) * 100)}%`,
                      }}
                      title={`Actual: ${item.value}${metricData.unit}`}
                    />
                  </div>
                  <div className={styles.barLabel}>{item.month}</div>
                  <div className={styles.barValues}>
                    <span className={styles.actual}>
                      {item.value}
                      {metricData.unit}
                    </span>
                    {item.growth !== 0 && (
                      <span
                        className={`${styles.growth} ${
                          item.growth > 0 ? styles.positive : styles.negative
                        }`}>
                        {item.growth > 0 ? "+" : ""}
                        {item.growth}%
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.actualDot}`} />
                <span>Actual Value</span>
              </div>
              <div className={styles.legendItem}>
                <div className={`${styles.legendDot} ${styles.targetDot}`} />
                <span>Target Value</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benchmarks */}
        <div className={styles.benchmarkSection}>
          <div className={styles.sectionHeader}>
            <h3>Performance Benchmarks</h3>
            <span className={styles.sectionSubtitle}>
              Comparison against targets
            </span>
          </div>
          <div className={styles.benchmarkList}>
            {metricData.benchmarks.map((benchmark, index) => (
              <div key={index} className={styles.benchmarkItem}>
                <div className={styles.benchmarkLabel}>{benchmark.label}</div>
                <div className={styles.benchmarkValue}>{benchmark.value}</div>
                <div className={styles.benchmarkStatus}>
                  <span className={styles.statusIndicator} />
                  {Math.random() > 0.5 ? "Above" : "Below"} Target
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className={styles.insightsSection}>
          <div className={styles.sectionHeader}>
            <h3>Key Insights</h3>
            <span className={styles.sectionSubtitle}>
              Analysis and observations
            </span>
          </div>
          <div className={styles.insightsList}>
            {currentInsights.map((insight, index) => (
              <div key={index} className={styles.insightItem}>
                <div className={styles.insightIcon}>
                  <FiAlertCircle />
                </div>
                <div className={styles.insightContent}>
                  <p>{insight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast */}
        <div className={styles.forecastSection}>
          <div className={styles.sectionHeader}>
            <h3>Next 3 Months Forecast</h3>
            <span className={styles.sectionSubtitle}>
              Projected performance
            </span>
          </div>
          <div className={styles.forecastChart}>
            <div className={styles.forecastLine}>
              {["Jul", "Aug", "Sep"].map((month, i) => {
                const projectedValue = Math.round(
                  trendData[trendData.length - 1].value * (1.05 + i * 0.03)
                );
                return (
                  <div key={i} className={styles.forecastPoint}>
                    <div className={styles.pointDot} />
                    <div className={styles.pointValue}>
                      {projectedValue}
                      {metricData.unit}
                    </div>
                    <div className={styles.pointMonth}>{month}</div>
                  </div>
                );
              })}
            </div>
            <div className={styles.forecastStats}>
              <div className={styles.forecastStat}>
                <div className={styles.statLabel}>Projected Growth</div>
                <div className={styles.statValue}>+8.5%</div>
              </div>
              <div className={styles.forecastStat}>
                <div className={styles.statLabel}>Confidence Level</div>
                <div className={styles.statValue}>85%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className={styles.recommendationsSection}>
        <div className={styles.sectionHeader}>
          <h3>Recommendations</h3>
          <span className={styles.sectionSubtitle}>Actionable next steps</span>
        </div>
        <div className={styles.recommendationsGrid}>
          <div className={styles.recommendationCard}>
            <div className={styles.recIcon}>🚀</div>
            <h4>Optimize Performance</h4>
            <p>
              Implement targeted strategies to maintain current growth momentum
              and exceed quarterly targets.
            </p>
            <button className={styles.recButton}>View Strategies</button>
          </div>
          <div className={styles.recommendationCard}>
            <div className={styles.recIcon}>📊</div>
            <h4>Enhance Monitoring</h4>
            <p>
              Set up automated alerts for performance thresholds and implement
              real-time dashboards.
            </p>
            <button className={styles.recButton}>Configure Alerts</button>
          </div>
          <div className={styles.recommendationCard}>
            <div className={styles.recIcon}>🤝</div>
            <h4>Share Insights</h4>
            <p>
              Schedule regular review meetings with stakeholders to discuss
              performance and align on goals.
            </p>
            <button className={styles.recButton}>Schedule Meeting</button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className={styles.dataTableSection}>
        <div className={styles.sectionHeader}>
          <h3>Detailed Data</h3>
          <div className={styles.tableActions}>
            <button
              className={styles.tableButton}
              onClick={() => handleExport("csv")}>
              <FiDownload /> Download CSV
            </button>
            <button
              className={styles.tableButton}
              onClick={() => handleExport("excel")}>
              <MdAttachFile /> Export Excel
            </button>
          </div>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Period</th>
                <th>Value</th>
                <th>Target</th>
                <th>Variance</th>
                <th>Growth</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {trendData.map((row, index) => {
                const variance = ((row.value - row.target) / row.target) * 100;
                const performance =
                  variance > 0 ? "Above Target" : "Below Target";

                return (
                  <tr key={index}>
                    <td>{row.month} 2024</td>
                    <td className={styles.dataValue}>
                      {row.value}
                      {metricData.unit}
                    </td>
                    <td>
                      {row.target}
                      {metricData.unit}
                    </td>
                    <td
                      className={
                        variance > 0 ? styles.positive : styles.negative
                      }>
                      {variance > 0 ? "+" : ""}
                      {variance.toFixed(1)}%
                    </td>
                    <td
                      className={
                        row.growth > 0 ? styles.positive : styles.negative
                      }>
                      {row.growth > 0 ? "+" : ""}
                      {row.growth}%
                    </td>
                    <td>
                      <span
                        className={`${styles.performanceBadge} ${
                          variance > 0 ? styles.above : styles.below
                        }`}>
                        {performance}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailView;
