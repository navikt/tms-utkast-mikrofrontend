import React from "react";
import { Heading, Ingress, Loader } from "@navikt/ds-react";
import styles from "./Utkast.module.css";
import globalStyles from "../App.module.css";
import UtkastList from "./UtkastList/UtkastList";
import { translate } from "../providers/LanguageProvider";

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
      <div className={`${styles.utkast} ${globalStyles.tekstinnhold}`}>
        <Heading size={"large"}> {translate("utkast.hovedoverskrift")} </Heading>
        <Ingress>{translate("utkast.description")}</Ingress>
      </div>
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
  );
};

export default Utkast;
