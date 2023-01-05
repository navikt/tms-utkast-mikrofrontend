import React, { ReactElement } from "react";
import { IntlProvider, useIntl } from "react-intl";
import nbMessages from "../language/nb.json";
import enMessages from "../language/en.json";
import dayjs from "dayjs";

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

export const translate = (id: string) => useIntl().formatMessage({ id: id });
const dateFormatter = (date: string) => dayjs(date).format("DD.MM.YYYY");
export const translateWithDate = (id: string, date: string) =>
  useIntl().formatMessage({ id: id }, { date: dateFormatter(date) });

export default LanguageProvider;
