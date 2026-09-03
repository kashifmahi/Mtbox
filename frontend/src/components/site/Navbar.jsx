import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useLang, LANGS } from "@/i18n/LanguageContext";

export const Navbar = ({ onNavigate }) => {
  const { t, lang, setLang } = useLang();
  const links = [
    { label: t.nav.who, href: "#who-we-are" },
    { label: t.nav.what, href: "#what-we-do" },
    { label: t.nav.approach, href: "#approach" },
    { label: t.nav.values, href: "#values" },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    onNavigate(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
        scrolled ? "bg-[#071A33]/80 border-[#C9A227]/20" : "bg-[#071A33]/30 border-transparent"
      }`}
      data-testid="main-navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <button onClick={() => go("#hero")} className="flex items-center" data-testid="navbar-logo">
          <img src="/mbtex-group-horizontal-vector.svg" alt="MBtex Group — Make It Happen" className="h-12 w-auto" />
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="nav-link font-grotesk text-[0.72rem] uppercase tracking-[0.22em] text-white/70"
              data-testid={`nav-link-${l.href.slice(1)}`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => go("#contact")}
            className="btn-gold font-grotesk text-[0.72rem] uppercase tracking-[0.22em] px-6 py-2.5 rounded-full"
            data-testid="nav-partner-cta"
          >
            {t.nav.partner}
          </button>
          <div className="flex items-center gap-1 border-l border-white/15 pl-4" data-testid="language-switcher">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                data-testid={`lang-switch-${l}`}
                className={`font-grotesk text-[0.65rem] uppercase tracking-[0.15em] px-2.5 py-1.5 rounded-full transition-colors duration-300 ${
                  lang === l ? "bg-[#C9A227] text-[#071A33]" : "text-white/50 hover:text-[#C9A227]"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </nav>

        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} data-testid="mobile-menu-toggle">
          {open ? <X size={26} /> : <List size={26} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#071A33]/95 backdrop-blur-xl border-t border-white/10 px-6 py-8 flex flex-col gap-6" data-testid="mobile-menu">
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="font-grotesk text-sm uppercase tracking-[0.2em] text-white/80 text-left">
              {l.label}
            </button>
          ))}
          <button onClick={() => go("#contact")} className="btn-gold font-grotesk text-sm uppercase tracking-[0.2em] px-6 py-3 rounded-full w-fit">
            {t.nav.partner}
          </button>
          <div className="flex items-center gap-2" data-testid="mobile-language-switcher">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                data-testid={`mobile-lang-switch-${l}`}
                className={`font-grotesk text-xs uppercase tracking-[0.15em] px-3 py-2 rounded-full ${
                  lang === l ? "bg-[#C9A227] text-[#071A33]" : "text-white/50 border border-white/15"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
};
