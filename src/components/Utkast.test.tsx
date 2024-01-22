import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { render, screen, utkastTestList } from "../utils/test-utils";
import Utkast, { UtkastElement } from "./Utkast";
import { UtkastListElement } from "./UtkastList/UtkastList";

describe("Utkast", () => {
  it("renders list", async () => {
    const { container } = render(<Utkast loading={false} utkast={utkastTestList} isPartialContent={false} />);

    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByText(utkastTestList[0].tittel)).toBeInTheDocument();
    expect(await screen.findByText(utkastTestList[1].tittel)).toBeInTheDocument();
    expect(await screen.findByText(utkastTestList[2].tittel)).toBeInTheDocument();
  });

  it("sorterer utkast på påbegynt dato", async () => {
    const utkast = [
      {
        tittel: "1",
        link: "https://test.no",
        utkastId: "hhjjjkkk",
        opprettet: "2022-12-19T08:53:24.636Z",
        sistEndret: "2022-12-19T08:53:24.636Z",
      },
      {
        tittel: "4",
        link: "https://test.no",
        utkastId: "llhhhh",
        opprettet: "2023-01-04T08:53:24.636Z",
        sistEndret: "2023-01-04T08:53:24.636Z",
      },
      {
        tittel: "3",
        link: "https://test.no",
        utkastId: "hhjjjkdf",
        opprettet: "2022-12-26T08:53:24.636Z",
        sistEndret: "2022-12-26T08:53:24.636Z",
      },
      {
        tittel: "2",
        link: "https://test.no",
        utkastId: "llhhasd",
        opprettet: "2022-12-23T08:53:24.636Z",
        sistEndret: "2022-12-23T08:53:24.636Z",
      },
    ];

    render(<Utkast loading={false} utkast={utkast} isPartialContent={true} />);

    expect(await screen.findAllByRole("listitem")).toHaveLength(4);
    const listitems = screen.getAllByRole("listitem");
    expect(listitems.length).toBe(4);
    const e1 = screen.getByText("1");
    const e2 = screen.getByText("2");
    const e3 = screen.getByText("3");
    expect(e1.compareDocumentPosition(e2)).toBe(2);
    expect(e1.compareDocumentPosition(e3)).toBe(2);
  });

  it("renders list and information about possible missing content", async () => {
    const { container } = render(<Utkast loading={false} utkast={utkastTestList} isPartialContent={true} />);

    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByText(utkastTestList[0].tittel)).toBeInTheDocument();
    expect(await screen.findByText(utkastTestList[1].tittel)).toBeInTheDocument();
    expect(await screen.findByText(utkastTestList[2].tittel)).toBeInTheDocument();
    expect(await screen.findByTitle("Advarsel")).toBeInTheDocument();
  });

  it("renders text for empty lists", async () => {
    const { container } = render(<Utkast loading={false} utkast={[]} isPartialContent={false} />);

    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByTitle("En svart katt som gjemmer seg bak ett papirark")).toBeInTheDocument();
  });

  it("renders text for empty lists with partial content", async () => {
    const { container } = render(<Utkast loading={false} utkast={[]} isPartialContent={true} />);

    expect(await axe(container)).toHaveNoViolations();
    expect(await screen.findByTitle("En svart katt som gjemmer seg bak ett papirark")).toBeInTheDocument();
    expect(await screen.findByTitle("Advarsel")).toBeInTheDocument();
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

    expect(await screen.findByText("Opprettet 22.12.2022")).toBeInTheDocument();
    expect(await screen.findByText("Søknadsutkast")).toBeInTheDocument();
    expect(await screen.findByRole("link")).toHaveAttribute("href", utkast.link);
  });
});
