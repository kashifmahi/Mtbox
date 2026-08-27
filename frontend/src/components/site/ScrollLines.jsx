import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const genPath = (x0, H) => {
  let d = `M ${x0} 0`;
  let y = 0;
  let x = x0;
  let dir = -1;
  while (y < H) {
    y += 460;
    d += ` V ${y}`;
    x += dir * 220;
    y += 232;
    d += ` L ${x} ${y}`;
    y += 300;
    d += ` V ${y}`;
    dir *= -1;
  }
  return d;
};

const lines = [
  { x0: 252, color: "#C9A227", opacity: 0.55, end: 0.82 },
  { x0: 282, color: "#00B8D9", opacity: 0.45, end: 0.9 },
  { x0: 312, color: "#1557B0", opacity: 0.6, end: 0.98 },
];

const DrawnLine = ({ line, height, progress }) => {
  const pathLength = useTransform(progress, [0, line.end], [0.06, 1]);
  const d = genPath(line.x0, height);
  return (
    <>
      <path d={d} stroke={line.color} strokeOpacity={line.opacity * 0.12} strokeWidth="7" style={{ filter: "blur(4px)" }} fill="none" />
      <motion.path d={d} stroke={line.color} strokeOpacity={line.opacity} strokeWidth="2" fill="none" style={{ pathLength }} />
    </>
  );
};

export const ScrollLines = () => {
  const [height, setHeight] = useState(0);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.3 });

  useEffect(() => {
    const measure = () => setHeight(document.documentElement.scrollHeight);
    const t = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    const obs = new ResizeObserver(measure);
    obs.observe(document.body);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      obs.disconnect();
    };
  }, []);

  if (!height) return null;

  return (
    <div
      className="absolute top-0 bottom-0 right-[4%] sm:right-[10%] lg:right-[16%] z-[15] pointer-events-none overflow-hidden"
      data-testid="scroll-lines"
      aria-hidden="true"
      style={{ maskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 700px), transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 0%, black calc(100% - 700px), transparent 100%)" }}
    >
      <svg
        width="340"
        height={height}
        viewBox={`0 0 340 ${height}`}
        fill="none"
        className="h-full w-[170px] sm:w-[260px] lg:w-[340px]"
        preserveAspectRatio="xMaxYMin slice"
      >
        {lines.map((l) => (
          <DrawnLine key={l.x0} line={l} height={height} progress={smooth} />
        ))}
      </svg>
    </div>
  );
};
