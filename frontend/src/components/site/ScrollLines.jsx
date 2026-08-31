const paths = [
  { d: "M 0 620 C 300 560, 500 300, 800 280 S 1200 260, 1440 180", color: "#E81C2C", opacity: 0.6 },
  { d: "M 0 680 C 320 640, 520 380, 820 360 S 1220 340, 1440 260", color: "#E81C2C", opacity: 0.6 },
  { d: "M 0 740 C 340 720, 540 460, 840 440 S 1240 420, 1440 340", color: "#C9A227", opacity: 0.55 },
  { d: "M 0 800 C 360 790, 560 540, 860 520 S 1260 500, 1440 420", color: "#C9A227", opacity: 0.55 },
];

export const ScrollLines = () => (
  <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" data-testid="scroll-lines" aria-hidden="true">
    <svg className="w-full h-full" viewBox="0 0 1440 800" preserveAspectRatio="none" fill="none">
      {paths.map((p, i) => (
        <g key={i}>
          <path d={p.d} fill="none" stroke={p.color} strokeOpacity={p.opacity * 0.14} strokeWidth="7" style={{ filter: "blur(4px)" }} />
          <path
            d={p.d}
            fill="none"
            pathLength="1000"
            className={`flow-line flow-line-${i}`}
            stroke={p.color}
            strokeOpacity={p.opacity}
            strokeWidth="2"
          />
        </g>
      ))}
    </svg>
  </div>
);
