import { describe, expect, it, beforeAll, afterAll, afterEach } from "vitest";
import { render, screen, utkastTestList } from "./utils/test-utils";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";
import { axe } from "vitest-axe";
import { rest } from "msw";
import { utkastApiUrl } from "./api/urls";
import { setupServer } from "msw/node";
import { UtkastElement } from "./components/Utkast";
import { sleep } from "react-query/types/core/utils";

describe("Rendrer app", () => {
  const server = setupServer();

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  it("viser utkastliste", async () => {
    setupMockResponse({ status: 200, content: utkastTestList });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByRole("heading", { name: "Utkast 1" })).toBeInTheDocument();
    expect(await screen.findAllByRole("listitem")).toHaveLength(4);
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

    setupMockResponse({ status: 200, content: tmsutkast });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    const listitems = await screen.getAllByRole("listitem");
    expect(listitems.length).toBe(4);
    const e1 = screen.getByText("1");
    const e2 = screen.getByText("2");
    const e3 = screen.getByText("3");
    expect(e1.compareDocumentPosition(e2)).toBe(2);
    expect(e1.compareDocumentPosition(e3)).toBe(2);
  });

  it("viser feilmelding og utkastene det var mulig å hente", async () => {
    //TODO
    setupMockResponse({ status: 200, content: [utkastTestList[0], utkastTestList[2]] });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByRole("heading", { name: "Utkast 1" })).toBeInTheDocument();
    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
  });

  it("viser feil-beskjed", async () => {
    setupMockResponse({ status: 500, content: null });
    const { container } = renderAppComponent();
    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByRole("heading", { name: "Oisann, noe gikk galt!" })).toBeInTheDocument();
  });

  const setupMockResponse = (utkastApiResponse: mockProps) => {
    const restHandlers = [
      rest.get(utkastApiUrl, (req, res, ctx) => {
        return res(ctx.status(utkastApiResponse.status), ctx.json(utkastApiResponse.content));
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
    </QueryClientProvider>,
  );
}
