import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, className = "", ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    {...rest}
  >
    {children}
  </motion.div>
);

export const SectionHeader = ({ overline, title, dark = true, align = "left" }) => (
  <Reveal className={`mb-16 md:mb-20 ${align === "center" ? "text-center" : ""}`}>
    <div className={`flex items-center gap-4 mb-6 ${align === "center" ? "justify-center" : ""}`}>
      <div className="w-12 h-px bg-[#C9A227]" />
      <span className="overline-label text-[#C9A227]">{overline}</span>
    </div>
    <h2 className={`font-serif-display font-medium tracking-tight text-3xl md:text-5xl leading-[1.08] max-w-3xl ${dark ? "text-white" : "text-[#071A33]"} ${align === "center" ? "mx-auto" : ""}`}>
      {title}
    </h2>
  </Reveal>
);
