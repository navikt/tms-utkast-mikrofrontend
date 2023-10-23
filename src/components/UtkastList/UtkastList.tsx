import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import dayjs from "dayjs";
import { useContext } from "react";
import globalStyles from "../../App.module.css";
import Pencil from "../../img/Pencil";
import { text } from "../../language/text";
import { Language, LanguageContext } from "../../provider/LanguageProvider";
import { logAmplitudeEvent } from "../../utils/amplitude";
import { sortByOpprettet } from "../../utils/sorting";
import EmptyUtkastList from "../EmptyUtkastList/EmptyUtkastList";
import { UtkastElement } from "../Utkast";
import styles from "./UtkastList.module.css";

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
            <div className={styles.ikon}>
              <Pencil aria-hidden={true} />
            </div>
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
