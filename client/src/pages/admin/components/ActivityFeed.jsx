import React from "react";
import {
  FiDollarSign,
  FiLayers,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";

export default function ActivityFeed({ activities }) {
  const getIcon = (type) => {
    switch (type) {
      case "loan":
        return <FiDollarSign />;
      case "cluster":
        return <FiLayers />;
      case "proposal":
        return <FiFileText />;
      case "repayment":
        return <FiCheckCircle />;
      default:
        return <FiDollarSign />;
    }
  };

  return (
    <div className="activity-feed">
      {activities.map((activity) => (
        <div key={activity.id} className="activity-item">
          <div className={`activity-icon ${activity.type}`}>
            {getIcon(activity.type)}
          </div>
          <div className="activity-content">
            <p className="activity-text">
              <strong>{activity.user}</strong> {activity.action}
            </p>
            <span className="activity-time">{activity.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
