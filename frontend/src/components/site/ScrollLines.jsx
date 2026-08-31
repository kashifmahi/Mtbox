import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const toPath = (rawPts, r = 34) => {
  const pts = rawPts.filter(
    (p, i) => i === 0 || Math.hypot(p[0] - rawPts[i - 1][0], p[1] - rawPts[i - 1][1]) > 0.5
  );
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i - 1];
    const [bx, by] = pts[i];
    const [cx, cy] = pts[i + 1];
    const l1 = Math.hypot(bx - ax, by - ay);
    const l2 = Math.hypot(cx - bx, cy - by);
    const r1 = Math.min(r, l1 / 2);
    const r2 = Math.min(r, l2 / 2);
    const p1x = bx - ((bx - ax) / l1) * r1;
    const p1y = by - ((by - ay) / l1) * r1;
    const p2x = bx + ((cx - bx) / l2) * r2;
    const p2y = by + ((cy - by) / l2) * r2;
    d += ` L ${p1x.toFixed(1)} ${p1y.toFixed(1)} Q ${bx} ${by} ${p2x.toFixed(1)} ${p2y.toFixed(1)}`;
  }
  const [lx, ly] = pts[pts.length - 1];
  d += ` L ${lx} ${ly}`;
  return d;
};

const genWaypoints = (H, diag, v1, v2) => {
  const pts = [[diag, 0]];
  let x = diag;
  let y = 0;
  let dir = -1;
  while (y < H - 10) {
    y += v1;
    pts.push([x, y]);
    x += dir * diag;
    y += diag;
    pts.push([x, y]);
    y += v2;
    pts.push([x, y]);
    dir *= -1;
  }
  return pts;
};

const colors = [
  { color: "#E81C2C", opacity: 0.6 },
  { color: "#E81C2C", opacity: 0.6 },
  { color: "#C9A227", opacity: 0.55 },
  { color: "#C9A227", opacity: 0.55 },
];

export const ScrollLines = () => {
  const [dims, setDims] = useState(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 65, damping: 22, mass: 0.4 });
  const mobile = dims && dims.w < 640;
  const ribbonW = dims ? (mobile ? 110 + 3 * 16 : 222 + 3 * 30) + 4 : 0;
  const drift = dims ? Math.max(0, dims.w - ribbonW - dims.w * 0.04 - dims.w * 0.05) : 0;
  const x = useTransform(smooth, [0, 1], [0, drift]);

  useEffect(() => {
    const measure = () =>
      setDims({ h: document.documentElement.scrollHeight, w: window.innerWidth });
    measure();
    const t = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    const obs = new ResizeObserver(() => measure());
    obs.observe(document.body);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      obs.disconnect();
    };
  }, []);

  if (!dims) return null;
  const { h: H } = dims;
  const diag = mobile ? 110 : 222;
  const gap = mobile ? 16 : 30;
  const base = genWaypoints(H, diag, mobile ? 300 : 460, mobile ? 200 : 300);

  return (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden" data-testid="scroll-lines" aria-hidden="true">
      <motion.div style={{ x }} className="absolute top-0 bottom-0 left-[4%]">
        <svg width={ribbonW} height={H} viewBox={`0 0 ${ribbonW} ${H}`} fill="none" className="h-full">
          {colors.map((c, i) => {
            const d = toPath(base.map(([px, py]) => [px + i * gap + 1, py]));
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={c.color} strokeOpacity={c.opacity * 0.14} strokeWidth="7" style={{ filter: "blur(4px)" }} />
                <path d={d} fill="none" pathLength="1000" className={`flow-line flow-line-${i}`} stroke={c.color} strokeOpacity={c.opacity} strokeWidth="2" />
              </g>
            );
          })}
        </svg>
      </motion.div>
    </div>
  );
};
