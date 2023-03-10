import React from "react";
import { Heading, Ingress, Loader } from "@navikt/ds-react";
import styles from "./Utkast.module.css";
import globalStyles from "../App.module.css";
import UtkastList from "./UtkastList/UtkastList";
import { text } from "../language/text";

export interface UtkastProps {
  loading: boolean;
  language: "en" | "nb";
  utkast: UtkastElement[] | undefined;
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

const Utkast = ({ utkast, loading, language }: UtkastProps) => {
  return (
    <div className={styles.utkastWrapper}>
      <div className={styles.headerWrapper}>
        <div className={`${styles.utkast} ${globalStyles.tekstinnhold}`}>
          <Heading size={"large"}> {text.hovedoverskrift[language]} </Heading>
          <Ingress>{text.description[language]}</Ingress>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.utkastContainer}>
          {loading ? (
            <div className={styles.loadingDiv}>
              <Loader id="loader" size="3xlarge" title="venter..." />
            </div>
          ) : (
            <UtkastList utkast={utkast} language={language} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Utkast;
