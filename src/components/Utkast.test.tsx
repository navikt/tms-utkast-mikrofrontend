import React from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "../utils/test-utils";
import Utkast from "./Utkast";

describe("Simple working test for Komponent", () => {
  it("has a text", () => {
    render(<Utkast tekst="tekst" />);
    expect(screen.getByText(/tekst/)).toBeDefined();
  });
});
