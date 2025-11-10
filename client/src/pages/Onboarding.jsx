import React from "react";
import { useOutletContext } from "react-router-dom";
import "../styles/onboarding.css";

const Onboarding = () => {
  const { loggedInUser } = useOutletContext();

  const onboardingData = loggedInUser?.onboarding || [
    { id: 1, step: "Profile Created", completed: true },
    { id: 2, step: "BVN Verified", completed: true },
    { id: 3, step: "Business Proposal Submitted", completed: false },
    { id: 4, step: "Loan Eligibility Checked", completed: false },
  ];

  const center = { lat: 9.05785, lng: 7.49508 };

  return (
    <div className="onboarding-page">
      <h2>Onboarding Progress</h2>

      <div className="onboarding-cards">
        {onboardingData.map((step) => (
          <div
            key={step.id}
            className={`onboarding-card ${
              step.completed ? "completed" : "pending"
            }`}>
            <h3>{step.step}</h3>
            <p>{step.completed ? "Completed" : "Pending"}</p>
          </div>
        ))}
      </div>

      <table className="onboarding-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {onboardingData.map((item) => (
            <tr key={item.id}>
              <td>{item.step}</td>
              <td
                className={
                  item.completed ? "status-completed" : "status-pending"
                }>
                {item.completed ? "Completed" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>User Location</h3>
      <div className="google-map-container">
        <iframe
          title="User Location"
          width="100%"
          height="100%"
          src={`https://maps.google.com/maps?q=${center.lat},${center.lng}&z=12&output=embed`}
          frameBorder="0"
          style={{ borderRadius: "12px" }}></iframe>
      </div>
    </div>
  );
};

export default Onboarding;
