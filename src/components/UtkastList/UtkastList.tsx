import React, { useContext } from "react";
import { BodyLong, Heading } from "@navikt/ds-react";
import { Next } from "@navikt/ds-icons";
import { UtkastElement } from "../Utkast";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import styles from "./UtkastList.module.css";
import globalStyles from "../../App.module.css";
import { Edit } from "@navikt/ds-icons";
import { sortByOpprettet } from "../../utils/sorting";
import { logAmplitudeEvent } from "../../utils/amplitude";
import { text } from "../../language/text";
import dayjs from "dayjs";
import { LanguageContext, Language } from "../../provider/LanguageProvider";

export interface UtkastListProps {
  utkast: UtkastElement[] | undefined;
}

interface UtkastListElementProps {
  utkast: UtkastElement;
  key: string;
  language: Language;
}

const UtkastList = ({ utkast }: UtkastListProps) => {
  const listIsEmpty = utkast != undefined && utkast.length == 0;
  const language = useContext(LanguageContext);

  return listIsEmpty ? (
    <EmptyUtkastList language={language} />
  ) : (
    <ul className={`${styles.utkastList} ${globalStyles.tekstinnhold}`} data-testid="utkastlist">
      {utkast?.sort(sortByOpprettet).map((u) => (
        <UtkastListElement language={language} utkast={u} key={u.utkastId} />
      ))}
    </ul>
  );
};

export const UtkastListElement = ({ utkast, language }: UtkastListElementProps) => {
  const dateFormatter = (date: string) => dayjs(date).format("DD.MM.YYYY");

  return (
    <li key={utkast.utkastId}>
      <a href={utkast.link} onClick={() => logAmplitudeEvent(utkast.link, utkast.metrics)}>
        <span className={styles.editSvg}>
          <Edit aria-hidden={"true"} />
        </span>
        <span className={styles.listContentSpan}>
          <Heading size={"xsmall"} level={"2"} className={styles.aheading}>
            {utkast.tittel}
          </Heading>
          <BodyLong size={"small"}>
            {text.started[language]} {dateFormatter(utkast.opprettet)}
          </BodyLong>
        </span>
        <Next className={styles.nextIcon} aria-hidden={"true"} />
      </a>
    </li>
  );
};

export default UtkastList;
