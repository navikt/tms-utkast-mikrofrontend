import React from "react";
import styles from "./ErrorDescription.module.css";
import { baseUrl } from "../../api/urls";
import kattIBoks from "../../img/katt-i-boks.svg";
import { BodyLong, Heading } from "@navikt/ds-react";
import { translate } from "../../providers/LanguageProvider";

const ErrorDescription = () => {
  return (
    <div className={styles.errorDiv} data-testid="errordiv">
      <Heading size={"xlarge"}>{translate("error.heading")}</Heading>
      <img src={kattIBoks} alt={translate("error.kitten")} />
      <BodyLong>
        <strong>{translate("error.text")}</strong>
      </BodyLong>
      <BodyLong>
        {translate("error.help")} <a href={baseUrl}>{translate("min.side")}</a>
      </BodyLong>
    </div>
  );
};

export default ErrorDescription;
