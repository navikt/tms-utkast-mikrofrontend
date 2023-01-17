import React from "react";
import styles from "./ErrorDescription.module.css";
import { baseUrl } from "../../api/urls";
import KattIBoks from "../../img/KattIBoks";
import { BodyLong, Heading } from "@navikt/ds-react";
import { translate } from "../../providers/LanguageProvider";

const ErrorDescription = () => {
  return (
    <div className={styles.errorDiv} data-testid="errordiv">
      <Heading size={"xlarge"}>{translate("error.heading")}</Heading>
      <KattIBoks alt={translate("error.kitten")} />
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
