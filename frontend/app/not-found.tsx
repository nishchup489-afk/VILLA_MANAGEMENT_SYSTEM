import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .vr-404-root {
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
          text-align: center;
        }

        /* grain */
        .vr-404-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        /* glow */
        .vr-404-root::after {
          content: '';
          position: fixed;
          bottom: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(200,169,110,0.05) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .vr-404-inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          max-width: 480px;
          animation: fadeUp 0.8s ease both;
        }

        /* Big 404 */
        .vr-404-number {
          font-family: 'Playfair Display', serif;
          font-size: clamp(6rem, 18vw, 10rem);
          font-weight: 600;
          color: transparent;
          -webkit-text-stroke: 1px rgba(200, 169, 110, 0.25);
          line-height: 1;
          letter-spacing: -0.02em;
          user-select: none;
          position: relative;
        }

        /* Spilled cup overlay on 404 */
        .vr-spill-wrap {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
        }

        .vr-404-divider {
          width: 40px;
          height: 1px;
          background: rgba(200, 169, 110, 0.25);
        }

        .vr-404-eyebrow {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #c8a96e;
        }

        .vr-404-eyebrow::before, .vr-404-eyebrow::after {
          content: '—';
          margin: 0 0.6em;
          opacity: 0.5;
        }

        .vr-404-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 400;
          color: #f5ead8;
          line-height: 1.2;
        }

        .vr-404-title em {
          font-style: italic;
          color: #c8a96e;
        }

        .vr-404-body {
          font-size: 0.9rem;
          font-weight: 300;
          color: #8a7560;
          line-height: 1.7;
          max-width: 340px;
        }

        .vr-404-actions {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .vr-btn-primary {
          padding: 0.75rem 1.75rem;
          background: #c8a96e;
          color: #1a0e08;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          display: inline-block;
        }

        .vr-btn-primary:hover { background: #d4b87a; }

        .vr-btn-ghost {
          padding: 0.75rem 1.75rem;
          background: transparent;
          color: #8a7560;
          border: 1px solid rgba(200, 169, 110, 0.2);
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
          display: inline-block;
        }

        .vr-btn-ghost:hover {
          border-color: rgba(200, 169, 110, 0.4);
          color: #c8a96e;
        }

        /* Spilled coffee SVG animation */
        .vr-spill-svg {
          animation: spillWobble 3s ease-in-out infinite;
          opacity: 0.7;
        }

        .vr-steam-404 {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-bottom: 4px;
        }

        .vr-steam-404-line {
          width: 2px;
          height: 16px;
          background: linear-gradient(to top, rgba(200,169,110,0.5), transparent);
          border-radius: 2px;
          animation: steamRise404 2s ease-in-out infinite;
        }

        .vr-steam-404-line:nth-child(1) { animation-delay: 0s; }
        .vr-steam-404-line:nth-child(2) { animation-delay: 0.35s; height: 22px; }
        .vr-steam-404-line:nth-child(3) { animation-delay: 0.7s; }

        .vr-404-logo {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          color: #c8a96e;
          letter-spacing: 0.05em;
          z-index: 10;
          text-decoration: none;
        }

        .vr-404-logo span { font-style: italic; color: #f5ead8; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes spillWobble {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }

        @keyframes steamRise404 {
          0% { transform: scaleY(0) translateY(0); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: scaleY(1.3) translateY(-6px); opacity: 0; }
        }
      `}</style>

      <div className="vr-404-root">

        <Link href="/" className="vr-404-logo">
          Villa <span>Russo</span>
        </Link>

        <div className="vr-404-inner">

          {/* Spilled cup illustration */}
          <div style={{ position: "relative" }}>
            <div className="vr-steam-404">
              <div className="vr-steam-404-line" />
              <div className="vr-steam-404-line" />
              <div className="vr-steam-404-line" />
            </div>
            <svg
              className="vr-spill-svg"
              width="110"
              height="90"
              viewBox="0 0 110 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Spilled puddle */}
              <ellipse cx="52" cy="78" rx="42" ry="10" fill="rgba(200,169,110,0.12)" />
              <ellipse cx="48" cy="76" rx="32" ry="7" fill="rgba(200,169,110,0.15)" />

              {/* Tipped cup */}
              <g transform="rotate(-45 55 55)">
                {/* Cup body */}
                <path
                  d="M30 30 L33 58 Q33 62 38 62 L56 62 Q61 62 61 58 L64 30 Z"
                  fill="rgba(45,26,14,0.95)"
                  stroke="rgba(200,169,110,0.4)"
                  strokeWidth="1.2"
                />
                {/* Rim */}
                <ellipse cx="47" cy="30" rx="17" ry="3.5" fill="rgba(45,26,14,0.95)" stroke="rgba(200,169,110,0.4)" strokeWidth="1.2" />
                {/* Coffee pouring out */}
                <ellipse cx="47" cy="30" rx="14" ry="2.5" fill="rgba(200,169,110,0.3)" />
                {/* Handle */}
                <path
                  d="M61 38 Q73 38 73 46 Q73 54 61 54"
                  fill="none"
                  stroke="rgba(200,169,110,0.4)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>

              {/* Drip drops */}
              <circle cx="30" cy="65" r="3" fill="rgba(200,169,110,0.2)" />
              <circle cx="20" cy="72" r="2" fill="rgba(200,169,110,0.15)" />
              <circle cx="75" cy="68" r="2.5" fill="rgba(200,169,110,0.18)" />
            </svg>
          </div>

          <div className="vr-404-eyebrow">Page not found</div>

          <h1 className="vr-404-title">
            Looks like this table<br />
            <em>doesn't exist.</em>
          </h1>

          <p className="vr-404-body">
            The page you're looking for may have been moved, renamed,
            or never opened for service. Let's get you back to the kitchen.
          </p>

          <div className="vr-404-actions">
            <Link href="/dashboard" className="vr-btn-primary">
              Back to Dashboard
            </Link>
            <Link href="/" className="vr-btn-ghost">
              Go Home
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}