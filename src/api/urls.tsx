const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");

export const getEnvironment = () => {
  if (isDevelopment) {
    return "development";
  }
  if (isProduction) {
    return "production";
  }
  return "local";
};

type EnvUrl = { development: string; production: string; local: string };

const UTKAST_API_URL: EnvUrl = {
  local: "http://localhost:3000/api/endpoint/utkast",
  development: "https://www.dev.nav.no/tms-min-side-proxy/utkast/utkast",
  production: "https://www.nav.no/tms-min-side-proxy/utkast/utkast",
};

const DIGIGSOS_API_URL: EnvUrl = {
  local: "http://localhost:3000/api/endpoint/dittnav-api/digisos/utkast",
  development: "https://www.dev.nav.no/tms-min-side-proxy/utkast/utkast/digisos",
  production: "https://www.nav.no/tms-min-side-proxy/utkast/utkast/digisos",
};

const BASE_URL: EnvUrl = {
  local: "https://www.dev.nav.no/minside/",
  development: "https://www.dev.nav.no/minside/",
  production: "https://www.nav.no/minside/",
};
export const utkastApiUrl = UTKAST_API_URL[getEnvironment()];
export const digisosApiUrl = DIGIGSOS_API_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];
