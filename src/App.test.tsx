import { describe, expect, it } from "vitest";
import { render, withLanguageProvider, screen, utkastTestList } from "./utils/test-utils";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { axe } from "vitest-axe";
import { rest } from "msw";
import { digisosApiUrl, utkastApiUrl } from "./api/urls";
import { setupServer } from "msw/node";
import { findAllByRole, within } from "@testing-library/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
describe("Rendrer app", () => {
  it("viser utkastliste med resultat fra digisos og tms", async () => {
    const restHandlers = [
      rest.get(utkastApiUrl, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(utkastTestList));
      }),
      rest.get(digisosApiUrl, (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json([
            {
              tittel: "Digisosutkast",
              link: "https://test.no",
              utkastId: "hhjjj9999",
              opprettet: "2022-12-19T08:53:24.636Z",
              sistEndret: "2022-12-19T08:53:24.636Z",
            },
          ])
        );
      }),
    ];
    const server = setupServer(...restHandlers);
    server.listen({ onUnhandledRequest: "error" });

    const component = render(
      withLanguageProvider(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
        "nb"
      )
    );
    expect(await axe(component.container)).toHaveNoViolations();
    expect(screen.getByText("Utkast")).toBeDefined();
    expect(screen.getAllByRole("listitem").length).toBe(4);
    server.close();
  });

  it("viser feil-beskjed", async () => {
    const restHandlers = [
      rest.get(utkastApiUrl, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get(digisosApiUrl, (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    ];
    const server = setupServer(...restHandlers);

    const component = render(
      withLanguageProvider(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
        "nb"
      )
    );
    expect(await axe(component.container)).toHaveNoViolations();
    expect(screen.getByTestId("errordiv")).toBeDefined();
  });
});
