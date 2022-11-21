export default [
  {
    url: "/api/endpoint",
    method: "get",
    response: () => {
      return [
        {
          tittel: "Søknad om dagpenger, permittert",
          link: "https://www.dev.nav.no/minside/",
          opprettet: "2020-03-13T08:53:24.636Z",
          sistEndret: null,
        },
        {
          tittel: "Søknad om foreldre- og svangerskapspenger",
          link: "https://www.dev.nav.no/minside/",
          opprettet: "2020-03-13T08:53:24.636Z",
          sistEndret: "2020-03-14T08:53:24.636Z",
        },
      ];
    },
  },
];
