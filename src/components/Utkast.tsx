import React, { useContext } from "react";
import { Alert, BodyLong, Heading, Ingress, Loader } from "@navikt/ds-react";
import styles from "./Utkast.module.css";
import globalStyles from "../App.module.css";
import UtkastList from "./UtkastList/UtkastList";
import { text } from "../language/text";
import { LanguageContext } from "../provider/LanguageProvider";

export interface UtkastProps {
  loading: boolean;
  utkast: UtkastElement[] | undefined;
  isPartialContent: boolean;
}

export interface UtkastElement {
  tittel: string;
  link: string;
  utkastId: string;
  opprettet: string;
  sistEndret: string;
  metrics?: MetricValues | null;
}

export interface MetricValues {
  skjemakode: string;
  skjemanavn: string;
}

const Utkast = ({ utkast, loading, isPartialContent }: UtkastProps) => {
  const language = useContext(LanguageContext);

  return (
    <div className={styles.container}>
      <div className={styles.utkastWrapper}>
        <div className={`${styles.utkast} ${globalStyles.tekstinnhold}`}>
          <Heading size={"large"}> {text.hovedoverskrift[language]} </Heading>
          <BodyLong className={styles.ingress} size={"large"}>
            {text.description[language]}
          </BodyLong>
          {!loading && isPartialContent ? <Alert variant={"warning"}>{text.partialContent[language]}</Alert> : null}
        </div>
        {loading ? (
          <div className={styles.loadingDiv}>
            <Loader id="loader" size="3xlarge" title="venter..." />
          </div>
        ) : (
          <UtkastList utkast={utkast} />
        )}
      </div>
    </div>
  );
};

export default Utkast;
