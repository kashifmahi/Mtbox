export const GeometricBackground = ({ variant = "circles", className = "" }) => {
  if (variant === "grid") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
          <g fill="none">
            {[90, 170, 250, 330, 410].map((r, i) => (
              <circle key={`a${r}`} cx="1250" cy="150" r={r} stroke={i % 2 === 0 ? "#C9A227" : "#00B8D9"} strokeOpacity={0.1 - i * 0.012} strokeWidth="1" />
            ))}
            {[110, 200, 290, 380].map((r, i) => (
              <circle key={`b${r}`} cx="180" cy="780" r={r} stroke={i % 2 === 0 ? "#00B8D9" : "#C9A227"} strokeOpacity={0.09 - i * 0.012} strokeWidth="1" />
            ))}
            {[70, 140, 210].map((r, i) => (
              <circle key={`c${r}`} cx="720" cy="450" r={r} stroke="#C9A227" strokeOpacity={0.07 - i * 0.015} strokeWidth="1" />
            ))}
            <circle cx="1250" cy="150" r="3" fill="#C9A227" fillOpacity="0.45" />
            <circle cx="180" cy="780" r="3" fill="#00B8D9" fillOpacity="0.45" />
            <circle cx="720" cy="450" r="2.5" fill="#C9A227" fillOpacity="0.35" />
          </g>
        </svg>
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
        <g fill="none">
          {[120, 220, 320, 420, 520, 640].map((r, i) => (
            <circle key={r} cx="1180" cy="220" r={r} stroke={i % 2 === 0 ? "#C9A227" : "#00B8D9"} strokeOpacity={0.14 - i * 0.015} strokeWidth="1" />
          ))}
          {[140, 260, 380, 500].map((r, i) => (
            <circle key={`b${r}`} cx="140" cy="820" r={r} stroke={i % 2 === 0 ? "#00B8D9" : "#C9A227"} strokeOpacity={0.11 - i * 0.02} strokeWidth="1" />
          ))}
          <line x1="0" y1="450" x2="1440" y2="380" stroke="#C9A227" strokeOpacity="0.08" />
          <line x1="0" y1="620" x2="1440" y2="720" stroke="#00B8D9" strokeOpacity="0.06" />
          <line x1="900" y1="0" x2="1100" y2="900" stroke="#C9A227" strokeOpacity="0.05" />
          <circle cx="1180" cy="220" r="4" fill="#C9A227" fillOpacity="0.5" />
          <circle cx="140" cy="820" r="3" fill="#00B8D9" fillOpacity="0.5" />
          <circle cx="620" cy="420" r="2.5" fill="#C9A227" fillOpacity="0.4" />
        </g>
      </svg>
    </div>
  );
};
