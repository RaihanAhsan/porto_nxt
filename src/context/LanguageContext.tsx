"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "id";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  toggleLang: () => {},
});

let currentMemoryLang: Language = "en";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => currentMemoryLang);

  useEffect(() => {
    const saved = sessionStorage.getItem("raihan_lang") as Language | null;
    if (saved === "en" || saved === "id") {
      currentMemoryLang = saved;
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    currentMemoryLang = newLang;
    setLangState(newLang);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("raihan_lang", newLang);
    }
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "id" : "en");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
