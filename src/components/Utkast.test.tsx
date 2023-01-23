import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, utkastTestList, withLanguageProvider } from "../utils/test-utils";
import Utkast, { UtkastElement } from "./Utkast";
import { axe } from "vitest-axe";
import { UtkastListElement } from "./UtkastList/UtkastList";

describe("Utkast", () => {
  it("renders list", async () => {
    const { container } = render(withLanguageProvider(<Utkast loading={false} utkast={utkastTestList} />));
    expect(await axe(container)).toHaveNoViolations();
    expect(screen.getByText(utkastTestList[0].tittel)).toBeDefined();
    expect(screen.getByText(utkastTestList[1].tittel)).toBeDefined();
    expect(screen.getByText(utkastTestList[2].tittel)).toBeDefined();
  });

  it("renders text for empty lists", async () => {
    const { container } = render(withLanguageProvider(<Utkast loading={false} utkast={[]} />));
    expect(await axe(container)).toHaveNoViolations();

    expect(screen.getByTitle("En svart katt som gjemmer seg bak ett papirark"));
  });

  it("translates page to english", async () => {
    const { container } = render(withLanguageProvider(<Utkast loading={false} utkast={utkastTestList} />, "en"));
    expect(await axe(container)).toHaveNoViolations();
    expect(
      screen.getByText("On this page you can find applications or other forms you have started but not completed yet")
    ).toBeDefined();
  });
});

describe("UtkastListElement", () => {
  it("renders list element", async () => {
    const utkast: UtkastElement = {
      link: "http://test.av.utkast",
      opprettet: "2022-12-22T08:53:24.636Z",
      sistEndret: "",
      tittel: "Søknadsutkast",
      utkastId: "",
    };
    render(withLanguageProvider(<UtkastListElement utkast={utkast} key={utkast.utkastId} />));
    expect(screen.getByText("Påbegynt 22.12.2022")).toBeDefined();
    expect(screen.getByText("Søknadsutkast")).toBeDefined();
    expect(screen.getByRole("link").getAttribute("href")).toBe(utkast.link);
  });
});
