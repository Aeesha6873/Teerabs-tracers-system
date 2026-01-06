import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ switchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // For admin login
      const isAdmin =
        form.email === "admin@teerabs.com" && form.password === "admin123";
      if (isAdmin) {
        localStorage.setItem(
          "logged_in_user",
          JSON.stringify({
            email: form.email,
            role: "admin",
            isAdmin: true,
          })
        );
        navigate("/admin");
        return;
      }

      // Send login request to backend API
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = "Login failed";

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage =
            response.status === 401
              ? "Invalid email or password"
              : "Server error";
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (result.success) {
        // Store user data in localStorage
        const userData = {
          id: result.data._id,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          role: result.data.role,
          profile: result.data.profile,

          ...(result.data.bvn && { bvn: result.data.bvn }),
          ...(result.data.businessName && {
            businessName: result.data.businessName,
          }),
          ...(result.data.clusterName && {
            clusterName: result.data.clusterName,
          }),
        };

        localStorage.setItem("logged_in_user", JSON.stringify(userData));

        // Redirect based on role or other criteria
        if (result.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="tt-form-steps" onSubmit={handleSubmit} noValidate>
      <div className="tt-form-head">
        <h2>Login</h2>
        <p className="tt-form-note">
          Welcome back! Access your Teerabs Tracers dashboard.
        </p>
      </div>

      <label className="tt-label">
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

      <label className="tt-label tt-password">
        Password
        <div className="tt-password-wrap">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            className="tt-input"
            required
          />
          <button
            type="button"
            className="tt-toggle"
            title={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((s) => !s)}
            aria-pressed={showPassword}>
            {showPassword ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden>
                <path
                  d="M17.94 17.94A10 10 0 0112 20c-5 0-9.27-3.11-11-7.5A18.03 18.03 0 015.05 6.06"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1l22 22"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden>
                <path
                  d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
              </svg>
            )}
          </button>
        </div>
      </label>

      <div className="tt-row">
        <label className="tt-remember">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
        <a className="tt-forgot" href="#forgot">
          Forgot?
        </a>
      </div>

      <button className="tt-btn" type="submit" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="tt-switch">
        Don't have an account?{" "}
        <button type="button" onClick={switchToSignup} className="tt-link">
          Create one
        </button>
      </p>
    </form>
  );
}
