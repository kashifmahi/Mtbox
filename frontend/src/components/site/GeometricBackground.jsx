export const GeometricBackground = ({ variant = "circles", className = "" }) => {
  if (variant === "grid") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
        <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
          {[...Array(13)].map((_, i) => (
            <line key={`v${i}`} x1={i * 120} y1="0" x2={i * 120} y2="900" stroke="#C9A227" strokeOpacity="0.07" strokeWidth="1" />
          ))}
          {[...Array(9)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 120} x2="1440" y2={i * 120} stroke="#00B8D9" strokeOpacity="0.05" strokeWidth="1" />
          ))}
          <circle cx="1200" cy="180" r="140" fill="none" stroke="#C9A227" strokeOpacity="0.12" />
          <circle cx="240" cy="720" r="180" fill="none" stroke="#00B8D9" strokeOpacity="0.08" />
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
