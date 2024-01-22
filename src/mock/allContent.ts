import { HttpResponse, http } from "msw";
import { digisosApiDeprecatedUrl, featureToggleUrl, utkastApiDeprecatedUrl, utkastApiUrl } from "../api/urls";

const utkastHandler = () => {
  return [
    http.get(utkastApiUrl, () => {
      return HttpResponse.json([
        {
          utkastId: "12467899999",
          tittel: "Søknad om dagpenger, permittert",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2020-03-23T08:53:24.636Z",
          sistEndret: null,
          metrics: {
            skjemakode: "2233/8",
            skjemanavn: "Dagpenger søknadskjema",
          },
        },
        {
          utkastId: "124677777777",
          tittel: "Søknad om foreldre- og svangerskapspenger",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2020-03-13T08:53:24.636Z",
          sistEndret: "2020-03-14T08:53:24.636Z",
          metrics: null,
        },
        {
          utkastId: "124679",
          tittel: "Søknad om dagpenger, permittert",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2020-10-13T08:53:24.636Z",
          sistEndret: null,
        },
        {
          utkastId: "124610",
          tittel: "Søknad om foreldre- og svangerskapspenger",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2023-03-13T08:53:24.636Z",
          sistEndret: "2023-03-14T08:53:24.636Z",
        },
      ]);
    }),
    http.get(utkastApiDeprecatedUrl, () => {
      return HttpResponse.json([
        {
          utkastId: "12467899999",
          tittel: "Søknad om dagpenger (fra v1-api)",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2020-03-23T08:53:24.636Z",
          sistEndret: null,
          metrics: {
            skjemakode: "2233/8",
            skjemanavn: "Dagpenger søknadskjema",
          },
        },
        {
          utkastId: "124677777777",
          tittel: "Søknad om foreldre- og svangerskapspenger",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2020-03-13T08:53:24.636Z",
          sistEndret: "2020-03-14T08:53:24.636Z",
          metrics: null,
        },
      ]);
    }),
    http.get(digisosApiDeprecatedUrl, () => {
      return HttpResponse.json([
        {
          utkastId: "124679",
          tittel: "digisos-søknad",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2020-10-13T08:53:24.636Z",
          sistEndret: null,
        },
        {
          utkastId: "124610",
          tittel: "Søknad om foreldre- og svangerskapspenger",
          link: "https://www.intern.dev.nav.no/minside/",
          opprettet: "2023-03-13T08:53:24.636Z",
          sistEndret: "2023-03-14T08:53:24.636Z",
        },
      ]);
    }),
  ];
};

export const featureToggleHandler = () => {
  return [
    http.get(featureToggleUrl, () => {
      return HttpResponse.json({ UtkastApiV2: true });
    }),
  ];
};

export const handlersAllContent = [...utkastHandler(), ...featureToggleHandler()];
