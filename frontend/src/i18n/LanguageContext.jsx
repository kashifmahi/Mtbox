import { createContext, useContext, useState } from "react";
import en from "./translations/en";
import fr from "./translations/fr";
import de from "./translations/de";

const dicts = { en, fr, de };
export const LANGS = ["en", "fr", "de"];

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem("mbtex-lang");
    return dicts[saved] ? saved : "en";
  });
  const setLang = (l) => {
    localStorage.setItem("mbtex-lang", l);
    setLangState(l);
    document.documentElement.lang = l;
  };
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dicts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
