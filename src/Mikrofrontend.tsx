import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import LanguageProvider from "./providers/LanguageProvider";

const Mikrofrontend = () => {
  return (
    <LanguageProvider defaultLang={"nb"}>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default Mikrofrontend;
