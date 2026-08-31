const lines = [
  { d: "M 0 640 C 400 620, 850 480, 1440 350", color: "#E81C2C" },
  { d: "M 0 675 C 400 655, 850 515, 1440 385", color: "#E81C2C" },
  { d: "M 0 710 C 400 690, 850 550, 1440 420", color: "#C9A227" },
  { d: "M 0 745 C 400 725, 850 585, 1440 455", color: "#C9A227" },
];

export const ScrollLines = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" data-testid="scroll-lines" aria-hidden="true">
    <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
      {lines.map((l, i) => (
        <g key={i}>
          <path d={l.d} fill="none" pathLength="1000" stroke={l.color} strokeWidth="1.5" opacity="0.25" />
          <path
            d={l.d}
            fill="none"
            pathLength="1000"
            className={`hero-line-glow hero-line-glow-${i}`}
            stroke={l.color}
            strokeWidth="2"
            opacity="0.9"
          />
        </g>
      ))}
    </svg>
  </div>
);
