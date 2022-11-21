import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import nbMessages from "../language/nb.json";
import enMessages from "../language/en.json";

const loadMessages = (lang: string) =>
  ({
    nb: nbMessages,
    en: enMessages,
  }[lang]);

interface Props {
  defaultLang: string;
  children: ReactElement;
}

const LanguageProvider = ({ defaultLang, children }: Props) => (
  <IntlProvider locale={defaultLang} messages={loadMessages(defaultLang)}>
    {" "}
    {children}
  </IntlProvider>
);

export default LanguageProvider;
