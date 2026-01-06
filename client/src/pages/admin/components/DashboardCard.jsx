// import React from "react";

// export default function DashboardCard({ title, value }) {
//   return (
//     <div className="dashboard-card">
//       <h3 className="dashboard-card-title">{title}</h3>
//       <p className="dashboard-card-value">{value}</p>
//     </div>
//   );
// }
// src/components/DashboardCard.jsx

import React from "react";
// import "./DashboardCard.css";

export default function DashboardCard({ title, value, icon }) {
  return (
    <div className="dash-card">
      <div className="dash-card-left">
        <p className="dash-card-title">{title}</p>
        <h2 className="dash-card-value">{value}</h2>
      </div>

      <div className="dash-card-icon">{icon}</div>
    </div>
  );
}
