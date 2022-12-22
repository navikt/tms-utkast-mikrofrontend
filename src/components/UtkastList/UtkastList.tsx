import React from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import dayjs from "dayjs";
import { UtkastElement } from "../Utkast";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import styles from "./UtkastList.module.css";
import glocalStyles from "../../App.module.css";
import { Edit } from "@navikt/ds-icons";

export interface UtkastListProps {
  utkast: UtkastElement[] | undefined;
}

interface UtkastListElementProps {
  utkast: UtkastElement;
  key: string;
}

const dateFormatter = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};

const UtkastList = ({ utkast }: UtkastListProps) => {
  const intl = useIntl();
  const translateDate = (id: string, date: string) => intl.formatMessage({ id: id }, { date: dateFormatter(date) });
  if (utkast != undefined && utkast.length == 0) {
    return <EmptyUtkastList />;
  } else
    return (
      <ul className={`${styles.utkastList} ${glocalStyles.tekstinnhold}`} data-testid="utkastlist">
        {utkast?.map((u) => (
          <UtkastListElement utkast={u} key={u.utkastId} />
        ))}
      </ul>
    );
};

export const UtkastListElement = ({ utkast, key }: UtkastListElementProps) => {
  const intl = useIntl();
  const translateDate = (id: string, date: string) => intl.formatMessage({ id: id }, { date: dateFormatter(date) });
  return (
    <li key={key}>
      <a href={utkast.link}>
        <span className={styles.editSvg}>
          <Edit aria-hidden={"true"} />
        </span>
        <span className={styles.listContentSpan}>
          <Heading size={"xsmall"} level={"2"} className={styles.aheading}>
            {utkast.tittel}
          </Heading>
          <BodyLong size={"small"}>{translateDate("utkast.started", utkast.opprettet)}</BodyLong>
        </span>
        <Next className={styles.nextIcon} aria-hidden={"true"} />
      </a>
    </li>
  );
};

export default UtkastList;
