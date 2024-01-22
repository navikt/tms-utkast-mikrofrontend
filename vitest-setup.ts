import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";
import { fetch } from "cross-fetch";
import matchers from "@testing-library/jest-dom/matchers";
import { server } from "./src/mock/server";
import { cleanup } from "@testing-library/react";

expect.extend(matchers);
expect.extend(axeMatchers);

global.fetch = fetch;

// @ts-expect-error mock for å fikse jsdom-feil i testene
HTMLCanvasElement.prototype.getContext = vi.fn();

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
