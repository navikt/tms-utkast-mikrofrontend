import { render } from "@testing-library/react";
import React from "react";
import { UtkastElement } from "../components/Utkast";

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";

// override render export
export { customRender as render };

export const utkastTestList: UtkastElement[] = [
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
