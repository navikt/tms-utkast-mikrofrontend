import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest";
import { render, screen, utkastTestList } from "./utils/test-utils";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { axe } from "vitest-axe";
import { rest } from "msw";
import { digisosApiUrl, utkastApiUrl } from "./api/urls";
import { setupServer } from "msw/node";
import { UtkastElement } from "./components/Utkast";

describe("Rendrer app", () => {
  const digisosReponse = [
    {
      tittel: "Digisosutkast",
      link: "https://test.no",
      utkastId: "hhjjj9999",
      opprettet: "2022-12-19T08:53:24.636Z",
      sistEndret: "2022-12-19T08:53:24.636Z",
    },
  ];

  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("viser utkastliste med resultat fra digisos og tms", async () => {
    setupMockResponse({ status: 200, content: utkastTestList }, { status: 200, content: digisosReponse });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText("Utkast")).toBeDefined();
    expect(screen.getAllByRole("listitem").length).toBe(4);
  });

  it("sorterer utkast på pågebynt dato", async () => {
    const tmsutkast = [
      {
        tittel: "1",
        link: "https://test.no",
        utkastId: "hhjjjkkk",
        opprettet: "2022-12-19T08:53:24.636Z",
        sistEndret: "2022-12-19T08:53:24.636Z",
      },
      {
        tittel: "4",
        link: "https://test.no",
        utkastId: "llhhhh",
        opprettet: "2023-01-04T08:53:24.636Z",
        sistEndret: "2023-01-04T08:53:24.636Z",
      },
    ];
    const digisosutkast = [
      {
        tittel: "3",
        link: "https://test.no",
        utkastId: "hhjjjkkk",
        opprettet: "2022-12-26T08:53:24.636Z",
        sistEndret: "2022-12-26T08:53:24.636Z",
      },
      {
        tittel: "2",
        link: "https://test.no",
        utkastId: "llhhhh",
        opprettet: "2022-12-23T08:53:24.636Z",
        sistEndret: "2022-12-23T08:53:24.636Z",
      },
    ];
    setupMockResponse({ status: 200, content: tmsutkast }, { status: 200, content: digisosutkast });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    const listitems = await screen.getAllByRole("listitem");
    expect(listitems.length).toBe(4);
    expect(listitems[0].textContent?.charAt(0)).toBe("4");
    expect(listitems[1].textContent?.charAt(0)).toBe("3");
    expect(listitems[2].textContent?.charAt(0)).toBe("2");
    expect(listitems[3].textContent?.charAt(0)).toBe("1");
  });

  it("viser utkastliste med resultat fra digisos", async () => {
    setupMockResponse({ status: 500, content: null }, { status: 200, content: digisosReponse });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText("Utkast")).toBeDefined();
    expect(screen.getAllByRole("listitem").length).toBe(1);
  });

  it("viser utkastliste med resultat fra tms", async () => {
    await setupMockResponse(
      { status: 200, content: [utkastTestList[0], utkastTestList[2]] },
      {
        status: 500,
        content: null,
      }
    );
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText("Utkast")).toBeDefined();
    expect(screen.getAllByRole("listitem").length).toBe(2);
  });

  it("viser feil-beskjed", async () => {
    setupMockResponse({ status: 500, content: null }, { status: 500, content: null });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByTestId("errordiv")).toBeDefined();
  });

  const setupMockResponse = (utkastApiResponse: mockProps, digisosApiResponse: mockProps) => {
    const restHandlers = [
      rest.get(utkastApiUrl, (req, res, ctx) => {
        return res(ctx.status(utkastApiResponse.status), ctx.json(utkastApiResponse.content));
      }),
      rest.get(digisosApiUrl, (req, res, ctx) => {
        return res(ctx.status(digisosApiResponse.status), ctx.json(digisosApiResponse.content));
      }),
    ];
    server.resetHandlers(...restHandlers);
  };
});

interface mockProps {
  status: number;
  content: UtkastElement[] | null;
}

function renderAppComponent() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  );
}
