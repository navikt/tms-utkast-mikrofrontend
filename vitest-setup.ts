import "vitest-axe/extend-expect";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";
import { fetch } from "cross-fetch";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
expect.extend(axeMatchers);

global.fetch = fetch;
