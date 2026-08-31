import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CYCLE = 1300;
const H = CYCLE * 4;
const VB_W = 560;

const genPath = (x0) => {
  let d = `M ${x0} 0`;
  let y = 0;
  let x = x0;
  while (y < H) {
    y += 120;
    d += ` V ${y}`;
    x += 400;
    y += 900;
    d += ` L ${x} ${y}`;
    y += 120;
    d += ` V ${y}`;
    x -= 400;
    y += 160;
    d += ` L ${x} ${y}`;
  }
  return d;
};

const lines = [
  { d: genPath(40), color: "#E81C2C", opacity: 0.6 },
  { d: genPath(75), color: "#E81C2C", opacity: 0.6 },
  { d: genPath(110), color: "#C9A227", opacity: 0.55 },
  { d: genPath(145), color: "#C9A227", opacity: 0.55 },
];

export const ScrollLines = () => {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);
  const { scrollY } = useScroll();

  useEffect(() => {
    const measure = () => ref.current && setScale(ref.current.getBoundingClientRect().width / VB_W);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const y = useTransform(scrollY, (v) => {
    const c = CYCLE * scale;
    return -c - (v % c);
  });

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden" data-testid="scroll-lines" aria-hidden="true">
      <motion.div ref={ref} style={{ y }} className="absolute top-0 right-[6%] sm:right-[12%] lg:right-[18%] w-[280px] sm:w-[420px] lg:w-[560px]">
        <svg width={VB_W} height={H} viewBox={`0 0 ${VB_W} ${H}`} fill="none" className="w-full h-auto">
          {lines.map((l) => (
            <g key={l.d}>
              <path d={l.d} stroke={l.color} strokeOpacity={l.opacity * 0.14} strokeWidth="7" style={{ filter: "blur(4px)" }} />
              <path d={l.d} stroke={l.color} strokeOpacity={l.opacity} strokeWidth="2" />
            </g>
          ))}
        </svg>
      </motion.div>
    </div>
  );
};
