import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { states, lgas } from "../data/nigeriaData";

export default function Signup({ switchToLogin }) {
  const navigate = useNavigate();

  // Leader (common) steps
  const leaderSteps = 4;

  const [registrationType, setRegistrationType] = useState("individual");
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    registrationType: "individual",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    state: "",
    lga: "",
    bvn: "",
    nin: "",
    businessName: "",
    proposal: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    clusterName: "",
    members: [],
  });

  /** --------------------- Step Navigation --------------------- **/

  const totalSteps =
    registrationType === "cluster"
      ? leaderSteps + form.members.length
      : leaderSteps;

  const nextStep = (e) => {
    e.preventDefault();
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    if (step > 1) setStep((s) => s - 1);
  };

  /** --------------------- Form Handlers --------------------- **/

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegistrationTypeChange = (e) => {
    const type = e.target.value;
    setRegistrationType(type);
    // Reset members if switching back to individual, or start with 1 for cluster
    setForm({
      ...form,
      registrationType: type,
      members:
        type === "cluster"
          ? [{ fullName: "", email: "", phone: "", nin: "" }]
          : [],
    });
    setStep(1);
  };

  // NEW: Handler for the number of cluster members
  const handleClusterSizeChange = (e) => {
    const size = parseInt(e.target.value) || 0;
    const currentMembers = [...form.members];

    let updatedMembers;
    if (size > currentMembers.length) {
      // Add empty member objects if size increased
      const extra = Array(size - currentMembers.length).fill({
        fullName: "",
        email: "",
        phone: "",
        nin: "",
      });
      updatedMembers = [...currentMembers, ...extra];
    } else {
      // Remove members if size decreased
      updatedMembers = currentMembers.slice(0, size);
    }

    setForm({ ...form, members: updatedMembers });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...form.members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setForm({ ...form, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setSubmitting(true);

    // ✅ ADDED: Controller for fetch timeout
    const controller = new AbortController();

    try {
      const userData = {
        firstName: form.fullName.split(" ")[0] || form.fullName,
        lastName: form.fullName.split(" ").slice(1).join(" ") || "User",
        email: form.email,
        password: form.password,
        role: "user",
        accountType: registrationType,
        profile: {
          phone: form.phone,
          address: `${form.lga}, ${form.state}, Nigeria`,
        },
        bvn: form.bvn,
        nin: form.nin,
        state: form.state,
        lga: form.lga,
        businessName: form.businessName,
        proposal: form.proposal,
        bankDetails: {
          bankName: form.bankName,
          accountName: form.accountName,
          accountNumber: form.accountNumber,
        },
      };

      if (registrationType === "cluster") {
        userData.clusterName = form.clusterName;
        userData.clusterSize = form.members.length;
        userData.clusterMembers = form.members.map((m) => ({
          firstName: m.fullName.split(" ")[0] || m.fullName,
          lastName: m.fullName.split(" ").slice(1).join(" ") || "Member",
          email: m.email,
          phone: m.phone,
          nin: m.nin,
        }));
      }

      // ✅ ADDED: Timeout to prevent hanging requests
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        signal: controller.signal, // ✅ Now controller is defined
      });

      // ✅ ADDED: Clear the timeout
      clearTimeout(timeoutId);

      const result = await response.json();

      if (response.ok && result.success) {
        alert("Registration successful!");
        switchToLogin ? switchToLogin() : navigate("/login");
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (err) {
      // ✅ IMPROVED: Better error handling
      console.error("Registration error:", err);

      if (err.name === "AbortError") {
        alert(
          "Request timed out. Please check if the backend server is running."
        );
      } else if (err.message.includes("Failed to fetch")) {
        alert(
          "Cannot connect to server. Please ensure:\n1. Backend is running on port 5000\n2. You have CORS enabled\n3. The /api/users endpoint exists"
        );
      } else {
        alert(err.message || "An error occurred");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /** --------------------- Render Steps --------------------- **/

  const renderLeaderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label>Registration Type</label>
            <select
              value={registrationType}
              onChange={handleRegistrationTypeChange}
              className="tt-input tt-input-select">
              <option value="individual">Individual</option>
              <option value="cluster">Cluster</option>
            </select>

            {registrationType === "cluster" && (
              <>
                <label>Cluster Name</label>
                <input
                  name="clusterName"
                  value={form.clusterName}
                  onChange={handleChange}
                  className="tt-input"
                />

                <label>Number of Cluster Members</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={form.members.length}
                  onChange={handleClusterSizeChange}
                  className="tt-input"
                  placeholder="Enter number of members"
                />
              </>
            )}

            <label>Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="tt-input"
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="tt-input"
            />
            <label>Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="tt-input"
            />
          </>
        );
      case 2:
        return (
          <>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="tt-input"
            />
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="tt-input"
            />
            <label>State</label>
            <select
              name="state"
              value={form.state}
              onChange={(e) =>
                setForm({ ...form, state: e.target.value, lga: "" })
              }
              className="tt-input tt-input-select">
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <label>LGA</label>
            <select
              name="lga"
              value={form.lga}
              onChange={handleChange}
              className="tt-input tt-input-select">
              <option value="">Select LGA</option>
              {form.state &&
                lgas[form.state]?.map((l) => <option key={l}>{l}</option>)}
            </select>
          </>
        );
      case 3:
        return (
          <>
            <label>
              BVN{" "}
              <input
                name="bvn"
                value={form.bvn}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
            <label>
              NIN{" "}
              <input
                name="nin"
                value={form.nin}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
            <label>
              Business Name{" "}
              <input
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
            <label>
              Proposal{" "}
              <textarea
                name="proposal"
                value={form.proposal}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
          </>
        );
      case 4:
        return (
          <>
            <label>
              Bank Name{" "}
              <input
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
            <label>
              Account Name{" "}
              <input
                name="accountName"
                value={form.accountName}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
            <label>
              Account Number{" "}
              <input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                className="tt-input"
              />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  const renderMemberStep = () => {
    const index = step - leaderSteps - 1;
    const member = form.members[index];
    if (!member) return null;

    return (
      <>
        <h3>
          Cluster Member {index + 1} of {form.members.length}
        </h3>
        <label>
          Full Name{" "}
          <input
            name="fullName"
            value={member.fullName}
            onChange={(e) => handleMemberChange(index, e)}
            className="tt-input"
          />
        </label>
        <label>
          Email{" "}
          <input
            name="email"
            value={member.email}
            onChange={(e) => handleMemberChange(index, e)}
            className="tt-input"
          />
        </label>
        <label>
          Phone{" "}
          <input
            name="phone"
            value={member.phone}
            onChange={(e) => handleMemberChange(index, e)}
            className="tt-input"
          />
        </label>
        <label>
          NIN{" "}
          <input
            name="nin"
            value={member.nin}
            onChange={(e) => handleMemberChange(index, e)}
            className="tt-input"
          />
        </label>
      </>
    );
  };

  return (
    <form className="tt-form-steps" onSubmit={handleSubmit}>
      <div className="tt-progress">
        <div
          className="tt-progress-bar"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {step <= leaderSteps ? renderLeaderStep() : renderMemberStep()}

      <div className="tt-step-buttons">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="tt-btn">
            Back
          </button>
        )}

        {step < totalSteps ? (
          <button type="button" onClick={nextStep} className="tt-btn">
            Next
          </button>
        ) : (
          <button type="submit" className="tt-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
        )}
      </div>

      <p className="tt-switch">
        Already registered?{" "}
        <button type="button" onClick={switchToLogin} className="tt-link">
          Sign in
        </button>
      </p>
    </form>
  );
}
