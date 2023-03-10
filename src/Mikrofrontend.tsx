import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { initializeAmplitude } from "./utils/amplitude";

const Mikrofrontend = () => {
  initializeAmplitude();
  const [language, setLanguage] = useState<"en" | "nb">((localStorage.getItem("language") as "nb" | "en") ?? "nb");
  window.addEventListener("storage", () => {
    setLanguage((localStorage.getItem("language") as "nb" | "nb") ?? "nb");
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <App language={language} />
    </QueryClientProvider>
  );
};

export default Mikrofrontend;
