import React, { useContext } from "react";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { UtkastElement } from "../Utkast";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import styles from "./UtkastList.module.css";
import globalStyles from "../../App.module.css";
import { sortByOpprettet } from "../../utils/sorting";
import { logAmplitudeEvent } from "../../utils/amplitude";
import { text } from "../../language/text";
import dayjs from "dayjs";
import { LanguageContext, Language } from "../../provider/LanguageProvider";
import { ChevronRightIcon, PencilFillIcon } from "@navikt/aksel-icons";

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
    <EmptyUtkastList />
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
  const isEndret = utkast?.sistEndret != null;

  return (
    <li key={utkast.utkastId} className={styles.container}>
      <a href={utkast.link} className={styles.link} onClick={() => logAmplitudeEvent(utkast.link, utkast.metrics)}>
        <div className={styles.top}>
          <div className={styles.wrapper}>
            <PencilFillIcon className={styles.ikon} aria-hidden={true} />
            <BodyShort size="medium" className={styles.utkastNavn}>
              {text.hovedoverskrift[language]}
            </BodyShort>
          </div>
          <div className={`${styles.wrapper} ${styles.endretTekst}`}>
            <BodyLong size="small">{text.opprettet[language] + dateFormatter(utkast.opprettet)}</BodyLong>
            <ChevronRightIcon className={styles.chevron} fontSize="1.25rem" aria-hidden={true} aria-label="Chevron" />
          </div>
        </div>
        <div className={styles.bottom}>
          <Heading size="xsmall" level="2" className={styles.utkastTittel}>
            {utkast.tittel}
          </Heading>
          {isEndret ? (
            <BodyLong size="small" className={styles.opprettetTekst}>
              {text.endret[language] + dateFormatter(utkast.opprettet)}
            </BodyLong>
          ) : (
            <BodyLong size="small" className={styles.opprettetTekst}>
              {text.ikkeEndret[language]}
            </BodyLong>
          )}
        </div>
      </a>
    </li>
  );
};

export default UtkastList;
