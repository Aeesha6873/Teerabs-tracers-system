import React from "react";
import "../styles/overview.css";

const OverviewCard = ({ title, value }) => {
  return (
    <div className="overview-card">
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
};

export default OverviewCard;
