import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const H = 2600;

const genPath = (x0) => {
  let d = `M ${x0} 0`;
  let y = 0;
  let x = x0;
  let dir = -1;
  while (y < H) {
    y += 380;
    d += ` V ${y}`;
    x += dir * 220;
    y += 232;
    d += ` L ${x} ${y}`;
    y += 240;
    d += ` V ${y}`;
    dir *= -1;
  }
  return d;
};

const lines = [
  { x0: 252, color: "#C9A227", opacity: 0.5 },
  { x0: 282, color: "#00B8D9", opacity: 0.42 },
  { x0: 312, color: "#1557B0", opacity: 0.55 },
];

export const ScrollLines = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], ["-26vw", "24vw"]);
  const y = useTransform(smooth, [0, 1], [0, -900]);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" data-testid="scroll-lines" aria-hidden="true">
      <motion.div style={{ x, y }} className="absolute top-[-8%] right-[26%] w-[170px] sm:w-[260px] lg:w-[340px]">
        <svg width="340" height={H} viewBox={`0 0 340 ${H}`} fill="none" className="w-full h-auto">
          {lines.map((l) => {
            const d = genPath(l.x0);
            return (
              <g key={l.x0}>
                <path d={d} stroke={l.color} strokeOpacity={l.opacity * 0.14} strokeWidth="7" style={{ filter: "blur(4px)" }} />
                <path d={d} stroke={l.color} strokeOpacity={l.opacity} strokeWidth="2" />
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
};
