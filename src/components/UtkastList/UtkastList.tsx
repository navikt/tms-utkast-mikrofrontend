import React from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { Next } from "@navikt/ds-icons";
import { UtkastElement } from "../Utkast";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import styles from "./UtkastList.module.css";
import globalStyles from "../../App.module.css";
import { Edit } from "@navikt/ds-icons";
import { translateWithDate } from "../../providers/LanguageProvider";
import { sortByOpprettet } from "../../utils/sorting";

export interface UtkastListProps {
  utkast: UtkastElement[] | undefined;
}

interface UtkastListElementProps {
  utkast: UtkastElement;
  key: string;
}

const UtkastList = ({ utkast }: UtkastListProps) => {
  const listIsEmpty = utkast != undefined && utkast.length == 0;

  return listIsEmpty ? (
    <EmptyUtkastList />
  ) : (
    <ul className={`${styles.utkastList} ${globalStyles.tekstinnhold}`} data-testid="utkastlist">
      {utkast?.sort(sortByOpprettet).map((u) => (
        <UtkastListElement utkast={u} key={u.utkastId} />
      ))}
    </ul>
  );
};

export const UtkastListElement = ({ utkast }: UtkastListElementProps) => {
  return (
    <li key={utkast.utkastId}>
      <a href={utkast.link}>
        <span className={styles.editSvg}>
          <Edit aria-hidden={"true"} />
        </span>
        <span className={styles.listContentSpan}>
          <Heading size={"xsmall"} level={"2"} className={styles.aheading}>
            {utkast.tittel}
          </Heading>
          <BodyLong size={"small"}>{translateWithDate("utkast.started", utkast.opprettet)}</BodyLong>
        </span>
        <Next className={styles.nextIcon} aria-hidden={"true"} />
      </a>
    </li>
  );
};

export default UtkastList;
