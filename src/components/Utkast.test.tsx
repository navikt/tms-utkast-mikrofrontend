import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, utkastTestList } from "../utils/test-utils";
import Utkast, { UtkastElement } from "./Utkast";
import { axe } from "vitest-axe";
import { UtkastListElement } from "./UtkastList/UtkastList";
import { text } from "../language/text";

describe("Utkast", () => {
  it("renders list", async () => {
    const { container } = render(<Utkast loading={false} utkast={utkastTestList} isPartialContent={false} />);
    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByText(utkastTestList[0].tittel)).toBeDefined();
    expect(await screen.findByText(utkastTestList[1].tittel)).toBeDefined();
    expect(await screen.findByText(utkastTestList[2].tittel)).toBeDefined();
  });

  it("renders list and information about possible missing content", async () => {
    const { container } = render(<Utkast loading={false} utkast={utkastTestList} isPartialContent={true} />);
    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByText(utkastTestList[0].tittel)).toBeDefined();
    expect(await screen.findByText(utkastTestList[1].tittel)).toBeDefined();
    expect(await screen.findByText(utkastTestList[2].tittel)).toBeDefined();
    expect(await screen.findByTitle("Advarsel")).toBeDefined();
  });

  it("renders text for empty lists", async () => {
    const { container } = render(<Utkast loading={false} utkast={[]} isPartialContent={false} />);
    expect(await axe(container)).toHaveNoViolations();

    expect(await screen.findByTitle("En svart katt som gjemmer seg bak ett papirark"));
  });

  it("renders text for empty lists", async () => {
    const { container } = render(<Utkast loading={false} utkast={[]} isPartialContent={true} />);
    expect(await axe(container)).toHaveNoViolations();

    expect(await screen.findByTitle("En svart katt som gjemmer seg bak ett papirark"));
    expect(await screen.findByTitle("Advarsel")).toBeDefined();
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
    render(<UtkastListElement language={"nb"} utkast={utkast} key={utkast.utkastId} />);
    expect(await screen.findByText("Opprettet 22.12.2022")).toBeDefined();
    expect(await screen.findByText("Søknadsutkast")).toBeDefined();
    expect(await screen.findByRole("link")).toHaveAttribute("href", utkast.link);
  });
});
