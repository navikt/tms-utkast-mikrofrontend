import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "../utils/test-utils";
import Utkast from "./Utkast";
import LanguageProvider from "../providers/LanguageProvider";

function withLanguageProvider(reactelement: JSX.Element, lang: string) {
  return <LanguageProvider defaultLang={lang}>{reactelement}</LanguageProvider>;
}

describe("Utkast", () => {
  it("renders list", () => {
    const utkastlist = [
      {
        tittel: "Utkast 1",
        link: "https://test.no",
        utkastId: "hhjjjkkk",
        opprettet: "2022-12-19T08:53:24.636Z",
        sistEndret: "2022-12-19T08:53:24.636Z",
      },
      {
        tittel: "Utkast 2",
        link: "https://test.no",
        utkastId: "llhhhh",
        opprettet: "2022-12-19T08:53:24.636Z",
        sistEndret: "2022-12-19T08:53:24.636Z",
      },
      {
        tittel: "Utkast 3",
        link: "https://test.no",
        utkastId: "ajslfjla",
        opprettet: "2022-12-19T08:53:24.636Z",
        sistEndret: "2022-12-19T08:53:24.636Z",
      },
    ];
    render(withLanguageProvider(<Utkast loading={false} utkast={utkastlist} />, "nb"));

    expect(screen.getByTestId("utkastlist")).toBeDefined();
    expect(screen.getByText(utkastlist[0].tittel)).toBeDefined();
    expect(screen.getByText(utkastlist[1].tittel)).toBeDefined();
    expect(screen.getByText(utkastlist[2].tittel)).toBeDefined();
  });

  it("renders text for empty lists", () => {
    render(withLanguageProvider(<Utkast loading={false} utkast={[]} />, "nb"));
  });
});
