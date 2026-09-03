import { createContext, useContext, useEffect, useState } from "react";
import en from "./translations/en";
import fr from "./translations/fr";
import de from "./translations/de";
import es from "./translations/es";
import ar from "./translations/ar";
import pt from "./translations/pt";

const dicts = { en, fr, de, es, pt, ar };
export const LANGS = ["en", "fr", "de", "es", "pt", "ar"];

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("mbtex-lang");
    return dicts[saved] ? saved : "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l) => {
    localStorage.setItem("mbtex-lang", l);
    setLangState(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
