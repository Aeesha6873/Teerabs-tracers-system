import React from "react";
import { FiArrowLeft, FiMapPin, FiNavigation } from "react-icons/fi";
import styles from "../../../styles/onboarding.module.css";

const OnboardingUserMap = ({ user, onBack }) => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <FiArrowLeft /> Back to User Details
        </button>
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>User Location</h1>
          <p className={styles.subtitle}>Geographic location of {user.name}</p>
        </div>
      </div>

      {/* User Info Card */}
      <div className={styles.mapUserCard}>
        <div className={styles.mapUserHeader}>
          <div
            className={styles.mapUserAvatar}
            style={{ backgroundColor: user.avatarColor }}>
            {user.name.charAt(0)}
          </div>
          <div className={styles.mapUserInfo}>
            <h3>{user.name}</h3>
            <p>{user.address}</p>
            <div className={styles.mapUserCoords}>
              <FiMapPin />
              <span>
                Coordinates: {user.location.lat.toFixed(6)},{" "}
                {user.location.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className={styles.fullMapContainer}>
        <div className={styles.mapHeader}>
          <FiNavigation />
          <h3>User Location Map</h3>
        </div>

        <div className={styles.mapWrapper}>
          <iframe
            title="User Location"
            width="100%"
            height="500"
            style={{ border: 0, borderRadius: "12px" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${user.location.lat},${user.location.lng}&zoom=15`}></iframe>
        </div>

        <div className={styles.mapDetails}>
          <div className={styles.mapDetailItem}>
            <div className={styles.mapDetailLabel}>Address</div>
            <div className={styles.mapDetailValue}>{user.address}</div>
          </div>
          <div className={styles.mapDetailItem}>
            <div className={styles.mapDetailLabel}>State/LGA</div>
            <div className={styles.mapDetailValue}>
              {user.state} / {user.lga}
            </div>
          </div>
          <div className={styles.mapDetailItem}>
            <div className={styles.mapDetailLabel}>Coordinates</div>
            <div className={styles.mapDetailValue}>
              Latitude: {user.location.lat.toFixed(6)}
              <br />
              Longitude: {user.location.lng.toFixed(6)}
            </div>
          </div>
        </div>

        <div className={styles.mapActions}>
          <button
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={() =>
              window.open(
                `https://www.google.com/maps?q=${user.location.lat},${user.location.lng}`,
                "_blank"
              )
            }>
            Open in Google Maps
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${user.location.lat},${user.location.lng}`,
                "_blank"
              )
            }>
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingUserMap;
