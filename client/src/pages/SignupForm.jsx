import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { states, lgas } from "../data/nigeriaData";

// import "./SignupForm.css";

export default function Signup({ switchToLogin }) {
  const [registrationType, setRegistrationType] = useState("individual");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const totalSteps = registrationType === "individual" ? 4 : 5;

  const [form, setForm] = useState({
    accountType: "individual",
    fullName: "",
    email: "",
    phone: "",
    bvn: "",
    nin: "",
    state: "",
    lga: "",

    businessName: "",
    proposal: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    clusterName: "",
    numberOfMembers: 1,
    password: "",
    confirmPassword: "",
    members: [
      {
        fullName: "",
        email: "",
        phone: "",
        bvn: "",
        nin: "",
        state: "",
        lga: "",

        accountNumber: "",
        accountName: "",
        bankName: "",
      },
    ],
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, e) => {
    const updatedMembers = [...form.members];
    updatedMembers[index][e.target.name] = e.target.value;
    setForm({ ...form, members: updatedMembers });
  };

  const addMember = () => {
    setForm({
      ...form,
      members: [
        ...form.members,
        {
          fullName: "",
          email: "",
          phone: "",
          bvn: "",
          nin: "",
          state: "",
          lga: "",
          accountNumber: "",
          accountName: "",
          bankName: "",
        },
      ],
    });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (registrationType === "cluster") {
      form.clusterSize = form.members.length;
      form.clusterLeader = form.fullName;
      form.savingsVerified = false;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);

      localStorage.setItem("teerabs_user", JSON.stringify(form));

      alert("Registration successful! Please log in to continue.");
      navigate("/");
    }, 800);
  };

  return (
    <form className="tt-form-steps" onSubmit={handleSubmit}>
      <div className="tt-progress">
        <div
          className="tt-progress-bar"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div className="tt-step">
          <label>
            Registration Type
            <select
              name="registrationType"
              value={registrationType}
              onChange={(e) => {
                setRegistrationType(e.target.value);
                setForm({ ...form, accountType: e.target.value });
                setStep(1);
              }}
              className="tt-input tt-input-select">
              <option value="individual">Individual</option>
              <option value="cluster">Cluster</option>
            </select>
          </label>

          {registrationType === "cluster" && (
            <label>
              Cluster Name
              <input
                name="clusterName"
                value={form.clusterName}
                onChange={handleChange}
                className="tt-input"
                required
              />
            </label>
          )}

          <label>
            Full Name
            <input
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            State
            <select
              name="state"
              value={form.state}
              onChange={(e) => {
                setForm({ ...form, state: e.target.value, lga: "" });
              }}
              className="tt-input tt-input-select"
              required>
              <option value="">Select State</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </label>

          <label>
            LGA
            <select
              name="lga"
              value={form.lga}
              onChange={handleChange}
              className="tt-input tt-input-select"
              required
              disabled={!form.state}>
              <option value="">Select LGA</option>

              {form.state &&
                lgas[form.state]?.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>

          <label>
            Confirm Password
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
        </div>
      )}

      {step === 2 && (
        <div className="tt-step">
          <label>
            BVN
            <input
              name="bvn"
              type="text"
              value={form.bvn}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            NIN
            <input
              name="nin"
              type="text"
              value={form.nin}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="tt-step">
          <label>
            Business Name
            <input
              name="businessName"
              type="text"
              value={form.businessName}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            Business Proposal
            <textarea
              name="proposal"
              value={form.proposal}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
        </div>
      )}

      {step === 4 && (
        <div className="tt-step">
          <label>
            Bank Name
            <input
              name="bankName"
              type="text"
              value={form.bankName}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            Account Name
            <input
              name="accountName"
              type="text"
              value={form.accountName}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
          <label>
            Account Number
            <input
              name="accountNumber"
              type="text"
              value={form.accountNumber}
              onChange={handleChange}
              className="tt-input"
              required
            />
          </label>
        </div>
      )}

      {registrationType === "cluster" && step === 5 && (
        <div className="tt-step">
          {form.members.map((member, index) => (
            <fieldset key={index} className="tt-fieldset">
              <legend>Member {index + 1}</legend>
              <label>
                Full Name
                <input
                  name="fullName"
                  value={member.fullName}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="tt-input"
                  required
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  value={member.email}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="tt-input"
                  required
                />
              </label>
              <label>
                Phone
                <input
                  name="phone"
                  value={member.phone}
                  onChange={(e) => handleMemberChange(index, e)}
                  className="tt-input"
                  required
                />
              </label>
              <button type="button" className="tt-btn" onClick={addMember}>
                Add Member
              </button>
            </fieldset>
          ))}
        </div>
      )}

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
            {submitting ? "Submitting..." : "Submit"}
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
