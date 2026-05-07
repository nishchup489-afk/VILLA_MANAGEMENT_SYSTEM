"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [showToast, setShowToast] = useState(false);

  const router = useRouter()

  const storeID = "villa2026@vr.com"
  const storePass = "405732"

  async function handleFirstLogin() {
  setError("");

  if (!email.trim() || !password) {
    setError("Please enter your email and password.");
    return;
  }

  if (email !== storeID) {
    setError("Invalid email or password");
    return;
  }

  if (password !== storePass) {
    setError("Password didn't match");
    return;
  }

  setLoading(true);

  // simulate auth
  

  router.push("/sign-in"); // not /sign-in bro

  setLoading(false);
}

  const roleIsManager =
    email.toLowerCase().includes("manager") ||
    email.toLowerCase().includes("admin");
  const roleIsStaff = !roleIsManager && email.includes("@");

  function triggerToast(msg: string) {
    setToast(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }

  async function handleLogin() {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // TODO: Replace this with Clerk signIn logic
    await new Promise(() => 
    router.push("/sign-in"));

    setLoading(false);
    setError("Clerk auth coming soon — this is a UI placeholder.");
    triggerToast("Clerk integration pending — UI ready");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .vr-root {
          font-family: 'DM Sans', sans-serif;
          background: #1a0e08;
          color: #f5ead8;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .vr-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        .vr-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem;
          border-bottom: 1px solid rgba(200, 169, 110, 0.15);
          background: rgba(26, 14, 8, 0.85);
          backdrop-filter: blur(12px);
        }

        .vr-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          letter-spacing: 0.05em;
          color: #c8a96e;
        }

        .vr-logo span {
          font-style: italic;
          color: #f5ead8;
        }

        .vr-nav-badge {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8a7560;
          border: 1px solid rgba(200, 169, 110, 0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 2rem;
        }

        .vr-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem 4rem;
          z-index: 1;
          text-align: center;
        }

        .vr-hero-inner { max-width: 680px; }

        .vr-eyebrow {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a96e;
          margin-bottom: 1.5rem;
          animation: fadeUp 0.7s ease 0.1s both;
        }

        .vr-eyebrow::before, .vr-eyebrow::after {
          content: '—';
          margin: 0 0.6em;
          opacity: 0.5;
        }

        .vr-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.8rem, 6vw, 4.5rem);
          font-weight: 400;
          line-height: 1.1;
          color: #f5ead8;
          margin-bottom: 0.4rem;
          animation: fadeUp 0.8s ease 0.25s both;
        }

        .vr-h1 em {
          font-style: italic;
          color: #c8a96e;
        }

        .vr-subtitle {
          font-size: 1rem;
          font-weight: 300;
          color: #8a7560;
          margin-top: 1.25rem;
          margin-bottom: 2.75rem;
          line-height: 1.6;
          animation: fadeUp 0.8s ease 0.4s both;
        }

        .vr-card {
          background: rgba(45, 26, 14, 0.7);
          border: 1px solid rgba(200, 169, 110, 0.18);
          border-radius: 16px;
          padding: 2.5rem 2.25rem;
          max-width: 380px;
          margin: 0 auto;
          backdrop-filter: blur(20px);
          animation: fadeUp 0.9s ease 0.55s both;
        }

        .vr-card-label {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8a7560;
          margin-bottom: 1.5rem;
        }

        .vr-input-group { margin-bottom: 1rem; }

        .vr-input-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          color: #8a7560;
          margin-bottom: 0.4rem;
          letter-spacing: 0.04em;
        }

        .vr-input-group input {
          width: 100%;
          padding: 0.75rem 1rem;
          background: rgba(26, 14, 8, 0.6);
          border: 1px solid rgba(200, 169, 110, 0.2);
          border-radius: 8px;
          color: #f5ead8;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.2s;
        }

        .vr-input-group input::placeholder { color: rgba(138, 117, 96, 0.5); }
        .vr-input-group input:focus { border-color: rgba(200, 169, 110, 0.5); }

        .vr-error {
          font-size: 0.78rem;
          color: #e07060;
          margin-top: 0.6rem;
          text-align: left;
        }

        .vr-btn {
          width: 100%;
          margin-top: 1.5rem;
          padding: 0.85rem;
          background: #c8a96e;
          color: #1a0e08;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
        }

        .vr-btn:hover { background: #d4b87a; }
        .vr-btn:active { transform: scale(0.99); }
        .vr-btn:disabled { pointer-events: none; }

        .vr-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(26,14,8,0.2);
          border-top-color: #1a0e08;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        .vr-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 1.5rem 0;
          color: rgba(138, 117, 96, 0.4);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }

        .vr-divider::before, .vr-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(200, 169, 110, 0.12);
        }

        .vr-role-hint {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .vr-pill {
          font-size: 0.72rem;
          font-weight: 400;
          color: #8a7560;
          border: 1px solid rgba(200, 169, 110, 0.15);
          border-radius: 2rem;
          padding: 0.25rem 0.75rem;
        }

        .vr-pill-active {
          border-color: rgba(200, 169, 110, 0.4);
          color: #c8a96e;
          background: rgba(200, 169, 110, 0.08);
        }

        .vr-features {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          gap: 2.5rem;
          flex-wrap: wrap;
          padding: 2.5rem 2rem 3.5rem;
          border-top: 1px solid rgba(200, 169, 110, 0.08);
          animation: fadeUp 0.9s ease 0.75s both;
        }

        .vr-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 300;
          color: #8a7560;
          letter-spacing: 0.03em;
        }

        .vr-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #c8a96e;
          opacity: 0.5;
          flex-shrink: 0;
        }

        .vr-toast {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%) translateY(80px);
          background: rgba(45, 26, 14, 0.95);
          border: 1px solid rgba(200, 169, 110, 0.3);
          border-radius: 8px;
          padding: 0.85rem 1.5rem;
          font-size: 0.85rem;
          color: #f5ead8;
          backdrop-filter: blur(12px);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 200;
          white-space: nowrap;
        }

        .vr-toast-show {
          transform: translateX(-50%) translateY(0);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="vr-root">
        {/* Nav */}
        <nav className="vr-nav">
          <div className="vr-logo">
            Villa <span>Russo</span>
          </div>
          <div className="vr-nav-badge">Staff Portal</div>
        </nav>

        {/* Hero */}
        <section className="vr-hero">
          <div className="vr-hero-inner">
            <div className="vr-eyebrow">Internal Access Only</div>
            <h1 className="vr-h1">
              Welcome to
              <br />
              <em>Villa Russo</em>
            </h1>
            <p className="vr-subtitle">
              Operations management for the team.
              <br />
              Orders, inventory, prep, and more — all in one place.
            </p>

            {/* Login Card */}
            <div className="vr-card">
              <div className="vr-card-label">Sign in to continue</div>

              <div className="vr-input-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@villarusso.com"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="vr-input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                {error && <div className="vr-error">{error}</div>}
              </div>

              <button
                className="vr-btn"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <span className="vr-spinner" />
                ) : (
                  "Sign in"
                )}
              </button>

              <div className="vr-divider">access level</div>

              <div className="vr-role-hint">
                <div className={`vr-pill ${roleIsManager ? "vr-pill-active" : ""}`}>
                  Manager
                </div>
                <div className={`vr-pill ${roleIsStaff ? "vr-pill-active" : ""}`}>
                  Staff
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Strip */}
        <div className="vr-features">
          {[
            "Register & Orders",
            "Inventory Tracking",
            "Prep Tasks",
            "Waste Log",
            "Attendance",
            "Dashboard KPIs",
          ].map((f) => (
            <div className="vr-feature" key={f}>
              <span className="vr-dot" />
              {f}
            </div>
          ))}
        </div>

        {/* Toast */}
        <div className={`vr-toast ${showToast ? "vr-toast-show" : ""}`}>
          {toast}
        </div>
      </div>
    </>
  );
}