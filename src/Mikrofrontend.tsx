import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { initializeAmplitude } from "./utils/amplitude";
import LanguageProvider from "./provider/LanguageProvider";

const Mikrofrontend = () => {
  initializeAmplitude();

  return (
    <QueryClientProvider client={new QueryClient()}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default Mikrofrontend;
