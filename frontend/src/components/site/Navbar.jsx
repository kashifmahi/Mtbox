import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { List, X, CaretDown } from "@phosphor-icons/react";
import { useLang, LANGS } from "@/i18n/LanguageContext";

const FLAGS = { en: "gb", fr: "fr", de: "de", es: "es", pt: "pt", ar: "sa" };
const NAMES = { en: "English", fr: "Français", de: "Deutsch", es: "Español", pt: "Português", ar: "العربية" };

const LangDropdown = ({ lang, setLang }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative" data-testid="language-switcher">
      <button
        onClick={() => setOpen(!open)}
        data-testid="lang-dropdown-trigger"
        className="flex items-center gap-2 border border-white/15 rounded-full pl-2.5 pr-3 py-1.5 hover:border-[#C9A227]/60 transition-colors duration-300"
      >
        <img src={`https://flagcdn.com/w40/${FLAGS[lang]}.png`} alt={lang.toUpperCase()} className="w-6 h-4 object-cover rounded-[3px] block" />
        <CaretDown size={12} className={`text-white/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-3 min-w-[170px] bg-[#0a2242]/95 backdrop-blur-xl border border-[#C9A227]/25 rounded-md py-2 shadow-2xl shadow-black/40 z-50"
          data-testid="lang-dropdown-menu"
        >
          {LANGS.map((l) => (
            <button
              key={l}
              onClick={() => {
                setLang(l);
                setOpen(false);
              }}
              data-testid={`lang-switch-${l}`}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-200 hover:bg-white/5 ${
                lang === l ? "bg-[#C9A227]/10" : ""
              }`}
            >
              <img src={`https://flagcdn.com/w40/${FLAGS[l]}.png`} alt={l.toUpperCase()} className="w-6 h-4 object-cover rounded-[3px] block" />
              <span className={`font-grotesk text-xs tracking-wide ${lang === l ? "text-[#C9A227]" : "text-white/70"}`}>{NAMES[l]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

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
          <img src="/mbtex-group-horizontal-vector.svg" alt="MBtex Group — Make It Happen" className="h-[72px] w-auto" />
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
          <div className="border-l border-white/15 pl-4">
            <LangDropdown lang={lang} setLang={setLang} />
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
          <div className="flex items-center gap-3" data-testid="mobile-language-switcher">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                data-testid={`mobile-lang-switch-${l}`}
                title={l.toUpperCase()}
                className={`rounded-[3px] transition-all duration-300 ${
                  lang === l ? "ring-2 ring-[#C9A227] ring-offset-2 ring-offset-[#071A33] scale-110" : "opacity-50"
                }`}
              >
                <img src={`https://flagcdn.com/w40/${FLAGS[l]}.png`} alt={l.toUpperCase()} className="w-7 h-5 object-cover rounded-[3px] block" />
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
};
