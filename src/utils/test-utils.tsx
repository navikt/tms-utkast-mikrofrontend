import { render } from "@testing-library/react";
import React from "react";
import LanguageProvider from "../providers/LanguageProvider";

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

export * from "@testing-library/react";

// override render export
export { customRender as render };

export function withLanguageProvider(reactelement: JSX.Element, lang: string) {
  return <LanguageProvider defaultLang={lang}>{reactelement}</LanguageProvider>;
}
