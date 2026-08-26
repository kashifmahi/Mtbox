import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GeometricBackground } from "./GeometricBackground";
import { ArrowDown } from "@phosphor-icons/react";

const lines = ["Building Platforms.", "Connecting Markets.", "Creating Sustainable Growth."];

const MaskedLine = ({ text, delay, accent }) => (
  <div className="overflow-hidden">
    <motion.div
      initial={{ y: "115%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`font-serif-display font-medium leading-[1.02] tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl ${accent ? "text-[#C9A227] italic" : "text-white"}`}
    >
      {text}
    </motion.div>
  </div>
);

export const Hero = ({ onNavigate }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center bg-[#071A33] overflow-hidden" data-testid="hero-section">
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <GeometricBackground />
      </motion.div>
      <div className="absolute inset-0 spotlight" />
      <div
        className="absolute inset-0 opacity-[0.13] mix-blend-luminosity bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.pexels.com/photos/38967250/pexels-photo-38967250.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071A33] via-transparent to-[#071A33]/60" />

      <motion.div style={{ y: yText, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="w-14 h-px bg-[#C9A227]" />
          <span className="overline-label text-[#C9A227]" data-testid="hero-overline">MBtex Group · Switzerland · International Operations</span>
        </motion.div>

        <h1 className="mb-10">
          <MaskedLine text={lines[0]} delay={0.5} />
          <MaskedLine text={lines[1]} delay={0.65} />
          <MaskedLine text={lines[2]} delay={0.8} accent />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="max-w-2xl text-white/60 text-base md:text-lg leading-relaxed mb-12"
          data-testid="hero-subtext"
        >
          An international diversified group developing and connecting businesses across real estate
          and urban development, financial technology, sports infrastructure, global commodities, and
          sustainable brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="flex flex-wrap items-center gap-5"
        >
          <button
            onClick={() => onNavigate("#what-we-do")}
            className="btn-primary font-grotesk text-[0.72rem] uppercase tracking-[0.22em] px-8 py-4 rounded-full"
            data-testid="hero-cta-explore"
          >
            Explore Our Platforms
          </button>
          <button
            onClick={() => onNavigate("#contact")}
            className="btn-gold font-grotesk text-[0.72rem] uppercase tracking-[0.22em] px-8 py-4 rounded-full"
            data-testid="hero-cta-partner"
          >
            Partner With Us
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10"
          data-testid="hero-stats"
        >
          {[
            ["05", "Business Platforms"],
            ["CH", "Swiss Incorporated"],
            ["Global", "Market Reach"],
            ["Long-Term", "Value Creation"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-serif-display text-3xl md:text-4xl text-[#C9A227]">{v}</div>
              <div className="font-grotesk text-[0.68rem] uppercase tracking-[0.2em] text-white/40 mt-2">{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C9A227]/60"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};
