import React from "react";
import { Heading } from "@navikt/ds-react";
import { useIntl } from "react-intl";
import { Next } from "@navikt/ds-icons";
import dayjs from "dayjs";
import { UtkastListProps } from "../Utkast";
import ErrorDescription from "../ErrorDescription/ErrorDescription";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import styles from "./UtkastList.module.css";

const dateFormatter = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY");
};

const UtkastList = ({ utkast, dataError }: UtkastListProps) => {
  const intl = useIntl();
  const translateDate = (id: string, date: string) => intl.formatMessage({ id: id }, { date: dateFormatter(date) });
  if (dataError) {
    return <ErrorDescription />;
  } else if (utkast.length == 0) {
    return <EmptyUtkastList />;
  } else
    return (
      <ul>
        {utkast?.map((u) => (
          <li key={u.utkastId}>
            <a href={u.link}>
              <Heading size={"small"} level={"2"}>
                {u.tittel}
              </Heading>
              <p>
                {translateDate("utkast.started", u.opprettet)} |{" "}
                {translateDate("utkast.lastUpdated", u.sistEndret || u.opprettet)}
              </p>
              <div className={styles.nextDiv}>
                <Next className={styles.nextIcon} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    );
};

export default UtkastList;
