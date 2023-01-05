import "vitest-axe/extend-expect";
import * as matchers from "vitest-axe/matchers";
import { expect } from "vitest";
expect.extend(matchers);
import { fetch } from "cross-fetch";

global.fetch = fetch;
