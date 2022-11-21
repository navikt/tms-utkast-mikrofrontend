import React from "react";
import { Heading } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import dayjs from "dayjs";

interface Props {
  link: string;
  tittel: string;
  opprettet: string;
  sistEndret: string | null;
}

const dateFormatter = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};

const UtkastListElement = ({ link, tittel, opprettet, sistEndret }: Props) => {
  const intl = useIntl();
  const translateDate = (id: string, date: string) => intl.formatMessage({ id: id }, { date: dateFormatter(date) });

  return (
    <li>
      <a href={link}>
        <Heading size={"small"} level={"2"}>
          {tittel}
        </Heading>
        <p>
          {translateDate("utkast.started", opprettet)} | {translateDate("utkast.lastUpdated", sistEndret || opprettet)}
        </p>
        <Next />
      </a>
    </li>
  );
};

export default UtkastListElement;
