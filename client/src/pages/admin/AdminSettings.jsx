import React, { useState } from "react";
import {
  FiSettings,
  FiUsers,
  FiShield,
  FiBell,
  FiDatabase,
  FiGlobe,
  FiMail,
  FiLock,
  FiSave,
  FiRefreshCw,
  FiKey,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiX,
  FiUpload,
  FiDownload,
} from "react-icons/fi";
import styles from "../../styles/adminSettings.module.css";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Loan Management System",
    siteUrl: "https://loans.example.com",
    adminEmail: "admin@example.com",
    timezone: "Africa/Lagos",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    language: "en",

    // Security Settings
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireTwoFactor: false,
    ipWhitelist: ["192.168.1.1", "10.0.0.1"],

    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    notifyNewLoans: true,
    notifyDuePayments: true,
    notifyDefaults: true,

    // User Management
    allowUserRegistration: true,
    requireEmailVerification: true,
    defaultUserRole: "user",
    maxUsersPerPlan: 1000,

    // System Settings
    maintenanceMode: false,
    backupFrequency: "daily",
    logRetention: 30, // days
    apiRateLimit: 100, // requests per minute
  });

  // Form states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSettingChange = (category, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Failed to save settings: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (passwordForm.newPassword.length < settings.passwordMinLength) {
      alert(
        `Password must be at least ${settings.passwordMinLength} characters long!`
      );
      return;
    }

    // Handle password change logic here
    alert("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleBackupNow = () => {
    if (window.confirm("Start database backup now?")) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert("Backup completed successfully!");
      }, 2000);
    }
  };

  const handleClearCache = () => {
    if (window.confirm("Clear all system cache?")) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert("Cache cleared successfully!");
      }, 1500);
    }
  };

  // Tab configuration
  const tabs = [
    { id: "general", label: "General", icon: <FiSettings /> },
    { id: "security", label: "Security", icon: <FiShield /> },
    { id: "notifications", label: "Notifications", icon: <FiBell /> },
    { id: "users", label: "Users", icon: <FiUsers /> },
    { id: "system", label: "System", icon: <FiDatabase /> },
  ];

  const renderGeneralSettings = () => (
    <div className={styles.settingsSection}>
      <h3 className={styles.sectionTitle}>
        <FiSettings className={styles.sectionIcon} />
        General Settings
      </h3>

      <div className={styles.settingsGrid}>
        <div className={styles.settingItem}>
          <label>Site Name</label>
          <input
            type="text"
            value={settings.siteName}
            onChange={(e) =>
              handleSettingChange("general", "siteName", e.target.value)
            }
            placeholder="Enter site name"
          />
        </div>

        <div className={styles.settingItem}>
          <label>Site URL</label>
          <input
            type="url"
            value={settings.siteUrl}
            onChange={(e) =>
              handleSettingChange("general", "siteUrl", e.target.value)
            }
            placeholder="https://example.com"
          />
        </div>

        <div className={styles.settingItem}>
          <label>Admin Email</label>
          <input
            type="email"
            value={settings.adminEmail}
            onChange={(e) =>
              handleSettingChange("general", "adminEmail", e.target.value)
            }
            placeholder="admin@example.com"
          />
        </div>

        <div className={styles.settingItem}>
          <label>Timezone</label>
          <select
            value={settings.timezone}
            onChange={(e) =>
              handleSettingChange("general", "timezone", e.target.value)
            }>
            <option value="Africa/Lagos">Africa/Lagos (GMT+1)</option>
            <option value="UTC">UTC</option>
            <option value="America/New_York">America/New York (GMT-5)</option>
            <option value="Europe/London">Europe/London (GMT+0)</option>
            <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
          </select>
        </div>

        <div className={styles.settingItem}>
          <label>Date Format</label>
          <select
            value={settings.dateFormat}
            onChange={(e) =>
              handleSettingChange("general", "dateFormat", e.target.value)
            }>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <div className={styles.settingItem}>
          <label>Time Format</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                checked={settings.timeFormat === "12h"}
                onChange={() =>
                  handleSettingChange("general", "timeFormat", "12h")
                }
              />
              <span>12-hour</span>
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                checked={settings.timeFormat === "24h"}
                onChange={() =>
                  handleSettingChange("general", "timeFormat", "24h")
                }
              />
              <span>24-hour</span>
            </label>
          </div>
        </div>

        <div className={styles.settingItem}>
          <label>Language</label>
          <select
            value={settings.language}
            onChange={(e) =>
              handleSettingChange("general", "language", e.target.value)
            }>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className={styles.settingsSection}>
      <h3 className={styles.sectionTitle}>
        <FiShield className={styles.sectionIcon} />
        Security Settings
      </h3>

      <div className={styles.settingsGrid}>
        <div className={styles.settingItem}>
          <label>Session Timeout (minutes)</label>
          <input
            type="number"
            min="5"
            max="120"
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleSettingChange(
                "security",
                "sessionTimeout",
                parseInt(e.target.value)
              )
            }
          />
          <span className={styles.helperText}>
            After {settings.sessionTimeout} minutes of inactivity
          </span>
        </div>

        <div className={styles.settingItem}>
          <label>Max Login Attempts</label>
          <input
            type="number"
            min="1"
            max="10"
            value={settings.maxLoginAttempts}
            onChange={(e) =>
              handleSettingChange(
                "security",
                "maxLoginAttempts",
                parseInt(e.target.value)
              )
            }
          />
          <span className={styles.helperText}>
            Account lockout after {settings.maxLoginAttempts} failed attempts
          </span>
        </div>

        <div className={styles.settingItem}>
          <label>Minimum Password Length</label>
          <input
            type="number"
            min="6"
            max="32"
            value={settings.passwordMinLength}
            onChange={(e) =>
              handleSettingChange(
                "security",
                "passwordMinLength",
                parseInt(e.target.value)
              )
            }
          />
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.requireTwoFactor}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "requireTwoFactor",
                  e.target.checked
                )
              }
            />
            <span>Require Two-Factor Authentication</span>
          </label>
        </div>

        <div className={styles.settingItem} style={{ gridColumn: "1 / -1" }}>
          <label>IP Whitelist</label>
          <textarea
            value={settings.ipWhitelist.join("\n")}
            onChange={(e) =>
              handleSettingChange(
                "security",
                "ipWhitelist",
                e.target.value.split("\n")
              )
            }
            placeholder="Enter one IP address per line"
            rows={4}
          />
          <span className={styles.helperText}>
            One IP address per line. Leave empty to allow all IPs.
          </span>
        </div>
      </div>

      {/* Change Password Section */}
      <div className={styles.passwordSection}>
        <h4 className={styles.subsectionTitle}>
          <FiKey className={styles.subsectionIcon} />
          Change Password
        </h4>

        <div className={styles.passwordGrid}>
          <div className={styles.passwordField}>
            <label>Current Password</label>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                placeholder="Enter current password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className={styles.passwordField}>
            <label>New Password</label>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                placeholder={`At least ${settings.passwordMinLength} characters`}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className={styles.passwordField}>
            <label>Confirm New Password</label>
            <div className={styles.passwordInputWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                placeholder="Confirm new password"
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className={styles.passwordActions}>
            <button
              className={styles.changePasswordButton}
              onClick={handleChangePassword}
              disabled={
                !passwordForm.currentPassword || !passwordForm.newPassword
              }>
              <FiLock /> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className={styles.settingsSection}>
      <h3 className={styles.sectionTitle}>
        <FiBell className={styles.sectionIcon} />
        Notification Settings
      </h3>

      <div className={styles.settingsGrid}>
        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "emailNotifications",
                  e.target.checked
                )
              }
            />
            <span>Email Notifications</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "smsNotifications",
                  e.target.checked
                )
              }
            />
            <span>SMS Notifications</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "pushNotifications",
                  e.target.checked
                )
              }
            />
            <span>Push Notifications</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.notifyNewLoans}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "notifyNewLoans",
                  e.target.checked
                )
              }
            />
            <span>Notify on New Loan Applications</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.notifyDuePayments}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "notifyDuePayments",
                  e.target.checked
                )
              }
            />
            <span>Notify on Due Payments</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.notifyDefaults}
              onChange={(e) =>
                handleSettingChange(
                  "notifications",
                  "notifyDefaults",
                  e.target.checked
                )
              }
            />
            <span>Notify on Loan Defaults</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderUserSettings = () => (
    <div className={styles.settingsSection}>
      <h3 className={styles.sectionTitle}>
        <FiUsers className={styles.sectionIcon} />
        User Management Settings
      </h3>

      <div className={styles.settingsGrid}>
        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.allowUserRegistration}
              onChange={(e) =>
                handleSettingChange(
                  "users",
                  "allowUserRegistration",
                  e.target.checked
                )
              }
            />
            <span>Allow User Registration</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.requireEmailVerification}
              onChange={(e) =>
                handleSettingChange(
                  "users",
                  "requireEmailVerification",
                  e.target.checked
                )
              }
            />
            <span>Require Email Verification</span>
          </label>
        </div>

        <div className={styles.settingItem}>
          <label>Default User Role</label>
          <select
            value={settings.defaultUserRole}
            onChange={(e) =>
              handleSettingChange("users", "defaultUserRole", e.target.value)
            }>
            <option value="user">User</option>
            <option value="borrower">Borrower</option>
            <option value="lender">Lender</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        <div className={styles.settingItem}>
          <label>Max Users Per Plan</label>
          <input
            type="number"
            min="1"
            max="10000"
            value={settings.maxUsersPerPlan}
            onChange={(e) =>
              handleSettingChange(
                "users",
                "maxUsersPerPlan",
                parseInt(e.target.value)
              )
            }
          />
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className={styles.settingsSection}>
      <h3 className={styles.sectionTitle}>
        <FiDatabase className={styles.sectionIcon} />
        System Settings
      </h3>

      <div className={styles.settingsGrid}>
        <div className={styles.settingItem}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) =>
                handleSettingChange(
                  "system",
                  "maintenanceMode",
                  e.target.checked
                )
              }
            />
            <span>Maintenance Mode</span>
          </label>
          <span className={styles.helperText}>
            When enabled, only admins can access the system
          </span>
        </div>

        <div className={styles.settingItem}>
          <label>Backup Frequency</label>
          <select
            value={settings.backupFrequency}
            onChange={(e) =>
              handleSettingChange("system", "backupFrequency", e.target.value)
            }>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div className={styles.settingItem}>
          <label>Log Retention (days)</label>
          <input
            type="number"
            min="1"
            max="365"
            value={settings.logRetention}
            onChange={(e) =>
              handleSettingChange(
                "system",
                "logRetention",
                parseInt(e.target.value)
              )
            }
          />
        </div>

        <div className={styles.settingItem}>
          <label>API Rate Limit</label>
          <input
            type="number"
            min="10"
            max="1000"
            value={settings.apiRateLimit}
            onChange={(e) =>
              handleSettingChange(
                "system",
                "apiRateLimit",
                parseInt(e.target.value)
              )
            }
          />
          <span className={styles.helperText}>
            {settings.apiRateLimit} requests per minute
          </span>
        </div>
      </div>

      <div className={styles.systemActions}>
        <div className={styles.actionGroup}>
          <button
            className={styles.actionButton}
            onClick={handleBackupNow}
            disabled={isLoading}>
            <FiDownload /> Backup Now
          </button>
          <span className={styles.actionDescription}>
            Create immediate database backup
          </span>
        </div>

        <div className={styles.actionGroup}>
          <button
            className={styles.actionButton}
            onClick={handleClearCache}
            disabled={isLoading}>
            <FiRefreshCw /> Clear Cache
          </button>
          <span className={styles.actionDescription}>
            Clear all system cache
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.adminSettings}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            <FiSettings /> Admin Settings
          </h1>
          <p className={styles.subtitle}>
            Configure system settings and preferences
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.saveButton}
            onClick={handleSaveSettings}
            disabled={isLoading}>
            {isLoading ? (
              <>
                <FiRefreshCw className={styles.spinner} /> Saving...
              </>
            ) : (
              <>
                <FiSave /> Save Settings
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              activeTab === tab.id ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab(tab.id)}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Settings Content */}
      <div className={styles.content}>
        {activeTab === "general" && renderGeneralSettings()}
        {activeTab === "security" && renderSecuritySettings()}
        {activeTab === "notifications" && renderNotificationSettings()}
        {activeTab === "users" && renderUserSettings()}
        {activeTab === "system" && renderSystemSettings()}
      </div>
    </div>
  );
}
