import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// User Pages
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import DashboardLayout from "./layout/DashboardLayout";
import Overview from "./pages/Overview";
import Evaluation from "./pages/Evaluation";
import Monitoring from "./pages/Monitoring";
import ProgressReport from "./pages/ProgressReport";
import WeeklyRemittance from "./pages/WeeklyRemittance";
import Proposal from "./pages/Proposal";
import Onboarding from "./pages/Onboarding";
import IndividualLoans from "./pages/IndividualLoans";
import ClusterLoans from "./pages/ClusterLoans";

// Admin Pages
import AdminLayout from "./layout/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEvaluation from "./pages/admin/AdminEvaluation";
// import AdminMonitoring from "./admin/AdminMonitoring";
// import AdminProgress from "./admin/AdminProgress";
// import AdminWeeklyRemittance from "./admin/AdminWeeklyRemittance";
// import AdminProposals from "./admin/AdminProposals";
// import AdminOnboarding from "./admin/AdminOnboarding";

import "./components/app.css";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Landing page with login/signup */}
        <Route
          path="/"
          element={
            <div className="tt-root">
              <div className="tt-bg-shapes" aria-hidden="true" />

              <main className="tt-center">
                <section className="tt-left-hero">
                  <div className="tt-hero-inner">
                    <svg
                      className="tt-logo"
                      width="56"
                      height="56"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden>
                      <path
                        d="M3 12c0-4.97 4.03-9 9-9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12c0 4.97-4.03 9-9 9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <h1 className="tt-hero-title">
                      Teerabs <span>Tracers</span>
                    </h1>
                    <p className="tt-hero-sub">
                      Teerabs Tracers application is one of the best tracker
                      systems in the world.
                    </p>
                  </div>
                </section>

                <aside className="tt-auth-card">
                  <div
                    key={isLogin ? "login" : "signup"}
                    style={{
                      transition: "opacity 0.5s ease, transform 0.5s ease",
                      opacity: 1,
                      transform: "translateY(0)",
                    }}>
                    {isLogin ? (
                      <Login
                        switchToSignup={() => setIsLogin(false)}
                        setAuth={setIsAuthenticated}
                      />
                    ) : (
                      <Signup
                        switchToLogin={() => setIsLogin(true)}
                        setAuth={setIsAuthenticated}
                      />
                    )}
                  </div>
                </aside>
              </main>

              <footer className="tt-footer">
                © {new Date().getFullYear()} Teerabs Tracers
              </footer>
            </div>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardLayout setAuth={setIsAuthenticated} />}>
          <Route index element={<Overview />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="monitoring" element={<Monitoring />} />
          <Route path="progress-report" element={<ProgressReport />} />
          <Route path="weekly-remittance" element={<WeeklyRemittance />} />
          <Route path="proposal" element={<Proposal />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="loans/individual" element={<IndividualLoans />} />
          <Route path="loans/cluster" element={<ClusterLoans />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="evaluation" element={<AdminEvaluation />} />
          {/* <Route path="monitoring" element={<AdminMonitoring />} />
          <Route path="progress" element={<AdminProgress />} />
          <Route path="remittance" element={<AdminWeeklyRemittance />} />
          <Route path="proposals" element={<AdminProposals />} />
          <Route path="onboarding" element={<AdminOnboarding />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}
