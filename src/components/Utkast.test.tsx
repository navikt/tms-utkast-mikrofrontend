import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, utkastTestList } from "../utils/test-utils";
import Utkast, { UtkastElement } from "./Utkast";
import { axe } from "vitest-axe";
import { UtkastListElement } from "./UtkastList/UtkastList";

describe("Utkast", () => {
  it("renders list", async () => {
    const { container } = render(<Utkast loading={false} utkast={utkastTestList} />);
    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByText(utkastTestList[0].tittel)).toBeDefined();
    expect(await screen.findByText(utkastTestList[1].tittel)).toBeDefined();
    expect(await screen.findByText(utkastTestList[2].tittel)).toBeDefined();
  });

  it("renders text for empty lists", async () => {
    const { container } = render(<Utkast loading={false} utkast={[]} />);
    expect(await axe(container)).toHaveNoViolations();

    expect(await screen.findByTitle("En svart katt som gjemmer seg bak ett papirark"));
  });

  /* TODO : gjeninnfør med language state
  it("translates page to english", async () => {
    const { container } = render(<Utkast loading={false} utkast={utkastTestList} />);
    expect(await axe(container)).toHaveNoViolations();
    expect(
      screen.getByText("On this page you can find applications or other forms you have started but not completed yet")
    ).toBeDefined();
  });
   */
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
    render(<UtkastListElement language={"nb"} utkast={utkast} key={utkast.utkastId} />);
    expect(await screen.findByText("Opprettet 22.12.2022")).toBeDefined();
    expect(await screen.findByText("Søknadsutkast")).toBeDefined();
    expect(await screen.findByRole("link")).toHaveAttribute("href", utkast.link);
  });
});
