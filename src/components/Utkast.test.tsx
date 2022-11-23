import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "../utils/test-utils";
import Utkast from "./Utkast";

describe("Simple working test for Komponent", () => {
  it("has a text", () => {
    render(<Utkast utkast={[]} isError={false} />);
    expect(screen.getByText(/tekst/)).toBeDefined();
  });
});
