"use client";

export default function Loading() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .vr-loading-root {
          font-family: 'DM Sans', sans-serif;
          background: #1a0e08;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* grain */
        .vr-loading-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        /* glow */
        .vr-loading-root::after {
          content: '';
          position: fixed;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(200,169,110,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .vr-loading-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }

        /* Cup SVG */
        .vr-cup-wrap {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .vr-cup {
          animation: cupBreath 2.4s ease-in-out infinite;
        }

        /* Steam lines */
        .vr-steam {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .vr-steam-line {
          width: 2px;
          height: 22px;
          background: linear-gradient(to top, rgba(200,169,110,0.6), transparent);
          border-radius: 2px;
          animation: steamRise 1.8s ease-in-out infinite;
        }

        .vr-steam-line:nth-child(1) { animation-delay: 0s; }
        .vr-steam-line:nth-child(2) { animation-delay: 0.3s; height: 28px; }
        .vr-steam-line:nth-child(3) { animation-delay: 0.6s; }

        /* Text */
        .vr-loading-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          color: #c8a96e;
          letter-spacing: 0.05em;
          text-align: center;
        }

        .vr-loading-logo span {
          font-style: italic;
          color: #f5ead8;
        }

        /* Dot loader */
        .vr-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .vr-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c8a96e;
          opacity: 0.3;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        .vr-dot:nth-child(1) { animation-delay: 0s; }
        .vr-dot:nth-child(2) { animation-delay: 0.2s; }
        .vr-dot:nth-child(3) { animation-delay: 0.4s; }

        .vr-loading-label {
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a7560;
          margin-top: -1.5rem;
        }

        /* Progress bar */
        .vr-progress-track {
          width: 160px;
          height: 1px;
          background: rgba(200, 169, 110, 0.12);
          border-radius: 1px;
          overflow: hidden;
        }

        .vr-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, transparent, #c8a96e, transparent);
          border-radius: 1px;
          animation: progressSweep 1.8s ease-in-out infinite;
        }

        @keyframes cupBreath {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes steamRise {
          0% { transform: scaleY(0) translateY(0); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: scaleY(1.4) translateY(-8px); opacity: 0; }
        }

        @keyframes dotPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        @keyframes progressSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div className="vr-loading-root">
        <div className="vr-loading-inner">

          {/* Cup + Steam */}
          <div className="vr-cup-wrap">
            <div className="vr-steam">
              <div className="vr-steam-line" />
              <div className="vr-steam-line" />
              <div className="vr-steam-line" />
            </div>
            <svg
              className="vr-cup"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Saucer */}
              <ellipse cx="40" cy="68" rx="28" ry="5" fill="rgba(200,169,110,0.15)" />
              <ellipse cx="40" cy="67" rx="22" ry="3.5" fill="rgba(200,169,110,0.2)" />

              {/* Cup body */}
              <path
                d="M18 28 L22 62 Q22 66 28 66 L52 66 Q58 66 58 62 L62 28 Z"
                fill="rgba(45,26,14,0.9)"
                stroke="rgba(200,169,110,0.35)"
                strokeWidth="1.2"
              />

              {/* Rim */}
              <ellipse cx="40" cy="28" rx="22" ry="4" fill="rgba(45,26,14,0.9)" stroke="rgba(200,169,110,0.4)" strokeWidth="1.2" />

              {/* Coffee surface */}
              <ellipse cx="40" cy="28" rx="19" ry="3" fill="rgba(200,169,110,0.25)" />

              {/* Handle */}
              <path
                d="M58 36 Q72 36 72 46 Q72 56 58 56"
                fill="none"
                stroke="rgba(200,169,110,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Shine */}
              <path
                d="M24 35 Q26 32 30 33"
                fill="none"
                stroke="rgba(200,169,110,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Logo */}
          <div className="vr-loading-logo">
            Villa <span>Russo</span>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.85rem" }}>
            <div className="vr-dots">
              <div className="vr-dot" />
              <div className="vr-dot" />
              <div className="vr-dot" />
            </div>
            <div className="vr-loading-label">Preparing your workspace</div>
          </div>

          {/* Progress sweep */}
          <div className="vr-progress-track">
            <div className="vr-progress-fill" />
          </div>

        </div>
      </div>
    </>
  );
}