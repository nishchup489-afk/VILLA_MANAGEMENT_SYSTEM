import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .vr-signin-root {
          font-family: 'DM Sans', sans-serif;
          background: #1a0e08;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* grain */
        .vr-signin-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        /* glow blob */
        .vr-signin-root::after {
          content: '';
          position: fixed;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .vr-signin-header {
          text-align: center;
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.7s ease both;
        }

        .vr-signin-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #c8a96e;
          letter-spacing: 0.05em;
          margin-bottom: 0.4rem;
        }

        .vr-signin-logo span {
          font-style: italic;
          color: #f5ead8;
        }

        .vr-signin-sub {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8a7560;
        }

        /* Clerk component wrapper */
        .vr-clerk-wrap {
          position: relative;
          z-index: 1;
          animation: fadeUp 0.85s ease 0.15s both;
        }

        /* Override Clerk card */
        .vr-clerk-wrap .cl-card {
          background: rgba(45, 26, 14, 0.75) !important;
          border: 1px solid rgba(200, 169, 110, 0.18) !important;
          border-radius: 16px !important;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5) !important;
          backdrop-filter: blur(20px) !important;
        }

        .vr-clerk-wrap .cl-headerTitle {
          font-family: 'Playfair Display', serif !important;
          color: #f5ead8 !important;
          font-size: 1.4rem !important;
          font-weight: 400 !important;
        }

        .vr-clerk-wrap .cl-headerSubtitle {
          color: #8a7560 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 300 !important;
        }

        .vr-clerk-wrap .cl-formFieldLabel {
          color: #8a7560 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.78rem !important;
          font-weight: 500 !important;
          letter-spacing: 0.04em !important;
        }

        .vr-clerk-wrap .cl-formFieldInput {
          background: rgba(26, 14, 8, 0.6) !important;
          border: 1px solid rgba(200, 169, 110, 0.2) !important;
          border-radius: 8px !important;
          color: #f5ead8 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 300 !important;
        }

        .vr-clerk-wrap .cl-formFieldInput:focus {
          border-color: rgba(200, 169, 110, 0.5) !important;
          box-shadow: 0 0 0 2px rgba(200, 169, 110, 0.1) !important;
        }

        .vr-clerk-wrap .cl-formButtonPrimary {
          background: #c8a96e !important;
          color: #1a0e08 !important;
          font-family: 'DM Sans', sans-serif !important;
          font-weight: 500 !important;
          letter-spacing: 0.06em !important;
          border-radius: 8px !important;
          box-shadow: none !important;
          transition: background 0.2s !important;
        }

        .vr-clerk-wrap .cl-formButtonPrimary:hover {
          background: #d4b87a !important;
        }

        .vr-clerk-wrap .cl-footerActionLink {
          color: #c8a96e !important;
        }

        .vr-clerk-wrap .cl-footerActionText {
          color: #8a7560 !important;
        }

        .vr-clerk-wrap .cl-dividerLine {
          background: rgba(200, 169, 110, 0.12) !important;
        }

        .vr-clerk-wrap .cl-dividerText {
          color: #8a7560 !important;
          font-size: 0.75rem !important;
          letter-spacing: 0.1em !important;
        }

        .vr-clerk-wrap .cl-socialButtonsBlockButton {
          background: rgba(26, 14, 8, 0.5) !important;
          border: 1px solid rgba(200, 169, 110, 0.15) !important;
          color: #f5ead8 !important;
          border-radius: 8px !important;
        }

        .vr-clerk-wrap .cl-socialButtonsBlockButton:hover {
          border-color: rgba(200, 169, 110, 0.35) !important;
          background: rgba(26, 14, 8, 0.7) !important;
        }

        .vr-clerk-wrap .cl-socialButtonsBlockButtonText {
          color: #f5ead8 !important;
          font-family: 'DM Sans', sans-serif !important;
        }

        .vr-clerk-wrap .cl-identityPreview {
          background: rgba(26, 14, 8, 0.5) !important;
          border: 1px solid rgba(200, 169, 110, 0.15) !important;
          border-radius: 8px !important;
        }

        .vr-clerk-wrap .cl-identityPreviewText {
          color: #f5ead8 !important;
        }

        .vr-clerk-wrap .cl-identityPreviewEditButton {
          color: #c8a96e !important;
        }

        .vr-clerk-wrap .cl-formFieldInputShowPasswordButton {
          color: #8a7560 !important;
        }

        .vr-clerk-wrap .cl-internal-b3fm6y {
          display: none !important;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="vr-signin-root">
        <div className="vr-signin-header">
          <div className="vr-signin-logo">Villa <span>Russo</span></div>
          <div className="vr-signin-sub">Staff Portal</div>
        </div>

        <div className="vr-clerk-wrap">
            <SignIn forceRedirectUrl="/dashboard" />
        </div>
      </div>
    </>
  );
}