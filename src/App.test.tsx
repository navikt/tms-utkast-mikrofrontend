import { QueryClient, QueryClientProvider } from "react-query";
import { expect, it } from "vitest";
import { axe } from "vitest-axe";
import App from "./App";
import { render, screen } from "./utils/test-utils";
import { server } from "./mock/server";
import { HttpResponse, http } from "msw";
import { utkastApiUrl } from "./api/urls";

it("viser feil-beskjed", async () => {
  server.use(
    http.get(utkastApiUrl, () => {
      return new HttpResponse(null, {
        status: 500,
      });
    }),
  );

  const { container } = renderAppComponent();
  expect(await axe(container)).toHaveNoViolations();
  expect(await screen.findByRole("heading", { name: "Oisann, noe gikk galt!" })).toBeInTheDocument();
});

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
