import React from "react";
import { Heading, Ingress, Loader } from "@navikt/ds-react";
import styles from "./Utkast.module.css";
import globalStyles from "../App.module.css";
import UtkastList from "./UtkastList/UtkastList";
import { text } from "../language/text";

export interface UtkastProps {
  loading: boolean;
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

const Utkast = ({ utkast, loading }: UtkastProps) => {
  return (
    <div className={styles.utkastWrapper}>
      <div className={styles.headerWrapper}>
        <div className={`${styles.utkast} ${globalStyles.tekstinnhold}`}>
          <Heading size={"large"}> {text.hovedoverskrift["nb"]} </Heading>
          <Ingress>{text.description["nb"]}</Ingress>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.utkastContainer}>
          {loading ? (
            <div className={styles.loadingDiv}>
              <Loader id="loader" size="3xlarge" title="venter..." />
            </div>
          ) : (
            <UtkastList utkast={utkast} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Utkast;
