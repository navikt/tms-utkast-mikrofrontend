import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, utkastTestList } from "../utils/test-utils";
import Utkast from "./Utkast";
import LanguageProvider from "../providers/LanguageProvider";
import { axe } from "vitest-axe";

function withLanguageProvider(reactelement: JSX.Element, lang: string) {
  return <LanguageProvider defaultLang={lang}>{reactelement}</LanguageProvider>;
}

describe("Utkast", () => {
  it("renders list", async () => {
    const { container } = render(withLanguageProvider(<Utkast loading={false} utkast={utkastTestList} />, "nb"));
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText(utkastTestList[0].tittel)).toBeDefined();
    expect(screen.getByText(utkastTestList[1].tittel)).toBeDefined();
    expect(screen.getByText(utkastTestList[2].tittel)).toBeDefined();
  });

  it("renders text for empty lists", async () => {
    const { container } = render(withLanguageProvider(<Utkast loading={false} utkast={[]} />, "nb"));
    expect(await axe(container)).toHaveNoViolations();

    expect(screen.getByAltText("En svart katt som gjemmer seg bak ett papirark"));
  });

  it("translates page to english", async () => {
    const { container } = render(withLanguageProvider(<Utkast loading={false} utkast={utkastTestList} />, "en"));
    expect(await axe(container)).toHaveNoViolations();
    expect(
      screen.getByText("On this page you can find applications or other forms you have started but not completed yet")
    ).toBeDefined();
  });
});
