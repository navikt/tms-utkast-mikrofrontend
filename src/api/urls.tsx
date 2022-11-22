function getEnvironment(): "production" | "development" {
  if (process.env.NODE_ENV === "production") {
    return "production";
  }
  return "development";
}

type EnvUrl = { development: string; production: string };

const API_URL: EnvUrl = {
  development: "http://localhost:3000/api/endpoint",
  production: "https://tms-utkast/",
};

const BASE_URL: EnvUrl = {
  development: "https://www.dev.nav.no/minside/",
  production: "https://www.nav.no/minside/",
};
export const apiUrl = API_URL[getEnvironment()];
export const baseUrl = BASE_URL[getEnvironment()];
