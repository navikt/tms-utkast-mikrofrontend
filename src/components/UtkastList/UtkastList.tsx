import React from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import dayjs from "dayjs";
import { UtkastListProps } from "../Utkast";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import styles from "./UtkastList.module.css";
import { Edit } from "@navikt/ds-icons";

const dateFormatter = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};

const UtkastList = ({ utkast, status }: UtkastListProps) => {
  const intl = useIntl();
  const translateDate = (id: string, date: string) => intl.formatMessage({ id: id }, { date: dateFormatter(date) });
  if (utkast != undefined && utkast.length == 0) {
    return <EmptyUtkastList />;
  } else
    return (
      <ul className={styles.utkastList}>
        {utkast?.map((u) => (
          <li key={u.utkastId}>
            <a href={u.link}>
              <span className={styles.editSvg}>
                <Edit aria-hidden={"true"} />
              </span>
              <span className={styles.listContentSpan}>
                <Heading size={"xsmall"} level={"2"} className={styles.aheading}>
                  {u.tittel}
                </Heading>
                <BodyLong size={"small"}>{translateDate("utkast.started", u.opprettet)}</BodyLong>
              </span>
              <Next className={styles.nextIcon} aria-hidden={"true"} />
            </a>
          </li>
        ))}
      </ul>
    );
};

export default UtkastList;
