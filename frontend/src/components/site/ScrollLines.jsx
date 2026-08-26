import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const LINE_H = 5200;

const paths = [
  {
    d: `M 1100 0 C 400 700, 1500 1300, 800 2000 C 200 2600, 1400 3200, 700 3900 C 300 4400, 1200 4800, 900 ${LINE_H}`,
    stroke: "#C9A227",
    opacity: 0.28,
    width: 1.5,
    range: [-400, -2200],
  },
  {
    d: `M 500 0 C 1300 600, 100 1400, 1000 2100 C 1600 2700, 500 3300, 1200 4000 C 1700 4500, 800 4900, 1100 ${LINE_H}`,
    stroke: "#00B8D9",
    opacity: 0.2,
    width: 1.2,
    range: [-200, -2900],
  },
  {
    d: `M 1550 0 C 900 900, 1750 1700, 1150 2500 C 700 3100, 1650 3700, 1050 4400 C 750 4800, 1450 5000, 1250 ${LINE_H}`,
    stroke: "#1557B0",
    opacity: 0.3,
    width: 1.8,
    range: [-600, -1500],
  },
];

const Line = ({ p, progress }) => {
  const y = useTransform(progress, [0, 1], p.range);
  return (
    <motion.svg
      style={{ y }}
      className="absolute left-0 top-0 w-full"
      height={LINE_H}
      viewBox={`0 0 1920 ${LINE_H}`}
      preserveAspectRatio="xMidYMin slice"
      fill="none"
    >
      <path d={p.d} stroke={p.stroke} strokeOpacity={p.opacity} strokeWidth={p.width} />
      <path d={p.d} stroke={p.stroke} strokeOpacity={p.opacity * 0.35} strokeWidth={p.width * 5} style={{ filter: "blur(6px)" }} />
    </motion.svg>
  );
};

export const ScrollLines = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: 0.4 });

  return (
    <div className="fixed inset-0 z-[40] pointer-events-none overflow-hidden" data-testid="scroll-lines" aria-hidden="true">
      {paths.map((p, i) => (
        <Line key={i} p={p} progress={smooth} />
      ))}
    </div>
  );
};
