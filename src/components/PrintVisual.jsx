// Signature element: a habitat cross-section rendered as if mid-print,
// layers rising in sequence with a scanning printhead line.
export default function PrintVisual({ className = "" }) {
  const layers = [
    { y: 210, w: 210, x: 45 },
    { y: 190, w: 230, x: 35 },
    { y: 170, w: 246, x: 27 },
    { y: 150, w: 258, x: 21 },
    { y: 130, w: 264, x: 18 },
    { y: 110, w: 264, x: 18 },
    { y: 90, w: 256, x: 22 },
    { y: 70, w: 236, x: 32 },
    { y: 52, w: 200, x: 50 },
    { y: 38, w: 150, x: 75 },
  ];

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 300 260"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Cross-section of a habitat dome being additively printed in rust-colored regolith layers"
      >
        <defs>
          <linearGradient id="layerFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D9633B" />
            <stop offset="100%" stopColor="#8F2F19" />
          </linearGradient>
          <linearGradient id="groundFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#282C37" />
            <stop offset="100%" stopColor="#14161C" />
          </linearGradient>
        </defs>

        {/* ground */}
        <rect x="0" y="228" width="300" height="10" fill="url(#groundFill)" />
        <line x1="0" y1="228" x2="300" y2="228" stroke="#3A3F4D" strokeWidth="1" />

        {/* printed layers, staggered */}
        {layers.map((l, i) => (
          <rect
            key={i}
            x={l.x}
            y={l.y}
            width={l.w}
            height="20"
            rx="2"
            fill="url(#layerFill)"
            stroke="#6E2412"
            strokeWidth="0.5"
            style={{
              transformOrigin: `150px ${l.y + 20}px`,
              animation: "printrise 0.6s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}

        {/* interior glow line at habitat floor */}
        <line
          x1="60"
          y1="228"
          x2="240"
          y2="228"
          stroke="#7FE7E0"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* printhead gantry */}
        <g style={{ animation: "drift 9s ease-in-out infinite" }}>
          <line x1="0" y1="30" x2="300" y2="30" stroke="#4CC9C1" strokeWidth="1" opacity="0.35" />
          <circle cx="150" cy="30" r="3" fill="#7FE7E0" />
        </g>

        {/* scan sweep, clipped to habitat bounds */}
        <clipPath id="clip">
          <path d="M20 228 L20 60 Q150 20 280 60 L280 228 Z" />
        </clipPath>
        <rect
          x="0"
          y="0"
          width="300"
          height="60"
          fill="#7FE7E0"
          opacity="0.08"
          clipPath="url(#clip)"
          style={{ animation: "scan 3.2s linear infinite" }}
        />

        {/* outline */}
        <path
          d="M20 228 L20 60 Q150 20 280 60 L280 228"
          fill="none"
          stroke="#AEB4BD"
          strokeWidth="1"
          opacity="0.25"
        />
      </svg>

      <div className="absolute -bottom-2 left-0 right-0 flex justify-between font-mono text-[10px] tracking-wide text-titanium-500">
        <span>UNIT_04 // ELYSIUM</span>
        <span className="text-printline-400">PRINTING — LAYER 214/240</span>
      </div>
    </div>
  );
}
