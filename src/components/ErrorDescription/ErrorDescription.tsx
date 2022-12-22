import React from "react";
import { useIntl } from "react-intl";
import styles from "./ErrorDescription.module.css";
import { baseUrl } from "../../api/urls";
import kattIBoks from "../../img/katt-i-boks.svg";
import { BodyLong, Heading } from "@navikt/ds-react";

const ErrorDescription = () => {
  const translate = (id: string) => useIntl().formatMessage({ id: id });

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
