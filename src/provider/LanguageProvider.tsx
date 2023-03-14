import React, { useState, useEffect, createContext } from "react";

export type Language = "nb" | "en";

export const LanguageContext = createContext((localStorage.getItem("language") ?? "nb") as Language);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>((sessionStorage.getItem("language") ?? "nb") as Language);

  useEffect(() => {
    console.log("render -");
    window.addEventListener("storage", () => {
      setLanguage((sessionStorage.getItem("language") ?? "nb") as Language);
    });
  }, [language]);

  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;
