import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import styles from "../../../styles/onboarding.module.css";

const GoogleMapPicker = ({ location, setLocation }) => {
  const [coords, setCoords] = useState(
    location || { lat: 9.0765, lng: 7.3986 }
  );
  const [address, setAddress] = useState("");

  const handleCoordChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...coords, [name]: parseFloat(value) };
    setCoords(updated);
    setLocation(updated);
  };

  const handleAddressSearch = async () => {
    if (!address.trim()) return;

    // In a real app, you would use Google Geocoding API here
    // For demo, we'll use a mock response
    const mockCoords = { lat: 6.5244, lng: 3.3792 }; // Lagos coordinates
    setCoords(mockCoords);
    setLocation(mockCoords);
  };

  return (
    <div className={styles.mapPicker}>
      <div className={styles.mapControls}>
        <div className={styles.addressSearch}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Search address..."
            className={styles.addressInput}
          />
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={handleAddressSearch}>
            Search
          </button>
        </div>

        <div className={styles.coordInputs}>
          <div className={styles.coordGroup}>
            <label>Latitude</label>
            <input
              type="number"
              name="lat"
              value={coords.lat}
              onChange={handleCoordChange}
              step="0.0001"
              className={styles.coordInput}
            />
          </div>
          <div className={styles.coordGroup}>
            <label>Longitude</label>
            <input
              type="number"
              name="lng"
              value={coords.lng}
              onChange={handleCoordChange}
              step="0.0001"
              className={styles.coordInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <div className={styles.mapHeader}>
          <FiMapPin />
          <span>
            User Location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </span>
        </div>
        <iframe
          title="User Location Map"
          width="100%"
          height="400"
          style={{ border: 0, borderRadius: "8px" }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${coords.lat},${coords.lng}&zoom=15`}></iframe>
        <div className={styles.mapNote}>
          Note: Replace YOUR_GOOGLE_MAPS_API_KEY with your actual API key
        </div>
      </div>
    </div>
  );
};

export default GoogleMapPicker;
