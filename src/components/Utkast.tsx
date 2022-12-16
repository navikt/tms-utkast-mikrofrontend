import React from "react";
import { BodyShort, Heading, Ingress, Loader } from "@navikt/ds-react";
import styles from "./Utkast.module.css";
import globalStyles from "../App.module.css";
import UtkastList from "./UtkastList/UtkastList";
import { useIntl } from "react-intl";

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
}

const Utkast = ({ utkast, loading }: UtkastProps) => {
  const intl = useIntl();
  const translate = (id: string) => intl.formatMessage({ id: id });
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
