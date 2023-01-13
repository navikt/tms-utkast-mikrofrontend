import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import LanguageProvider from "./providers/LanguageProvider";
import { initializeAmplitude } from "./utils/amplitude";

const Mikrofrontend = () => {
  initializeAmplitude();
  return (
    <LanguageProvider defaultLang={"nb"}>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default Mikrofrontend;
